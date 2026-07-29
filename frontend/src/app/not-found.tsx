import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 text-8xl">🌧️</div>
      <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
      <h2 className="mt-3 text-2xl font-semibold text-gray-600">Page Not Found</h2>
      <p className="mt-4 max-w-md text-gray-400">
        Looks like this page got lost in the clouds. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="mt-8">
        <Button size="lg">← Back to Home</Button>
      </Link>
    </div>
  );
}
