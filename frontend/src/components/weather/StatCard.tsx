import { cn } from '@/utils/cn';

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  className?: string;
}

export default function StatCard({ icon, label, value, sub, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/15',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span className="text-xs font-medium uppercase tracking-wider text-white/50">
          {label}
        </span>
      </div>
      <p className="mt-1 text-xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-white/40">{sub}</p>}
    </div>
  );
}
