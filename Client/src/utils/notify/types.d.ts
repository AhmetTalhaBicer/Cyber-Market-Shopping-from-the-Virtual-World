export type NotifyProps = {
  message: string;
  type?: "success" | "warning" | "error" | "loading";
};

export type NotifyType = () => void;
