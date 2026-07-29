import { LocateFixed, Loader2, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { GeolocationStatus } from '@/hooks/useGeolocation';
import { cn } from '@/utils/cn';

interface LocationButtonProps {
  status: GeolocationStatus;
  error: string | null;
  onClick: () => void;
}

interface StatusConfig {
  label: string;
  Icon: LucideIcon;
  iconClass: string;
  className: string;
  disabled: boolean;
  spin?: boolean;
}

const statusConfig: Record<GeolocationStatus, StatusConfig> = {
  idle: {
    label: 'Use My Location',
    Icon: LocateFixed,
    iconClass: 'text-white/70',
    className: 'border-white/20 bg-white/10 text-white hover:bg-white/20',
    disabled: false,
  },
  loading: {
    label: 'Detecting location…',
    Icon: Loader2,
    iconClass: 'text-white/50',
    className: 'border-white/10 bg-white/5 text-white/50 cursor-not-allowed',
    disabled: true,
    spin: true,
  },
  success: {
    label: 'Location found',
    Icon: CheckCircle2,
    iconClass: 'text-green-400',
    className: 'border-green-400/30 bg-green-500/10 text-green-300',
    disabled: false,
  },
  denied: {
    label: 'Location denied — retry',
    Icon: XCircle,
    iconClass: 'text-red-400',
    className: 'border-red-400/30 bg-red-500/10 text-red-300 hover:bg-red-500/20',
    disabled: false,
  },
  unsupported: {
    label: 'Location not supported',
    Icon: AlertTriangle,
    iconClass: 'text-yellow-400',
    className: 'border-yellow-400/30 bg-yellow-500/10 text-yellow-300 cursor-not-allowed',
    disabled: true,
  },
  error: {
    label: 'Location error — retry',
    Icon: AlertTriangle,
    iconClass: 'text-yellow-400',
    className: 'border-yellow-400/30 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20',
    disabled: false,
  },
};

export default function LocationButton({ status, error, onClick }: LocationButtonProps) {
  const cfg = statusConfig[status];

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        onClick={onClick}
        disabled={cfg.disabled}
        aria-label={cfg.label}
        title={error ?? cfg.label}
        className={cn(
          'flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium',
          'backdrop-blur-sm transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
          cfg.className
        )}
      >
        <cfg.Icon
          size={15}
          aria-hidden="true"
          className={cn(cfg.iconClass, cfg.spin && 'animate-spin')}
        />
        {cfg.label}
      </button>

      {(status === 'denied' || status === 'unsupported' || status === 'error') && error && (
        <p role="alert" className="max-w-xs text-center text-[11px] text-red-300/70">
          {error}
        </p>
      )}
    </div>
  );
}
