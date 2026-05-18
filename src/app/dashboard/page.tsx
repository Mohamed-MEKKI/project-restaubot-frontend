'use client';

import AdminComponent from '@/components/AdminComponent';
import { MessageCircleIcon, ShoppingCartIcon, Hamburger, ChartNoAxesCombined } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Menu, ShoppingCart, LineChart, MessageCircle, Users, DollarSign } from 'lucide-react';
import { DashboardCard } from '@/components/DashboardCard';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useState } from 'react';
import { MenuList } from '@/components/MenuList';
import { MenuItemForm } from '@/components/MenuItemForm';
import { OrdersList } from '@/components/OrdersList';
import { OrderDetails } from '@/components/OrderDetails';
import { AnalyticsView } from '@/components/AnalyticsView';
import { Header } from '@/components/Header';

type DashboardView = 'home' | 'menu' | 'menu-add' | 'orders' | 'order-details' | 'analytics';

export default function RestaurantDashboard() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<DashboardView>('home');
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentView(page as DashboardView);
  };

  

  

  if (currentView === 'orders') {
    return (
      <>
        <Header currentPage="orders" onNavigate={handleNavigate} />
        <OrdersList
          onBack={() => setCurrentView('home')}
          onViewDetails={(orderId) => {
            setSelectedOrderId(orderId);
            setCurrentView('order-details');
          }}
        />
      </>
    );
  }

  if (currentView === 'order-details' && selectedOrderId) {
    return (
      <>
        <Header currentPage="orders" onNavigate={handleNavigate} />
        <OrderDetails
          orderId={selectedOrderId}
          onBack={() => setCurrentView('orders')}
        />
      </>
    );
  }


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <span className="text-3xl">🍔</span>
              </div>
              <h1 className="text-4xl md:text-5xl bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Welcome to RestoBot
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Manage your restaurant with ease
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              title="Menu Management"
              value="312 items"
              icon={Menu}
              href="/menu"
              bgColor="bg-gradient-to-br from-orange-100 to-orange-50"
              trend={{
                value: '-1.2%',
                isPositive: false,
                label: 'vs yesterday',
              }}
            />

            <DashboardCard
              title="Orders Today"
              value="87"
              icon={ShoppingCart}
              href="/orders"
              bgColor="bg-gradient-to-br from-orange-100 to-orange-50"
              trend={{
                value: '+12.5%',
                isPositive: true,
                label: 'vs yesterday',
              }}
            />

            <DashboardCard
              title="Revenue"
              value="$12,450"
              icon={DollarSign}
              href="/analytics"
              bgColor="bg-gradient-to-br from-orange-100 to-orange-50"
              trend={{
                value: '+8.3%',
                isPositive: true,
                label: 'this month',
              }}
            />

            <DashboardCard
              title="Analytics"
              value="View Reports"
              icon={LineChart}
              href="/analytics"
              bgColor="bg-gradient-to-br from-green-100 to-green-50"
              trend={{
                value: '156',
                isPositive: true,
                label: 'total customers',
              }}
            />

            <DashboardCard
              title="WhatsApp AI ChatBot"
              value="Active"
              icon={MessageCircle}
              href="https://web.whatsapp.com/"
              bgColor="bg-gradient-to-br from-green-100 to-green-50"
              trend={{
                value: '100',
                isPositive: true,
                label: 'responses this month',
              }}
            />

            <DashboardCard
              title="Customers"
              value="1,234"
              onClick={() => router.push('/customers')}
              icon={Users}
              bgColor="bg-gradient-to-br from-green-100 to-green-50"
              trend={{
                value: '+15.2%',
                isPositive: true,
                label: 'new this week',
              }}
            />
          </div>

          {/* Quick Actions */}
          <div className="mt-12">
            <h2 className="text-2xl mb-6 text-center">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => router.push('/menu/create-menu-item')}
                className="p-6 bg-white rounded-2xl border-2 border-border hover:border-primary hover:shadow-lg transition-all text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <Menu className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg mb-1">Add Menu Item</h3>
                <p className="text-sm text-muted-foreground">Create new dish</p>
              </button>

              <button
                onClick={() => router.push('/orders')}
                className="p-6 bg-white rounded-2xl border-2 border-border hover:border-secondary hover:shadow-lg transition-all text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-secondary/20 transition-colors">
                  <ShoppingCart className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-lg mb-1">New Order</h3>
                <p className="text-sm text-muted-foreground">Take an order</p>
              </button>

              <button
                onClick={() => router.push('/analytics')}
                className="p-6 bg-white rounded-2xl border-2 border-border hover:border-primary hover:shadow-lg transition-all text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <LineChart className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg mb-1">View Reports</h3>
                <p className="text-sm text-muted-foreground">Analytics & insights</p>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12 bg-white rounded-2xl border-2 border-border p-6">
            <h2 className="text-2xl mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: 'New order received', time: '2 minutes ago', color: 'text-green-600' },
                { action: 'Menu item updated', time: '15 minutes ago', color: 'text-blue-600' },
                { action: 'Customer review received', time: '1 hour ago', color: 'text-purple-600' },
                { action: 'Daily report generated', time: '3 hours ago', color: 'text-orange-600' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activity.color.replace('text-', 'bg-')}`} />
                    <span className="text-gray-700">{activity.action}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
/*export default function Home() {
  return (
    <>
      <div className="bg-orange-100 min-h-screen p-6">
        <div className="max-w-7xl mx-auto bg-[url(/.svg)] bg-center bg-repeat-y ...">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-red-800 font-mono text-5xl text-center">Welcome to <Image src="/restaubot_logo.png" alt="Restobot Logo" className="inline-block h-12 w-auto ml-2" width={120}
                  height={32}/>🍔</h1>

          </div>
          

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

            <Link 
            href="/menu" 
            className="block bg-yellow-500 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition transform duration-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Menu Management</h2>
              <Hamburger className="h-6 w-6 text-gray-700"/>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">312</p>
            <span className="text-sm text-red-600 flex items-center">
              🔽 -1.2% vs yesterday
            </span>
          </Link>
            <Link
            href="/orders" 
            className="block bg-yellow-500 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition transform duration-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Orders</h2>
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">312</p>
            <span className="text-sm text-red-600 flex items-center">
              🔽 -1.2% vs yesterday
            </span>
          </Link>
            
            <a 
            href="/analytics" 
            className="block bg-yellow-500 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition transform duration-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Analytics</h2>
              <ChartNoAxesCombined className="h-6 w-6 text-gray-700" />

            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">$12,450</p>
            <span className="text-sm text-red-600 flex items-center">
              🔽 -1.2% this month
            </span>
          </a>

            <a 
            href="https://web.whatsapp.com/" 
            className="block bg-green-500 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition transform duration-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Whatsapp Ai chatBot</h2>
              <MessageCircleIcon className="h-6 w-6" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">Use it now !</p>
            <span className="text-sm text-red-600 flex items-center">
              🔽 100 responsive this month
            </span>
          </a>
            
            <AdminComponent />
            
          </div>
          
        </div>
      </div>
    </>
  );
}*/
