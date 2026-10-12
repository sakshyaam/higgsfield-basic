import express from "express"  
import { createAvatarSchema, createUserSchema } from "./types"
import { prisma } from "./db";
import { GoogleGenAI } from "@google/genai";
import fs from "fs"
import { createImage } from "./image";
import axios from "axios";
import { uuid } from "zod";
const app = express()
app.use(express.json())

const ai = new GoogleGenAI({
  apiKey : process.env.GOOGLE_API_KEY
})


app.post('/api/v1/signup', async (req,res) => {
  const {success, data} = createUserSchema.safeParse(req.body)

  if(!success) {
    return res.status(400).json({
      message : "incorrect credentials"
    })
  }
  const {username, password} = data

  const hashedPassword = await Bun.password.hash(password)
  const existingUser = await prisma.users.findUnique({
    where : {
      username : username
    }
  })

  if(existingUser){
    return res.status(400).json({
      message : "username alreadye exists"
    })
  }

  const user = await prisma.users.create({
    data : {
      username : data.username,
      password : hashedPassword
    }
  })

  return res.status(200).json({
    message : "SignUp Successfull",
    username : username
  })
})


app.post('/api/v1/signin', async (req,res) =>{

  const {success, data} = createUserSchema.safeParse(req.body)

  if(!success) {
    return res.status(400).json({
      message : "incorrect credentials"
    })
  }
  const {username, password} = data

  const user = await prisma.users.findUnique({
    where : {
      username : username
    }
  })

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const isMatch = await Bun.password.verify(password, user?.password)

  if(!isMatch) {
    return res.status(400).json({
      message : "incorrect password"
    })
  }

  return res.status(200).json({
    message : "user signedIn"
  })
  })



app.post("/api/v1/avatar", async (req,res) => {

  const {success, data }= createAvatarSchema.safeParse(req.body)

  if(!success) {
    return res.status(400).json({
      message : "incorrect credentials"
    })
  }
  
    const {name , image} = data
    
    const leftView = uuid()
    const topView = uuid()

    await Promise.all([
      createImage("create a top view of the image", image,  `./assets/${leftView}`),
      createImage("create a top view of the image", image,  `./assets/${topView}`)

    ])


  
  }
)
