'use client';
import { useState } from 'react';
import { Menu, X, Bell, User, Home, Package, ShoppingCart, BarChart3, MessageCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  SignedIn,
  UserButton,
} from '@clerk/nextjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

interface HeaderProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  userName?: string;
  notificationCount?: number;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Menu', href: '/menu', icon: Package },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export function Header({ 
  currentPage = 'home', 
  onNavigate,
  userName = 'Admin User',
  notificationCount = 4
}: HeaderProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setMobileMenuOpen(false);
    onNavigate?.(page);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-secondary shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
                <span className="text-3xl">🍔</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl text-white">RestoBot</h1>
                <p className="text-xs text-white/80">Restaurant Management</p>
              </div>
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = router.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-white text-primary shadow-md'
                        : 'text-white/90 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="relative text-white hover:bg-white/20"
                  >
                    <Bell className="h-5 w-5" />
                    {notificationCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary border-2 border-white text-xs">
                        {notificationCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-96 overflow-y-auto">
                    <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
                      <div className="flex items-center gap-2 w-full mb-1">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-medium">New Order #1234</span>
                      </div>
                      <span className="text-sm text-muted-foreground">2 minutes ago</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
                      <div className="flex items-center gap-2 w-full mb-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="font-medium">Menu item updated</span>
                      </div>
                      <span className="text-sm text-muted-foreground">15 minutes ago</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
                      <div className="flex items-center gap-2 w-full mb-1">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <span className="font-medium">New customer review</span>
                      </div>
                      <span className="text-sm text-muted-foreground">1 hour ago</span>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center cursor-pointer text-primary">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <SignedIn>
                <UserButton />
              </SignedIn>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/20"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Wavy bottom border */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-full">
          <svg
            className="relative block w-full h-8 sm:h-12"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path
              fill="#f97316"
              fillOpacity="0.3"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
            <path
              fill="#f97316"
              d="M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,16C1120,11,1280,21,1360,26.7L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
          </svg>
        </div>

        
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute right-0 top-20 w-64 bg-white rounded-l-2xl shadow-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* User Info */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                <User className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{userName}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1 mb-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.href;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigate(item.href)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </button>
                );
              })}
            </nav>

            <div className="border-t pt-4 space-y-1">
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">
                <MessageCircle className="h-5 w-5" />
                Contact Support
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
                <LogOut className="h-5 w-5" />
              </button>

              
            </div>
          </div>
        </div>
      )}
    </>
  );
}
