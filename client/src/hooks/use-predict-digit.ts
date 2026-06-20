import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export const usePredictDigit = () => {
  const predict = async (file: Blob) => {
    try {
      const form = new FormData();
      form.append("file", file, "digit.png");

      const res = await fetch(API_URL, {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        throw new Error("Prediction failed");
      }

      return await res.json();
    } catch (err) {
      toast.error("Prediction failed. Try again.");
      throw err;
    }
  };

  return { predict };
};