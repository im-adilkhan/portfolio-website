import { cn } from "@/lib/utils";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export default function TextArea({ label, error, className, id, ...props }: Props) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="group">
      <label
        htmlFor={inputId}
        className="label-mono mb-2 block transition-colors group-focus-within:text-accent"
      >
        {label}
      </label>
      <textarea
        id={inputId}
        rows={5}
        className={cn(
          "w-full resize-none rounded-lg border border-line bg-surface/50 px-4 py-3 text-sm text-fg outline-none transition-all duration-300 placeholder:text-muted/50",
          "focus:border-accent focus:bg-surface focus:ring-2 focus:ring-accent/20",
          error && "border-red-500/60 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
