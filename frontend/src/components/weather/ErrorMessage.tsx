import { Search, Timer, WifiOff, KeyRound, Gauge, AlertTriangle, RotateCcw } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

interface ErrorMeta {
  Icon: LucideIcon;
  title: string;
  hint: string;
  iconClass: string;
  iconBg: string;
  titleClass: string;
  borderClass: string;
}

function getErrorMeta(message: string): ErrorMeta {
  const m = message.toLowerCase();

  if (m.includes('not found') || m.includes('city') || m.includes('no city'))
    return {
      Icon: Search,
      title: 'City Not Found',
      hint: 'Double-check the spelling or try a nearby city.',
      iconClass: 'text-amber-300',
      iconBg: 'bg-amber-400/10',
      titleClass: 'text-amber-300',
      borderClass: 'border-amber-400/25',
    };

  if (m.includes('timeout') || m.includes('timed out'))
    return {
      Icon: Timer,
      title: 'Request Timed Out',
      hint: 'The server took too long. Try again in a moment.',
      iconClass: 'text-orange-300',
      iconBg: 'bg-orange-400/10',
      titleClass: 'text-orange-300',
      borderClass: 'border-orange-400/25',
    };

  if (m.includes('network') || m.includes('server') || m.includes('reach') || m.includes('connection'))
    return {
      Icon: WifiOff,
      title: 'Connection Error',
      hint: 'Check your internet connection and try again.',
      iconClass: 'text-red-300',
      iconBg: 'bg-red-400/10',
      titleClass: 'text-red-300',
      borderClass: 'border-red-400/25',
    };

  if (m.includes('api key') || m.includes('unauthorized') || m.includes('forbidden'))
    return {
      Icon: KeyRound,
      title: 'Authentication Error',
      hint: 'There is a configuration issue. Please contact support.',
      iconClass: 'text-purple-300',
      iconBg: 'bg-purple-400/10',
      titleClass: 'text-purple-300',
      borderClass: 'border-purple-400/25',
    };

  if (m.includes('rate limit'))
    return {
      Icon: Gauge,
      title: 'Rate Limit Reached',
      hint: 'Too many requests. Please wait a moment.',
      iconClass: 'text-yellow-300',
      iconBg: 'bg-yellow-400/10',
      titleClass: 'text-yellow-300',
      borderClass: 'border-yellow-400/25',
    };

  return {
    Icon: AlertTriangle,
    title: 'Something Went Wrong',
    hint: 'An unexpected error occurred. Please try again.',
    iconClass: 'text-slate-300',
    iconBg: 'bg-slate-400/10',
    titleClass: 'text-slate-300',
    borderClass: 'border-slate-400/25',
  };
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const meta = getErrorMeta(message);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`flex flex-col items-center justify-center rounded-3xl border ${meta.borderClass} bg-white/5 px-6 py-12 text-center backdrop-blur-sm`}
    >
      <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${meta.iconBg}`}>
        <meta.Icon size={28} className={meta.iconClass} aria-hidden="true" />
      </div>

      <h3 className={`text-lg font-bold ${meta.titleClass}`}>{meta.title}</h3>
      <p className="mt-1.5 max-w-xs text-sm text-white/45">{message}</p>
      <p className="mt-1 max-w-xs text-xs text-white/25">{meta.hint}</p>

      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          className="mt-6"
          onClick={onRetry}
          aria-label="Retry the last search"
        >
          <RotateCcw size={13} aria-hidden="true" />
          Try Again
        </Button>
      )}
    </div>
  );
}
