import { GeolocationStatus } from '@/hooks/useGeolocation';
import { cn } from '@/utils/cn';

interface LocationButtonProps {
  status: GeolocationStatus;
  error: string | null;
  onClick: () => void;
}

const statusConfig: Record<
  GeolocationStatus,
  { label: string; icon: string; className: string; disabled: boolean }
> = {
  idle: {
    label: 'Use My Location',
    icon: '📍',
    className: 'border-white/20 bg-white/10 text-white hover:bg-white/20',
    disabled: false,
  },
  loading: {
    label: 'Detecting location...',
    icon: '⏳',
    className: 'border-white/10 bg-white/5 text-white/50 cursor-not-allowed',
    disabled: true,
  },
  success: {
    label: 'Location found',
    icon: '✅',
    className: 'border-green-400/30 bg-green-500/10 text-green-300',
    disabled: false,
  },
  denied: {
    label: 'Location denied — click to retry',
    icon: '🚫',
    className: 'border-red-400/30 bg-red-500/10 text-red-300 hover:bg-red-500/20',
    disabled: false,
  },
  unsupported: {
    label: 'Location not supported',
    icon: '⚠️',
    className: 'border-yellow-400/30 bg-yellow-500/10 text-yellow-300 cursor-not-allowed',
    disabled: true,
  },
  error: {
    label: 'Location error — click to retry',
    icon: '⚠️',
    className: 'border-yellow-400/30 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20',
    disabled: false,
  },
};

export default function LocationButton({ status, error, onClick }: LocationButtonProps) {
  const config = statusConfig[status];

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={onClick}
        disabled={config.disabled}
        aria-label={config.label}
        title={error ?? config.label}
        className={cn(
          'flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-200',
          config.className
        )}
      >
        <span aria-hidden="true">{config.icon}</span>
        {config.label}
      </button>

      {/* Friendly error message below button */}
      {(status === 'denied' || status === 'unsupported' || status === 'error') && error && (
        <p role="alert" className="max-w-xs text-center text-xs text-red-300/80">
          {error}
        </p>
      )}
    </div>
  );
}
