import { useState, useEffect, useCallback, useMemo } from 'react';
import { Package, Clock, CheckCircle, XCircle, Loader2, Search, Filter, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface Order {
  order_id: number;
  menu_item: string;
  name: string;
  status: string;
  total: number;
  time: string;
  image?: string;
}

interface OrdersListProps {
  onBack?: () => void;
  onViewDetails?: (orderId: number) => void;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
  preparing: { label: 'Preparing', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Package },
  ready: { label: 'Ready', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
  delivered: { label: 'Delivered', color: 'bg-primary/10 text-primary border-primary/20', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
};

export function OrdersList({ onBack, onViewDetails }: OrdersListProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/order/get-all/');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders');    
    } finally {
      setIsLoading(false);
    }
  };
    
  const handleStatusChange = useCallback(async (orderId: number, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      const response = await fetch(`http://127.0.0.1:8000/order/update/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.order_id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success('Order status updated successfully');
        console.log('✅ Order status updated:', newStatus);
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Network error');
    } finally {
      setUpdatingStatus(null);
    }
  }, []);

  const handleDeleteOrder = useCallback(async () => {
    if (!orderToDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/order/delete/${orderToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setOrders(prevOrders => prevOrders.filter(order => order.order_id !== orderToDelete));
        toast.success('Order deleted successfully');
      } else {
        toast.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Network error');
    } finally {
      setDeleteDialogOpen(false);
      setOrderToDelete(null);
    }
  }, [orderToDelete]);

  const filteredOrders = (Array.isArray(orders) ? orders : []).filter(order => {
    const matchesSearch = 
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.menu_item.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = useMemo(() => {
    const safe = Array.isArray(filteredOrders) ? filteredOrders : [];
    return {
      total: safe.length,
      pending: safe.filter(o => o.status === 'pending').length,
      preparing: safe.filter(o => o.status === 'preparing').length,
      ready: safe.filter(o => o.status === 'ready').length,
      delivered: safe.filter(o => o.status === 'delivered').length,
      cancelled: safe.filter(o => o.status === 'cancelled').length,
    };
  }, [filteredOrders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {onBack && (
            <Button
              variant="ghost"
              className="mb-4 hover:bg-primary/10"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Order Management
          </h1>
          <p className="text-muted-foreground text-lg">
            Track and manage all customer orders
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <Card className="border-2">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                <p className="text-3xl">{stats.total}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-3xl text-yellow-700">{stats.pending}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Preparing</p>
                <p className="text-3xl text-blue-700">{stats.preparing}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Ready</p>
                <p className="text-3xl text-green-700">{stats.ready}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by item or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px] h-12">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4 mb-4" />
                  <div className="h-8 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredOrders.length === 0 ? (
          <Card className="p-12 text-center border-2 border-dashed">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              {searchQuery || statusFilter !== 'all' 
                ? 'Try adjusting your filters'
                : 'Orders will appear here as they come in'}
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => {
              const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Clock;
              const statusColor = statusConfig[order.status as keyof typeof statusConfig]?.color || 'bg-gray-100 text-gray-800';

              return (
                <Card key={order.order_id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2">
                  <CardContent className="p-6">
                    {/* Order Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-muted-foreground">Order #{order.order_id}</span>
                          <Badge variant="outline" className={`${statusColor} border`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[order.status as keyof typeof statusConfig]?.label || order.status}
                          </Badge>
                        </div>
                        <h3 className="text-lg mb-1">{order.menu_item}</h3>
                        <p className="text-sm text-muted-foreground">Customer: {order.name}</p>
                      </div>
                    </div>

                    {/* Status Select */}
                    <div className="mb-4">
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.order_id, value)}
                        disabled={updatingStatus === order.order_id}
                      >
                        <SelectTrigger className="w-full">
                          {updatingStatus === order.order_id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : null}
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="preparing">Preparing</SelectItem>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Order Footer */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl text-primary">${order.total}</div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {order.time}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 hover:border-primary hover:text-primary"
                        onClick={() => onViewDetails?.(order.order_id)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        className="hover:border-red-500 hover:text-red-500"
                        onClick={() => {
                          setOrderToDelete(order.order_id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this order? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteOrder}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
