'use client';

import React from 'react';
import {MenuList as MenuListComponent} from '@/components/MenuList';
import { useRouter } from 'next/navigation';

export default function MenuClient() {
  const router = useRouter();
  const handleAddNew = () => {
    router.push('/menu/create-menu-item');
  };

  return (
    <MenuListComponent onAddNew={handleAddNew}/>
  )
}