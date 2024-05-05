import { z } from 'zod'

export const registerSchema = z.object({
  username: z
    .string({ message: 'The username is required' }) // This is for when the username on the object comes like: {}.
    .min(1, { message: 'The username is required' }) // This is for when the username on the object comes like: { "username":"" }.
    .min(5, { message: 'The username must be at least 5 characters' })
    .regex(/^[a-zA-Z0-9]{3,16}$/, { message: 'The username must have only letters and numbers' }),
  email: z
    .string({ message: 'The email is required' }) // This is for when the email on the object comes like: {}.
    .min(1, { message: 'The email is required' }) // This is for when the email on the object comes like: { "email":"" }.
    .min(10, { message: 'The email must be at least 10 characters' })
    .email({ message: 'The email is not valid' })
    .regex(/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/, { message: 'The email has invalid characters' }),
  password: z
    .string({ message: 'The password is required' }) // This is for when the password on the object comes like: {}.
    .min(1, { message: 'The password is required' }) // This is for when the password on the object comes like: { "password":"" }.
    .min(5, { message: 'The password must be at least 5 characters' }),
  country: z
    .string({ message: 'The country is required' }) // This is for when the country on the object comes like: {}.
    .min(1, { message: 'The country is required' }) // This is for when the country on the object comes like: { "country":"" }.
    .min(3, { message: 'The country must be at least 3 characters' }),
  city: z
    .string({ message: 'The city is required' }) // This is for when the city on the object comes like: {}.
    .min(1, { message: 'The city is required' }) // This is for when the city on the object comes like: { "city":"" }.
    .min(3, { message: 'The city must be at least 3 characters' }),
  phone: z
    .string({ message: 'The phone is required' }) // This is for when the phone on the object comes like: {}.
    .min(1, { message: 'The phone is required' }) // This is for when the phone on the object comes like: { "phone":"" }.
    .min(10, { message: 'The phone must be at least 10 characters' })
})

export const loginSchema = z.object({
  username: z
    .string({ message: 'The username is required' }) // This is for when the username on the object comes like: {}.
    .min(1, { message: 'The username is required' }) // This is for when the username on the object comes like: { "username":"" }.
    .min(5, { message: 'The username must be at least 5 characters' })
    .regex(/^[a-zA-Z0-9]{3,16}$/, { message: 'The username must have only letters and numbers' }),
  password: z
    .string({ message: 'The password is required' }) // This is for when the password on the object comes like: {}.
    .min(1, { message: 'The password is required' }) // This is for when the password on the object comes like: { "password":"" }.
    .min(5, { message: 'The password must be at least 5 characters' })
})
