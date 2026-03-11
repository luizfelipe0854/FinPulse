import { toast } from "react-toastify";

type ToastType = "success" | "error" | "warning" | "info";

export const toastMessage = (message: string, type: ToastType = "success") => {
  toast[type](message);
};
