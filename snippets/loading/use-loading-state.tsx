import type { ReactNode } from "react";

interface LoadingStateProps {
  loading: boolean;
  fallback: ReactNode;
  children: ReactNode;
}

export default function LoadingState({ loading, fallback, children }: LoadingStateProps) {
  if (loading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
