'use client'

import { useCallback, useState } from 'react'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import { putData } from '../api/client'

const orderStatus = [
  { name: 'pending' },
  { name: 'preparing' },
  { name: 'delivered' },
  { name: 'cancelled' },
]

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  preparing: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function OrderStatusSelect() {
  const [selected, setSelected] = useState(orderStatus[0]) // Default to first one

  const handleChange = useCallback (async (newStatus: { name: string }) => {
    setSelected(newStatus)
    console.log('Selected status:', newStatus.name)
   
    await putData('order', 1, newStatus.name) // Call your API here
    console.log('✅ Order status updated:', newStatus.name)
  
  }, [])
  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative mt-2">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            {/* Placeholder circle using span instead of <Image> */}
            <span className={`size-5 rounded-full ${statusColor[selected.name]}`} />
            <span className="block truncate">{selected.name}</span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
          {orderStatus.map((status) => (
            <ListboxOption
              key={status.name}
              value={status}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-focus:bg-indigo-600 data-focus:text-white"
            >
              <div className="flex items-center">
                <span className={`size-5 rounded-full ${statusColor[status.name]}`} />
                <span
                  className={`ml-3 block truncate font-normal group-data-selected:font-semibold`}
                >
                  {status.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
