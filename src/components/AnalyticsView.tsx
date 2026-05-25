import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Analytics {
  total_menus: number;
  count_orders: number;
  count_customers: number;
  count_revenue: number;
}

interface AnalyticsViewProps {
  onNavigate?: () => void;
}

export function AnalyticsView({ onNavigate }: AnalyticsViewProps) {
  const [isLoading, setIsLoading] = useState(false);   
  const [data, setData] = useState<Analytics | null>(null); 
  const [error, setError] = useState<string | null>(null);
  const { isSignedIn, isLoaded, getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const token = await getToken();
        console.log("TOKEN:", token);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/analytics/get_menus_orders_stats/`, {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const json = await response.json();
        setData(json); 
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
        setError('Failed to load analytics. Please try again.');
        toast.error('Failed to load analytics');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [isLoaded, isSignedIn]);

  // ── Derived stats from real API data ──────────────────────────────────────
  const stats = [
    {
      title: 'Total Revenue',
      value: data ? `$${Number(data.count_revenue).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Orders',
      value: data ? data.count_orders.toLocaleString() : '—',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Customers',
      value: data ? data.count_customers.toLocaleString() : '—',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Menu Items',
      value: data ? data.total_menus.toLocaleString() : '—',
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  // ── Loading state ──────────────────────────────────────────────────────────
  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <TrendingDown className="h-12 w-12 text-red-400 mx-auto" />
          <p className="text-red-500 font-medium">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={onNavigate} className="mb-4 hover:bg-primary/10">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Analytics & Reports
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your restaurant&apos;s performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="border-2">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-3xl font-semibold">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Revenue Overview placeholder — ready for recharts */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">Chart visualization coming soon</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Install recharts for detailed analytics charts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}