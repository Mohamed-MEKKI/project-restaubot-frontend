'use client';

import { useEffect, useState } from 'react';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { ButtonGroup } from 'primereact/buttongroup';
import { Tag } from 'primereact/tag';
import { Rating } from 'primereact/rating';
import Link from 'next/link';
import React from 'react';

export default function MenuClient() {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      setIsLoading(true);
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

  const itemTemplate = (product) => (
    <div key={product.id}
        className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-5 mb-5"
      >
        <div className="flex flex-col xl:flex-row gap-6 items-center xl:items-start">
          <div className="card flex justify-center">
          <Checkbox
            onChange={(e) => setChecked(e.checked)}
            checked={checked}
            onClick={() => alert(`Selected: ${product.name}`)}
          />
          </div>

          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Menu</h1>

        {isLoading ? (
          <div className="text-center text-gray-600">Loading menu...</div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <ButtonGroup>
                <a
                  href="/menu/create-menu-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-button p-button-sm"
                >
                  <i className="pi pi-plus mr-2" />
                  Add Item
                </a>
                <Button label="Delete" icon="pi pi-trash" className="p-button-sm p-button-danger" />
                <Button label="Cancel" icon="pi pi-times" className="p-button-sm p-button-secondary" />
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
  );
}
