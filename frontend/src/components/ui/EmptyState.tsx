interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
}

export default function EmptyState({
  icon = '🌍',
  title,
  description,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <span className="mb-5 text-7xl" aria-hidden="true">{icon}</span>
      <p className="text-xl font-semibold text-white/80">{title}</p>
      {description && (
        <p className="mt-2 text-sm text-white/40">{description}</p>
      )}
    </div>
  );
}
