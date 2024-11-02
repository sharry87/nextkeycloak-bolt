import { LoginCard } from '@/components/auth/LoginCard';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function Home() {
  return (
    <AuthGuard
      fallback={<LoginCard />}
    >
      <Dashboard />
    </AuthGuard>
  );
}