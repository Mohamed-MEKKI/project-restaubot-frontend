'use client'

import React, { useState, FormEvent } from 'react'
import { postItem } from '../api/client'

export default function Form() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
   
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      setIsLoading(true)
      setError(null) // Clear previous errors when a new request starts
   
      try {
        const formData = new FormData(event.currentTarget)
        /*const response = await fetch('/api/submit', {
          method: 'POST',
          body: formData,
        })*/
        const response  = await postItem('menuitem', formData)
        if (!response.ok) {
          throw new Error('Failed to submit the data. Please try again.')
        }
   
        const data = await response.json()
      }finally {
        setIsLoading(false)
      }
    }
   
    return (
      
      <div className="bg-gray-100 min-h-screen p-6">
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <form onSubmit={onSubmit}>
        <input type="text" name="name" placeholder="Item name" className="mb-2 p-2 border rounded" /><br />
        <input type="text" name="description" placeholder="Description" className="mb-2 p-2 border rounded" /><br />
        <input type="text" name="price" placeholder="Price" className="mb-2 p-2 border rounded" /><br />
        <input type="text" name="image" placeholder="image" className="mb-2 p-2 border rounded" /><br />
      
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>
      </div>
    )
  }