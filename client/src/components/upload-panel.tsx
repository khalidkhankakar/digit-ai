import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { toast } from "sonner";
import { CloudUpload, BrainCircuit, FileImage } from "lucide-react";

export default function UploadPanel({
  onPredict,
  loading,
}: {
  onPredict: (file: File) => void;
  loading: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (files) => {
      const f = files[0];
      if (!f) return;
      setFile(f);
      setPreview(URL.createObjectURL(f));
    },
  });

  const handlePredict = () => {
    if (!file) {
      toast.warning("Please upload an image file first.");
      return;
    }
    onPredict(file);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 cursor-pointer flex flex-col items-center justify-center transition-all ${
          isDragActive
            ? "border-indigo-500 bg-indigo-50/50"
            : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300"
        }`}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="w-full flex flex-col items-center gap-3">
            <img
              src={preview}
              className="w-full h-44 object-contain rounded-lg bg-white border border-slate-200/60 p-2 shadow-sm"
              alt="Digit upload rendering"
            />
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
              <FileImage className="w-3.5 h-3.5" />
              {file?.name}
            </span>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm inline-block text-slate-400">
              <CloudUpload className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-700">Drop your file here</p>
              <p className="text-xs text-slate-400">Supports PNG, JPG, or JPEG up to 5MB</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handlePredict}
        disabled={!file || loading}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm shadow-sm hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none"
      >
        <BrainCircuit className="w-4 h-4" />
        {loading ? "Analyzing Upload..." : "Predict Uploaded Image"}
      </button>
    </div>
  );
}