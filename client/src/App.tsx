import { useState } from "react";
import CanvasPanel from "./components/canvas-panel";
import UploadPanel from "./components/upload-panel";
import ResultPanel from "./components/result-panel";
import { usePredictDigit } from "./hooks/use-predict-digit";
import { toast } from "sonner";
import { Paintbrush, Upload } from "lucide-react"; // install lucide-react for sharp icons

export default function App() {
  const [activeTab, setActiveTab] = useState<"draw" | "upload">("draw");
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { predict } = usePredictDigit();

  const handlePredict = async (file: Blob | File) => {
    try {
      setLoading(true);
      setPrediction(null); // Clear previous state during fresh run
      const data = await predict(file);
      setPrediction(data.prediction);
    } catch {
      toast.error("Failed to fetch prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-indigo-500/10">
      <div className="w-full max-w-4xl grid md:grid-cols-5 gap-6 items-start">
        
        {/* Left Interactive panel (3 cols width) */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6">
            <header className="mb-6">
              <h1 className="text-xl font-bold tracking-tight text-slate-800">CNN Digit Classifier</h1>
              <p className="text-xs text-slate-500 mt-1">Draw a number or drop an image file to analyze.</p>
            </header>

            {/* Premium Tab Bar Selector */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6 relative">
              <button
                onClick={() => setActiveTab("draw")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === "draw"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Paintbrush className="w-4 h-4" />
                Draw Canvas
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === "upload"
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload File
              </button>
            </div>

            {/* Dynamic Viewport Panel Display */}
            {activeTab === "draw" ? (
              <CanvasPanel onPredict={handlePredict} loading={loading} />
            ) : (
              <UploadPanel onPredict={handlePredict} loading={loading} />
            )}
          </div>
        </div>

        {/* Right Result block sticky structure (2 cols width) */}
        <div className="md:col-span-2 md:sticky md:top-6">
          <ResultPanel prediction={prediction} loading={loading} />
        </div>

      </div>
    </div>
  );
}