'use client';

import React from 'react';
import {ClientsList} from '@/components/ClientsList';
import { useRouter } from 'next/navigation';

export default function Customers() {
    const router = useRouter();
      const handleRoute = () => {
        router.push('/clients');
      };
    return (
        <ClientsList onBack={handleRoute}/>
    )
}