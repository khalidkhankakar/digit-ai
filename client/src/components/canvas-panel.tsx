import { ReactSketchCanvas } from "react-sketch-canvas";
import { toast } from "sonner";
import { useRef } from "react";
import { Trash2, BrainCircuit } from "lucide-react";

export default function CanvasPanel({
  onPredict,
  loading,
}: {
  onPredict: (blob: Blob) => void;
  loading: boolean;
}) {
  const ref = useRef<React.ElementRef<typeof ReactSketchCanvas>>(null);

  const handlePredict = async () => {
    const image = await ref.current?.exportImage("png");
    if (!image) {
      toast.warning("Canvas grid is entirely empty.");
      return;
    }
    const blob = await fetch(image).then((r) => r.blob());
    onPredict(blob);
  };

  const clearCanvas = async () => {
    await ref.current?.clearCanvas();
  };

  return (
    <div className="space-y-4">
      <div className="border border-slate-200 bg-slate-50 p-2 rounded-xl overflow-hidden shadow-inner">
        <ReactSketchCanvas
          ref={ref}
          width="100%"
          height="320px"
          strokeWidth={16}
          strokeColor="#0f172a" // Deep slate gray ink
          canvasColor="#ffffff"
          className="rounded-lg border border-slate-200/50"
        />
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={handlePredict}
          disabled={loading}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm shadow-sm hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          <BrainCircuit className="w-4 h-4" />
          {loading ? "Analyzing Matrix..." : "Analyze Digit"}
        </button>
        <button
          onClick={clearCanvas}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium text-sm hover:bg-slate-50 active:scale-[0.98] transition-all"
        >
          <Trash2 className="w-4 h-4 text-slate-400" />
          Clear
        </button>
      </div>
    </div>
  );
}