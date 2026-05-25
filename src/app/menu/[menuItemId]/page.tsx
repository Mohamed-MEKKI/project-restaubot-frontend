'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';
import { MenuItemEdit } from '@/components/MenuEditForm';
import { apiFetch } from '@/api/menuApi';
import { MenuItem } from 'interfaces/Menu'; // ← import from shared type, don't redefine here

export default function SingleMenuItemForm() {
  const { menuItemId } = useParams<{ menuItemId: string }>();
  const id = decodeURIComponent(menuItemId);
  const router = useRouter();

  const [item, setItem] = useState<MenuItem | null>(null); // ← was missing entirely
  const [isFetching, setIsFetching] = useState(true);
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !id) return;

    async function fetchItem() {
      setIsFetching(true);
      try {
        const token = await getToken();
        const data = await apiFetch(`/menuitem/get/${id}/`, token);
        setItem(data);
      } catch (error) {
        console.error('Failed to fetch item:', error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchItem();
  }, [isLoaded, isSignedIn, id]);

  const handleOnBack = () => router.push('/');

  if (!isLoaded || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Item not found.</p>
      </div>
    );
  }

  return <MenuItemEdit menuItem={item} onBack={handleOnBack} />;
}