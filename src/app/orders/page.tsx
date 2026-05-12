'use client';

import Link from 'next/link';
import OrderStatusSelect from '@/components/OrderStatusSelect';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { ButtonGroup } from 'primereact/buttongroup';
import { OrdersList as OrdersListComponent} from '@/components/OrdersList';


export default function Orders() {
  
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  
   useEffect(() => {
      setIsLoading(true);
      async function fetchItems() {
        
        try {
        const response = await fetch('http://127.0.0.1:8000/order/get-all/');
        const data = await response.json();
        setOrders(data);
        } catch (error) {
        console.error('Failed to fetch menu items:', error);
        } finally {
        setIsLoading(false);
        }
      }
  
      fetchItems();
    }, []);

    const [clicked, setClicked] = useState(false);
    const [deletingId, setDeletingID] = useState(0);

   useEffect(() => {
      setIsLoading(true);
      async function deleteItems() {
        if (clicked && deletingId) {
          try {
          const response = fetch(`http://127.0.0.1:8000/order/delete/${deletingId.toString()}`, {
            headers:{
              'Content-Type':"application/json"
            },
            method: 'DELETE'
          })
          console.log('Items deleted successfully');
          setClicked(false);
          
          window.location.reload();
          }
          catch(error){
            console.error('Error deleting items:', error);
            throw new Error('Failed to delete items');
          }
          finally {
            setIsLoading(false);
          }
        }else{
          console.log("No ID found");
          setClicked(false);
        }
      }
      deleteItems();
      
    }, [clicked, deletingId]);

 
  return (
    <OrdersListComponent/>
  )
}


