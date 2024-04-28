import { toast } from "react-toastify";
import { NotifyProps } from "./types";
import { CheckCircle, Warning } from "@mui/icons-material";

const useNotify = () => {
  const notify = ({ message, type = "success" }: NotifyProps) => {
    if (type === "success") {
      return toast(message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        icon: <CheckCircle />,
        style: { backgroundColor: "lightgreen", color: "green" },
        progress: undefined,
        theme: "dark",
      });
    }
    if (type === "loading") {
      // Material-UI'de loading ikonu yok, bu nedenle aynı ikonu kullanıyoruz
      return toast.loading(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        style: { backgroundColor: "orange", color: "yellow" },
        progress: undefined,
        theme: "dark",
      });
    }
    if (type === "error") {
      return toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        icon: <Warning />,
        style: { backgroundColor: "#FFEAE9", color: "#E95A57" },
        theme: "dark",
      });
    }
    if (type === "warning") {
      // Material-UI'de loading ikonu yok, bu nedenle aynı ikonu kullanıyoruz
      return toast.loading(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        style: { backgroundColor: "lightgoldenrodyellow", color: "orange" },
        progress: undefined,
        theme: "dark",
      });
    }
    // Varsayılan olarak hata ikonu kullanılıyor
    return toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      icon: <Warning />,
      style: { backgroundColor: "red", color: "orange" },
      progress: undefined,
      theme: "dark",
    });
  };
  const removeAllToast = () => {
    toast.dismiss();
  };
  return { notify, removeAllToast };
};

export default useNotify;
