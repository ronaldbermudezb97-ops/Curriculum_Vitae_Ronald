import { cn } from "@/utils/cn";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse bg-card rounded-xl border border-border/10", className)} />
  );
}

export function SkeletonText({ width = 'w-full', height = 'h-4', className }: { width?: string; height?: string; className?: string }) {
  return (
    <div className={cn(`animate-pulse bg-secondary/20 rounded ${width} ${height}`, className)} />
  );
}

export function SkeletonCircle({ size = 'w-12 h-12', className }: { size?: string; className?: string }) {
  return (
    <div className={cn(`animate-pulse bg-secondary/20 rounded-full ${size}`, className)} />
  );
}
