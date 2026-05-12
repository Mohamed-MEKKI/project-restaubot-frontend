import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Percent, Clock, Truck } from 'lucide-react';

const offers = [
  {
    id: 1,
    icon: Percent,
    title: '50% OFF',
    description: 'On your first order',
    code: 'FIRST50',
    color: 'from-primary to-emerald-600',
  },
  {
    id: 2,
    icon: Clock,
    title: 'Free Delivery',
    description: 'Orders above $25',
    code: 'FREEDEL',
    color: 'from-secondary to-amber-600',
  },
  {
    id: 3,
    icon: Truck,
    title: '30 Min Delivery',
    description: 'Or get it free',
    code: 'FAST30',
    color: 'from-primary to-teal-600',
  },
];

export function Offers() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl mb-8 text-center">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div
                key={offer.id}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${offer.color} p-6 text-white`}
              >
                <div className="relative z-10">
                  <div className="mb-4 inline-block rounded-full bg-white/20 p-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl mb-2">{offer.title}</h3>
                  <p className="text-white/90 mb-4">{offer.description}</p>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-white text-gray-900 hover:bg-white/90">
                      {offer.code}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
                <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-white/10" />
                <div className="absolute -right-2 -top-2 h-20 w-20 rounded-full bg-white/10" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
