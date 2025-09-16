'use client';

import { useEffect, useState, useRef, use, useCallback } from 'react';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { ButtonGroup } from 'primereact/buttongroup';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Rating } from 'primereact/rating';
import {useSearchParams} from 'next/navigation';
import Link from 'next/link';
import React from 'react';

export default function MenuClient() {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([])
  const toast = useRef(null)
  const searchParams = useSearchParams();

  
  useEffect(() => {
    const toastType = searchParams.get('toast')

    if (toastType === 'success'){
        setTimeout(() => {
            toast.current?.show({
              severity: 'success',
              summary: 'Success',
              detail : 'Item updated successfully ! ',
              life: 3000
          })
        }, 1000)
    }
    // Remove 'toast' param in a non-deprecated way
    const params = new URLSearchParams(searchParams.toString());
    params.delete('?toast');
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    
  },[searchParams])

  const handleToggleSelection = (id) => {
    setSelectedItems((prevSelected) => {
        if (prevSelected.includes(id)) {
            return prevSelected.filter(item => item !== id);
        } else {
            return [...prevSelected, id];
        }
    });
  }

  useEffect(() => {
    setIsLoading(true);
    async function fetchItems() {
      
      try {
      const response = await fetch('http://127.0.0.1:8000/menuitem/get-all/');
      const data = await response.json();
      setProducts(data);
      } catch (error) {
      console.error('Failed to fetch menu items:', error);
      } finally {
      setIsLoading(false);
      }
    }

    fetchItems();
  }, []);
  
  useEffect(() => {
    setIsLoading(true);
    async function deleteItems() {
      if (clicked && selectedItems.length > 0) {
        console.log('Deleting items with IDs:', selectedItems);
        try {
          const response = fetch('http://127.0.0.1:8000/menuitem/delete/', {
            headers:{
              'Content-Type':"application/json"
            },
            body: JSON.stringify({ids: selectedItems}),
            method: 'DELETE'
          })
          console.log('Items deleted successfully');
          setChecked(false);
          setClicked(false);
          // Optionally, refetch items to update the list
          //await fetchItems();
          window.location.reload();
        }
        catch(error){
          console.error('Error deleting items:', error);
          throw new Error('Failed to delete items');
          toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete items',
            life: 3000
          });
        }
        finally {
          setIsLoading(false);
        }
      }
    }
    deleteItems();
  }, [clicked]);

  const getSeverity = (status) => {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return null;
    }
  };

  // Individual item selection checkbox
  const itemTemplate = (product) => (
    <div key={product.id}
        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-5 mb-5"
      >
        <div className="flex flex-col xl:flex-row gap-6 items-center xl:items-start">
          <div className="card flex justify-center bg-gray-100 rounded-lg shadow-sm p-2">
            <Checkbox
              onChange={() => handleToggleSelection(product.id)}
              checked={Array.isArray(selectedItems) && selectedItems.includes(product.id)}
            />
          </div>

          <img
            src={`http://localhost:8000${product.image}`}
            alt={product.name}
            className="w-28 h-28 object-cover rounded-lg shadow-sm"
          />

          <div className="flex flex-col xl:flex-row justify-between w-full gap-4 xl:gap-0">
            {/* Product Info */}
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <Rating value={product.rating} readOnly cancel={false} />
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <i className="pi pi-tag" />
                  {product.cuisine}
                </span>
                <Tag
                  value={product.inventory_status}
                  severity={getSeverity(product.inventory_status)}
                />
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex flex-col items-end justify-between text-right gap-3">
              <span className="text-xl font-bold text-green-600">${product.price}</span>
              <div className="flex gap-2">
                <Button
                  icon="pi pi-shopping-cart"
                  className="p-button-sm p-button-rounded p-button-text"
                  disabled={product.inventory_status === 'OUTOFSTOCK'}
                />
                <Link
                  href={`/menu/${product.id}`}
                  icon="pi pi-eye"
                  className="p-button p-button-sm p-button-primary p-button-rounded"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  return (
    <>
      <div className="min-h-screen bg-orange-100 p-6">
        <Toast ref={toast} position="top-right" />
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Menu</h1>

          {isLoading ? (
            <div className="text-center text-gray-600">Loading menu...</div>
          ) : (
            <>
              <div className="card flex flex-row flex-nowrap mb-10 justify-center">
                <ButtonGroup className="shadow-lg rounded-lg bg-white p-2">
                  <a
                    href="/menu/create-menu-item"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-button p-button-sm p-button-success basis-64 mx-1"
                  >
                    <i className="pi pi-plus" />
                    Add Item
                  </a>
                  <Button
                    label="Delete"
                    icon="pi pi-trash"
                    className="p-button-sm p-button-danger basis-64 mx-1"
                    onClick={() => setClicked(true)}
                  />
                  <Button
                    label="Cancel"
                    icon="pi pi-times"
                    className="p-button-sm p-button-secondary basis-64 mx-1"
                    onClick={() => setChecked(false)}
                  />
                </ButtonGroup>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <DataView
                  value={products}
                  layout="list"
                  itemTemplate={itemTemplate}
                  paginator
                  rows={7}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
