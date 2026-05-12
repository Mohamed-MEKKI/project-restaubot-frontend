'use client';

import { useRouter } from 'next/navigation';
import { AnalyticsView } from "@/components/AnalyticsView";

export default function Analytics() {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/dashboard");
  }
  return (
    <AnalyticsView onNavigate={handleNavigate} />
  )
}