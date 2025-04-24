'use client';

import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Rating } from 'primereact/rating';
import { classNames } from 'primereact/utils';
import React from 'react';

export default function Menu() {
  const products = [
    {
      id: 1000,
      name: 'Bamboo Watch',
      image: 'bamboo-watch.jpg',
      description: 'Product Description',
      price: 65,
      category: 'Accessories',
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: 1001,
      name: 'Black Watch',
      image: 'black-watch.jpg',
      description: 'Product Description',
      price: 72,
      category: 'Accessories',
      inventoryStatus: 'LOWSTOCK',
      rating: 4,
    },
    {
      id: 1002,
      name: 'Blue Band',
      image: 'blue-band.jpg',
      description: 'Product Description',
      price: 79,
      category: 'Fitness',
      inventoryStatus: 'OUTOFSTOCK',
      rating: 3,
    },
  ];

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
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

  const itemTemplate = (product, index) => {
    return (
      <div className="col-12" key={product.id}>
        <div className={classNames('flex flex-col xl:flex-row p-4 gap-4 border-b')}>
          <img
            className="w-32 h-auto shadow-md rounded"
            src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
            alt={product.name}
          />
          <div className="flex flex-col xl:flex-row justify-between w-full">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
              <Rating value={product.rating} readOnly cancel={false} />
              <div className="flex gap-3 items-center">
                <span className="flex gap-1 items-center">
                  <i className="pi pi-tag" />
                  <span className="font-medium">{product.category}</span>
                </span>
                <Tag value={product.inventoryStatus} severity={getSeverity(product)} />
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              <span className="text-xl font-bold">${product.price}</span>
              <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded mt-2"
                disabled={product.inventoryStatus === 'OUTOFSTOCK'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return <div>No items found.</div>;
    return <div className="grid">{items.map(itemTemplate)}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6">Menu</h1>
        <div className='"bg-white p-8 rounded-[10px] mb-4'>
        <DataView
          value={products}
          layout="list"
          itemTemplate={itemTemplate}
          paginator
          rows={5}
        />
        </div>
    </div>
  );
}
