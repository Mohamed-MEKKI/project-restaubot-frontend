export  function createUser(formData: FormData) {
    'use server'
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const address = formData.get('address') as string
    const phone = formData.get('phone') as string   
}

export function deleteUser(formData: FormData) {
    'use server'
    const userId = formData.get('userId') as string
    // Perform delete operation here
}
export function updateUser(formData: FormData) {
    'use server'
    const userId = formData.get('userId') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const address = formData.get('address') as string
    const phone = formData.get('phone') as string
    // Perform update operation here
}