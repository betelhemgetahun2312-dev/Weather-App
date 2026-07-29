import { cn } from '@/utils/cn';

interface StatBadgeProps {
  label: string;
  value: string;
  icon?: string;
  className?: string;
}

export default function StatBadge({ label, value, icon, className }: StatBadgeProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3',
        className
      )}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
