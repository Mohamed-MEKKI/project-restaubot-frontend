import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  href?: string;
  bgColor?: string;
  onClick?: () => void;
}

export function DashboardCard({
  title,
  value,
  icon: Icon,
  trend,
  href,
  bgColor = 'bg-white',
  onClick,
}: DashboardCardProps) {
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return (
        <a
          href={href}
          className="block group"
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    }
    
    if (onClick) {
      return (
        <button onClick={onClick} className="block w-full text-left group">
          {children}
        </button>
      );
    }

    return <div className="group">{children}</div>;
  };

  return (
    <CardWrapper>
      <Card className={`${bgColor} border-2 hover:border-primary hover:shadow-xl transform hover:scale-105 transition-all duration-200`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-700">{title}</h3>
            <div className="p-3 rounded-xl bg-white/50 group-hover:bg-white transition-colors">
              <Icon className="h-6 w-6 text-gray-700" />
            </div>
          </div>
          
          <p className="text-3xl mb-2 text-gray-900">{value}</p>
          
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-primary' : 'text-red-600'}`}>
              {trend.isPositive ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              <span>{trend.value}</span>
              <span className="text-gray-600 ml-1">{trend.label}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </CardWrapper>
  );
}
