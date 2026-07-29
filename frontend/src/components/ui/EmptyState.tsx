import { Globe } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  Icon?: LucideIcon;
  title: string;
  description?: string;
}

export default function EmptyState({
  Icon = Globe,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
        <Icon size={36} className="text-white/30" aria-hidden="true" />
      </div>
      <p className="text-lg font-semibold text-white/70">{title}</p>
      {description && (
        <p className="mt-2 max-w-xs text-sm text-white/35">{description}</p>
      )}
    </div>
  );
}
