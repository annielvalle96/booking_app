import { z } from 'zod'

export const roomSchema = z.object({
  title: z
    .string({ message: 'The title is required' }) // This is for when the title on the object comes like: {}.
    .min(1, { message: 'The title is required' }) // This is for when the title on the object comes like: { "title":"" }.
    .min(5, { message: 'The title must be at least 5 characters' })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: 'The title must have only letters, numbers, and spaces' }),
  price: z
    .string({ message: 'The price is required' }) // This is for when the price on the object comes like: {}.
    .min(1, { message: 'The price is required' }) // This is for when the price on the object comes like: { "price":"" }.
    .regex(/^[0-9.]+$/, { message: 'The price must have only numbers and the point character' }),
  maxPeople: z
    .string({ message: 'The maximum people number is required' }) // This is for when the maximum people number on the object comes like: {}.
    .min(1, { message: 'The maximum people number is required' }) // This is for when the maximum people number on the object comes like: { "maxPeople":"" }.
    .regex(/^[0-9]+$/, { message: 'The maximum people number must have only numbers' }),
  description: z
    .string({ message: 'The description is required' }) // This is for when the description on the object comes like: {}.
    .min(1, { message: 'The description is required' }) // This is for when the description on the object comes like: { "description":"" }.
    .min(5, { message: 'The description must be at least 5 characters' })
    .regex(/^[a-zA-Z0-9\s]+$/, { message: 'The description must have only letters, numbers, and spaces' }),
  roomNumbers: z
    .array(z.object({ number: z.string({ message: 'The room numbers are required 1' }), unavailableDates: z.array(z.date()) }))
    .min(1, { message: 'At least one room number is required' })
    .refine(value => value.every(item => /^[0-9,]+$/.test(item.number)), { message: 'The Rooms field should have only numbers separated by commas' })
})
