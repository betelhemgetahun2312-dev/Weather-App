import Button from '@/components/ui/Button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const getErrorMeta = (message: string): { icon: string; title: string } => {
  const lower = message.toLowerCase();
  if (lower.includes('not found') || lower.includes('city'))
    return { icon: '🔍', title: 'City Not Found' };
  if (lower.includes('timeout') || lower.includes('timed out'))
    return { icon: '⏱️', title: 'Request Timed Out' };
  if (lower.includes('network') || lower.includes('server') || lower.includes('reach'))
    return { icon: '📡', title: 'Connection Error' };
  if (lower.includes('api key') || lower.includes('unauthorized'))
    return { icon: '🔑', title: 'Authentication Error' };
  if (lower.includes('rate limit'))
    return { icon: '🚦', title: 'Rate Limit Reached' };
  return { icon: '⚠️', title: 'Something Went Wrong' };
};

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { icon, title } = getErrorMeta(message);

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center">
      <span className="mb-3 text-5xl">{icon}</span>
      <h3 className="text-lg font-semibold text-red-700">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-red-500">{message}</p>
      {onRetry && (
        <Button
          variant="danger"
          size="sm"
          className="mt-5"
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}
