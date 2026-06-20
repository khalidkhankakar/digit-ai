# ✍️ MNIST Digit AI — Handwritten Digit Recognition

<img src="preview.png" alt='digitAI'>

---

A modern full-stack AI application that recognizes handwritten digits (0–9) using a **PyTorch CNN model exported to ONNX**, served via **FastAPI**, and visualized through a **Vercel-style React + TypeScript frontend**.

Users can either:
- ✍️ Draw digits on a canvas  
- 📤 Upload handwritten digit images  
- 🤖 Get real-time AI predictions instantly  


---

## 🧠 Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS (v4)
- React Sketch Canvas
- React Dropzone
- Sonner (Toast notifications)

### Backend
- FastAPI
- Uvicorn
- ONNX Runtime
- Pillow (PIL)
- NumPy

### AI Model
- PyTorch CNN (MNIST trained)
- Exported to ONNX for fast inference

---


## ⚙️ Features

### ✍️ Canvas Drawing
- Draw digits using a smooth canvas
- Real-time image export
- AI prediction on button click

### 📤 Image Upload
- Drag & drop support
- Image preview before prediction
- JPG/PNG support

### 🤖 AI Prediction
- ONNX Runtime inference
- Fast response (<100ms locally)
- CNN trained on MNIST dataset

### 🎨 Modern UI
- Vercel-inspired design system (Geist style)
- Clean minimal interface
- Responsive layout
- Soft borders + neutral palette

---

## 🧠 Model Details

- Dataset: MNIST
- Architecture: Convolutional Neural Network (CNN)
- Framework: PyTorch
- Export: ONNX format
- Input shape: `1 × 1 × 28 × 28`
- Output: 10 classes (digits 0–9)

---
