import { z } from 'zod'

export const hotelSchema = z.object({
  name: z
    .string({ message: 'The name is required' }) // This is for when the name on the object comes like: {}.
    .min(1, { message: 'The name is required' }) // This is for when the name on the object comes like: { "name":"" }.
    .min(5, { message: 'The name must be at least 5 characters' })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: 'The name must have only letters, numbers, and spaces' }),
  type: z
    .string({ message: 'The type is required' }) // This is for when the type on the object comes like: {}.
    .min(1, { message: 'The type is required' }), // This is for when the type on the object comes like: { "type":"" }.
  city: z
    .string({ message: 'The city is required' }) // This is for when the city on the object comes like: {}.
    .min(1, { message: 'The city is required' }) // This is for when the city on the object comes like: { "city":"" }.
    .min(5, { message: 'The city must be at least 5 characters' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'The city must have only letters and spaces' }),
  address: z
    .string({ message: 'The address is required' }) // This is for when the address on the object comes like: {}.
    .min(1, { message: 'The address is required' }) // This is for when the address on the object comes like: { "address":"" }.
    .min(5, { message: 'The address must be at least 5 characters' })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: 'The address must have only letters, numbers, and spaces' }),
  distance: z
    .string({ message: 'The distance is required' }) // This is for when the distance on the object comes like: {}.
    .min(1, { message: 'The distance is required' }) // This is for when the distance on the object comes like: { "distance":"" }.
    .regex(/^[0-9.]+$/, { message: 'The distance must have only numbers and the point character' }),
  title: z
    .string({ message: 'The title is required' }) // This is for when the title on the object comes like: {}.
    .min(1, { message: 'The title is required' }) // This is for when the title on the object comes like: { "title":"" }.
    .min(5, { message: 'The title must be at least 5 characters' })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: 'The title must have only letters, numbers, and spaces' }),
  description: z
    .string({ message: 'The description is required' }) // This is for when the description on the object comes like: {}.
    .min(1, { message: 'The description is required' }) // This is for when the description on the object comes like: { "description":"" }.
    .min(5, { message: 'The description must be at least 5 characters' })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: 'The description must have only letters, numbers, and spaces' }),
  cheapestPrice: z
    .string({ message: 'The price is required' }) // This is for when the price on the object comes like: {}.
    .min(1, { message: 'The price is required' }) // This is for when the price on the object comes like: { "price":"" }.
    .regex(/^[0-9.]+$/, { message: 'The price must have only numbers and the point character' })
})
