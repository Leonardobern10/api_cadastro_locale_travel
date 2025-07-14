import { Roles } from 'infra/database/models/Roles';
import { z } from 'zod';

export const clientSchema = z.object({
      nome: z.string().min(2),
      sobrenome: z.string().min(2),
      idade: z.number().min(18),
      email: z.string().email(),
      senha: z.string().min(6),
      role: z.enum([Roles.ADMIN, Roles.USER])
})