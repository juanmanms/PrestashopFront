import { z } from 'zod';

export const customerAddressSchema = z.object({
    firstname: z.string().min(1, 'El nombre es requerido'),
    lastname: z.string().min(1, 'Los apellidos son requeridos'),
    email: z.string().email('Email inválido'),
    passwd: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    gender: z.enum(['0', '1', '2']),
    newsletter: z.boolean(),
    optin: z.boolean(),
    address1: z.string().min(1, 'La dirección es requerida'),
    postcode: z.string().min(1, 'El código postal es requerido'),
    city: z.string().min(1, 'La ciudad es requerida'),
    id_country: z.number().int().positive(),
    id_state: z.number().int().positive().nullable(),
    alias: z.string().min(1, 'El alias de la dirección es requerido'),
    phone: z.string().min(7, 'El teléfono es requerido'),
    phone_mobile: z.string().optional(),
});
