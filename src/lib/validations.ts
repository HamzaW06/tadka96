import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .refine((v) => !/[<>{};=]/.test(v), 'Name contains invalid characters'),
  email: z.string().email('Invalid email address').max(200, 'Email too long'),
  subject: z
    .string()
    .min(2, 'Subject must be at least 2 characters')
    .max(200, 'Subject too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message too long (max 2000 characters)'),
})

export const menuItemSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().max(500).optional().nullable(),
  price: z.number().min(0, 'Price must be positive').max(999.99),
  priceSmall: z.number().min(0).max(999.99).optional().nullable(),
  priceLarge: z.number().min(0).max(999.99).optional().nullable(),
  image: z.string().url().optional().nullable().or(z.literal('')),
  categoryId: z.string().min(1, 'Category is required'),
  isBestSeller: z.boolean().default(false),
  isSpicy: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
})

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens'),
  note: z.string().max(500).optional().nullable(),
  sortOrder: z.number().int().default(0),
})

export const settingsSchema = z.object({
  restaurant_name: z.string().min(1).max(200).optional(),
  address: z.string().max(500).optional(),
  phone: z.string().max(50).optional(),
  email: z.string().email().optional(),
  instagram: z.string().url().optional().or(z.literal('')),
  facebook: z.string().url().optional().or(z.literal('')),
  instagram_handle: z.string().max(100).optional(),
  facebook_handle: z.string().max(100).optional(),
  hours: z.string().optional(),
  hours_display: z.string().max(500).optional(),
  tagline_main: z.string().max(300).optional(),
  tagline_hindi: z.string().max(300).optional(),
  tagline_short: z.string().max(300).optional(),
  about_text: z.string().max(2000).optional(),
  halal_certified: z.string().optional(),
  catering_available: z.string().optional(),
  catering_text: z.string().max(500).optional(),
  gratuity_note: z.string().max(500).optional(),
})

export type ContactInput = z.infer<typeof contactSchema>
export type MenuItemInput = z.infer<typeof menuItemSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type SettingsInput = z.infer<typeof settingsSchema>
