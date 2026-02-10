import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <div className="text-center max-w-md p-8">
        <div className="text-6xl mb-4">404</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/dashboard">
          <Button>
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
