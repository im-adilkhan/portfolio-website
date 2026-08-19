import { cn } from "@/lib/utils";

export default function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-tight",
        tone === "accent"
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-line bg-surface/60 text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
