import { Sparkles } from "lucide-react";

export default function ResultPanel({
  prediction,
  loading,
}: {
  prediction: number | null;
  loading: boolean;
}) {
  return (
    <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px] transition-all">
      <h2 className="text-sm font-semibold text-slate-500 tracking-wider uppercase">Prediction Output</h2>
      
      {loading ? (
        <div className="mt-8 flex flex-col items-center gap-3">
          {/* Custom Modern CSS Loading Ring */}
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-xs font-medium text-indigo-600 animate-pulse tracking-wide">Evaluating Tensor maps...</p>
        </div>
      ) : prediction !== null ? (
        <div className="mt-6 text-center group">
          <div className="relative inline-block">
            <div className="text-7xl font-extrabold text-slate-900 tracking-tighter drop-shadow-sm transition-transform group-hover:scale-110 duration-200">
              {prediction}
            </div>
            <div className="absolute -top-1.5 -right-3 p-1 bg-amber-100 rounded-md text-amber-700">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-4">
            Confidence Confirmed
          </p>
        </div>
      ) : (
        <div className="mt-8 text-center max-w-[180px]">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-slate-300 text-xl font-bold">
            ?
          </div>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            Awaiting draw path or image inputs.
          </p>
        </div>
      )}
    </div>
  );
}