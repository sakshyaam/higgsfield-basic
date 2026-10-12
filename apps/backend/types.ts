import { password } from "bun";
import z from "zod"

export const createUserSchema = z.object({
    username : z.string(),
    password : z.string()
})

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional(),
  });
  
  const signinSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  
  const avatarSchema = z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    prompt: z.string().optional(),
  });
  
  const videoSchema = z.object({
    prompt: z.string().optional(),
    avatarId: z.string().optional(),
    modelId: z.string().optional(),
  });
  