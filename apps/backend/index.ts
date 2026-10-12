import express from "express"  
import { createUserSchema } from "./types"
import { prisma } from "./db";

const app = express()

app.use(express.json())



app.post('/api/v1/signup', async (req,res) => {
  const {success, data} = createUserSchema.safeParse(req.body)

  if(!success) {
    return res.status(400).json({
      message : "incorrect credentials"
    })
  }
  const {username, password} = data

  const hashedPassword = Bun.password.hash(password)
  const existingUser = await prisma.users.findUnique({
    where : {
      username : username
    }
  })

  if(existingUser){
    res.status(400).json({
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

