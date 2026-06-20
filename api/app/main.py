import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
import onnxruntime as ort
import numpy as np
from dotenv import load_dotenv
from PIL import Image, ImageOps
import os
import io


CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(CURRENT_DIR, "onnix-models", "mnist_cnn.onnx")

ort_session = ort.InferenceSession(MODEL_PATH)


app = FastAPI(
    title="Digit Predictor API",
    description="A simple API to predict handwritten digits using a CNN.",
    version="1.0.0"
)


load_dotenv()

FRONTEND_API = os.getenv("FRONTEND_API")

print(f"FRONTEND_API: {FRONTEND_API}")  # Debugging line to check the value of FRONTEND_API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # "http://localhost:5173",  # Vite React app
        FRONTEND_API,  # Frontend API URL from .env
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/predict-digit")
async def predict_digit(file: UploadFile = File(...)):

    image_data = await file.read()

    image = Image.open(io.BytesIO(image_data)).convert("L")

    # STEP 1: Convert to binary-like strong contrast
    image = ImageOps.autocontrast(image)

    # STEP 2: Resize while keeping digit structure
    image = image.resize((28, 28))

    # STEP 3: Invert (ONLY if needed — explained below)
    image = ImageOps.invert(image)

    # STEP 4: Normalize
    input_tensor = np.array(image).astype(np.float32) / 255.0

    # STEP 5: Fix orientation / center consistency (IMPORTANT)
    input_tensor = input_tensor.reshape(1, 1, 28, 28)

    outputs = ort_session.run(None, {"input": input_tensor})

    prediction = int(np.argmax(outputs[0]))

    return {"prediction": prediction}


@app.get("/")
def read_root():
    return {"message": "Digit Predictor API", "status": "running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
