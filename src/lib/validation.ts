import { z } from 'zod';
import { site } from './site';

export const bookingSchema = z.object({
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time slot'),
  guests: z.number().min(1, 'At least 1 guest required').max(site.booking.maxPartySize, `Maximum ${site.booking.maxPartySize} guests`),
  seating: z.enum(['Garden', 'Indoor']),
  occasion: z.string().min(1, 'Please select an occasion'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .min(10, 'Please enter a valid 10-digit phone number')
    .regex(/^[0-9+ -]{10,14}$/, 'Please enter a valid contact number'),
  email: z.string().email('Please enter a valid email address'),
  notes: z.string().max(300, 'Notes must be under 300 characters').optional(),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters').max(500, 'Message under 500 characters'),
  honeypot: z.string().max(0).optional(),
});

export const hireSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, '10-digit phone number is required'),
  role: z.string().min(1, 'Please select a role'),
  experience: z.string().min(1, 'Please describe your background'),
});
