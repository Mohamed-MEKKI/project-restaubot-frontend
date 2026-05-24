import { useEffect, useState } from 'react';
import {
  Search, Filter, Mail, Phone, MapPin, Calendar, ShoppingBag,
  DollarSign, User, Eye, MoreVertical, Download, UserCheck, UserX, Loader2
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from './ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './ui/select';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';

interface Client {
  clerk_user_id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  number_of_orders: number;
  totalSpent: number;
  status: 'active' | 'inactive' | 'vip';
  avatar?: string;
}

interface ClientsListProps {
  onBack?: () => void;
}

export function ClientsList({ onBack }: ClientsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);   // ← was mixing users/mockClients
  const [isLoading, setIsLoading] = useState(false);       // ← was a dangling function
  const [error, setError] = useState<string | null>(null);
  const { isLoaded, isSignedIn, getToken } = useAuth();

  // ─── Fetch clients from backend ───────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    async function fetchClients() {
      setIsLoading(true);
      setError(null);
      try {
        const token = await getToken();
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-all/`, {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const data = await response.json();
        setClients(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch clients:', err);
        setError('Failed to load clients. Please try again.');
        toast.error('Failed to load clients');
      } finally {
        setIsLoading(false);
      }
    }

    fetchClients();
  }, [isLoaded, isSignedIn]); // ← added proper deps

  // ─── Filtering ────────────────────────────────────────────────────────────
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // ─── Stats (derived from real data) ───────────────────────────────────────
  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    vip: clients.filter(c => c.status === 'vip').length,
    inactive: clients.filter(c => c.status === 'inactive').length,
    totalRevenue: clients.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const handleViewDetails = (client: Client) => {
    setSelectedClient(client);
    setIsDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'vip':
        return <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">VIP</Badge>;
      case 'active':
        return <Badge className="bg-primary">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInitials = (name: string) =>
    name.split(' ').map(n => n[0]).join('');

  // ─── Loading state ────────────────────────────────────────────────────────
  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p>Loading clients...</p>
        </div>
      </div>
    );
  }

  // ─── Error state ──────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  // ─── Main render ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Client Management
              </h1>
              <p className="text-muted-foreground">View and manage all your customers</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total Clients', value: stats.total, icon: <User className="h-4 w-4 text-primary" /> },
            { label: 'Active', value: stats.active, icon: <UserCheck className="h-4 w-4 text-primary" />, valueClass: 'text-primary' },
            { label: 'VIP', value: stats.vip, icon: <span className="text-xl">⭐</span>, valueClass: 'text-orange-500' },
            { label: 'Inactive', value: stats.inactive, icon: <UserX className="h-4 w-4 text-muted-foreground" />, valueClass: 'text-muted-foreground' },
          ].map(({ label, value, icon, valueClass }) => (
            <div key={label} className="bg-white rounded-xl border-2 border-border p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{label}</span>
                {icon}
              </div>
              <p className={`text-2xl ${valueClass ?? ''}`}>{value}</p>
            </div>
          ))}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-xl border-2 border-border p-4 hover:shadow-lg transition-shadow text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/90">Total Revenue</span>
              <DollarSign className="h-4 w-4" />
            </div>
            <p className="text-2xl">${/*stats.totalRevenue.toLocaleString()*/}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border-2 border-border p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border-2 border-border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-orange-50 to-green-50">
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.clerk_user_id} className="hover:bg-gray-50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                          {getInitials(client.name)}
                        </div>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">ID: #{client.clerk_user_id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{client.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <ShoppingBag className="h-4 w-4 text-primary" />
                        <span className="font-medium">{client.number_of_orders}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                     <span className="font-semibold text-primary">
                        ${/*client.totalSpent.toLocaleString()*/}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(client.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleViewDetails(client)}>
                            <Eye className="h-4 w-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShoppingBag className="h-4 w-4 mr-2" /> View Orders
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Empty state */}
          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="font-medium text-muted-foreground">
                {searchQuery || statusFilter !== 'all'
                  ? 'No clients match your filters'
                  : 'No clients yet'}
              </p>
              {(searchQuery || statusFilter !== 'all') && (
                <Button
                  variant="ghost"
                  className="mt-2"
                  onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                {selectedClient && getInitials(selectedClient.name)}
              </div>
              {selectedClient?.name}
              <div className="ml-auto">
                {selectedClient && getStatusBadge(selectedClient.status)}
              </div>
            </DialogTitle>
            <DialogDescription>Client details and order history</DialogDescription>
          </DialogHeader>

          {selectedClient && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Phone</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedClient.phone}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 sm:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Address</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedClient.address}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{selectedClient.number_of_orders}</p>
                  <p className="text-xs text-muted-foreground">Total Orders</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg">
                  <DollarSign className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <p className="text-2xl font-bold">${/*selectedClient.totalSpent.toLocaleString()*/}</p>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-bold">{new Date(selectedClient.created_at).toLocaleDateString()}</p>
                  <p className="text-xs text-muted-foreground">Join Date</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-secondary mx-auto mb-2" />
                  <p className="text-sm font-bold">{/*new Date(selectedClient.created_at).toLocaleDateString()*/}</p>
                  <p className="text-xs text-muted-foreground">Last Order</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <ShoppingBag className="h-4 w-4 mr-2" /> View Orders
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}