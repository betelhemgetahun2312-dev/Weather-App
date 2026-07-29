import Button from '@/components/ui/Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

type ErrorType = 'notFound' | 'timeout' | 'network' | 'auth' | 'rateLimit' | 'generic';

interface ErrorMeta {
  type: ErrorType;
  icon: string;
  title: string;
  hint: string;
  borderColor: string;
  iconBg: string;
  titleColor: string;
  hintColor: string;
}

function getErrorMeta(message: string): ErrorMeta {
  const m = message.toLowerCase();

  if (m.includes('not found') || m.includes('city') || m.includes('no city'))
    return {
      type: 'notFound',
      icon: '🔍',
      title: 'City Not Found',
      hint: 'Double-check the spelling or try a nearby city.',
      borderColor: 'border-amber-400/30',
      iconBg: 'bg-amber-400/10',
      titleColor: 'text-amber-300',
      hintColor: 'text-amber-200/60',
    };

  if (m.includes('timeout') || m.includes('timed out'))
    return {
      type: 'timeout',
      icon: '⏱️',
      title: 'Request Timed Out',
      hint: 'The server took too long to respond. Try again in a moment.',
      borderColor: 'border-orange-400/30',
      iconBg: 'bg-orange-400/10',
      titleColor: 'text-orange-300',
      hintColor: 'text-orange-200/60',
    };

  if (m.includes('network') || m.includes('server') || m.includes('reach') || m.includes('connection'))
    return {
      type: 'network',
      icon: '📡',
      title: 'Connection Error',
      hint: 'Check your internet connection and try again.',
      borderColor: 'border-red-400/30',
      iconBg: 'bg-red-400/10',
      titleColor: 'text-red-300',
      hintColor: 'text-red-200/60',
    };

  if (m.includes('api key') || m.includes('unauthorized') || m.includes('forbidden'))
    return {
      type: 'auth',
      icon: '🔑',
      title: 'Authentication Error',
      hint: 'There is a configuration issue. Please contact support.',
      borderColor: 'border-purple-400/30',
      iconBg: 'bg-purple-400/10',
      titleColor: 'text-purple-300',
      hintColor: 'text-purple-200/60',
    };

  if (m.includes('rate limit'))
    return {
      type: 'rateLimit',
      icon: '🚦',
      title: 'Rate Limit Reached',
      hint: 'Too many requests. Please wait a moment before trying again.',
      borderColor: 'border-yellow-400/30',
      iconBg: 'bg-yellow-400/10',
      titleColor: 'text-yellow-300',
      hintColor: 'text-yellow-200/60',
    };

  return {
    type: 'generic',
    icon: '⚠️',
    title: 'Something Went Wrong',
    hint: 'An unexpected error occurred. Please try again.',
    borderColor: 'border-slate-400/30',
    iconBg: 'bg-slate-400/10',
    titleColor: 'text-slate-300',
    hintColor: 'text-slate-400/60',
  };
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const meta = getErrorMeta(message);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`flex flex-col items-center justify-center rounded-3xl border ${meta.borderColor} bg-white/5 px-6 py-12 text-center backdrop-blur-sm`}
    >
      <span
        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full text-4xl ${meta.iconBg}`}
        aria-hidden="true"
      >
        {meta.icon}
      </span>

      <h3 className={`text-lg font-bold ${meta.titleColor}`}>{meta.title}</h3>

      <p className="mt-1.5 max-w-xs text-sm text-white/50">{message}</p>

      <p className={`mt-1 max-w-xs text-xs ${meta.hintColor}`}>{meta.hint}</p>

      {onRetry && (
        <Button
          variant="primary"
          size="sm"
          className="mt-6"
          onClick={onRetry}
          aria-label="Retry the last search"
        >
          🔄 Try Again
        </Button>
      )}
    </div>
  );
}
