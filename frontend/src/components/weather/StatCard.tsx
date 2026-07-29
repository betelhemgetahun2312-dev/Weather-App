import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StatCardProps {
  Icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  className?: string;
}

export default function StatCard({ Icon, label, value, sub, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'group flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-4',
        'backdrop-blur-sm transition-all duration-200',
        'hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:shadow-lg',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Icon
          size={15}
          className="shrink-0 text-blue-300/70 transition-colors duration-200 group-hover:text-blue-300"
          aria-hidden="true"
        />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
          {label}
        </span>
      </div>
      <p className="text-xl font-bold tabular-nums text-white">{value}</p>
      {sub && <p className="text-[11px] text-white/30">{sub}</p>}
    </div>
  );
}
