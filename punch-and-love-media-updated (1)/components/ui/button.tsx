interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export default function Button({ text, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${
        variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-500 text-black"
      }`}
      aria-label={text}
    >
      {text}
    </button>
  );
}
