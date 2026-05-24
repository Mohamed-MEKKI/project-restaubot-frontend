import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, User, Phone, MapPin, Package, DollarSign, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

import { useAuth } from '@clerk/clerk-react';
import { toast } from 'sonner';

interface OrderDetailsProps {
  orderId: number;
  onBack: () => void;
}

interface OrderDetail {
  order_id: number;
  menu_item: string;
  name: string;
  status: string;
  total: number;
  time: string;
  phone?: string;
  address?: string;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  notes?: string;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  preparing: { label: 'Preparing', color: 'bg-blue-100 text-blue-800' },
  ready: { label: 'Ready', color: 'bg-green-100 text-green-800' },
  delivered: { label: 'Delivered', color: 'bg-primary/10 text-primary' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
};

export function OrderDetails({ orderId, onBack }: OrderDetailsProps) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setIsLoading(true);
    try {
      if (!isLoaded || !isSignedIn) return;
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order/get/${orderId}`,
        {headers: {
          'authorization':`Bearer ${token}`,
          'Content-Type': 'application/json',
        }}
      );
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      toast.error('Failed to load order details');
      // Mock data
      setOrder({
        order_id: orderId,
        menu_item: 'Classic Burger',
        name: 'John Doe',
        status: 'preparing',
        total: 12.99,
        time: '10:30 AM',
        phone: '+1 234 567 8900',
        address: '123 Main St, Apt 4B, New York, NY 10001',
        items: [
          { name: 'Classic Burger', quantity: 1, price: 12.99 },
        ],
        notes: 'Extra cheese, no onions',
      });
    } finally {
      setIsLoading(false);
    }
  };

      // ─── Loading state ────────────────────────────────────────────────────────
  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl mb-4">Order not found</h2>
          <Button onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const statusColor = statusConfig[order.status as keyof typeof statusConfig]?.color || 'bg-gray-100 text-gray-800';
  const statusLabel = statusConfig[order.status as keyof typeof statusConfig]?.label || order.status;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 hover:bg-primary/10"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Order #{order.order_id}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{order.time}</span>
              </div>
            </div>
            <Badge className={`${statusColor} text-base px-4 py-2`}>
              {statusLabel}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Customer Information */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{order.name}</p>
                </div>
              </div>
              {order.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{order.phone}</p>
                  </div>
                </div>
              )}
              {order.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery Address</p>
                    <p className="font-medium">{order.address}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      {index < order.items.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>{order.menu_item}</p>
                  </div>
                )}
              </div>

              {order.notes && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Special Instructions</p>
                    <p className="text-sm bg-muted p-3 rounded-lg">{order.notes}</p>
                  </div>
                </>
              )}

              <Separator className="my-4" />

              {/* Total */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="text-lg">Total</span>
                </div>
                <span className="text-2xl text-primary">${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Order Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-muted-foreground">{order.time}</p>
                  </div>
                </div>
                {order.status !== 'pending' && (
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="font-medium">Preparation Started</p>
                      <p className="text-sm text-muted-foreground">In progress</p>
                    </div>
                  </div>
                )}
                {(order.status === 'ready' || order.status === 'delivered') && (
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="font-medium">Order Ready</p>
                      <p className="text-sm text-muted-foreground">Ready for pickup/delivery</p>
                    </div>
                  </div>
                )}
                {order.status === 'delivered' && (
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div>
                      <p className="font-medium">Delivered</p>
                      <p className="text-sm text-muted-foreground">Order completed</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={onBack}>
              Back to Orders
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-primary to-secondary">
              Print Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
