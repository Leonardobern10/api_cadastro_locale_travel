import { z } from 'zod';

export const clientSchema = z.object({
     nome: z.string().min(2).max(100).trim(),
     sobrenome: z.string().min(2).max(100).trim(),
     idade: z.number().int().min(0).max(120),
     email: z.email({ pattern: z.regexes.email }).toLowerCase().trim(),
     senha: z.string().min(6)
});
