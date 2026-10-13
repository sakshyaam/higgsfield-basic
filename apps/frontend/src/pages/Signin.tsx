import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios"
import { BACKEND_URL } from "../../config";

export function Signin() {

      const [username, setUsername] = useState("")
      const  [password, setPassword] = useState("")

      function Signup() {
            axios.post(`${BACKEND_URL}/api/v1/signin` )
      } 


      
      return <div className="min-h-screen min-w-screen flex">
         <div className="flex-1 min-h-screen bg-black">
             </div>
                <div className="flex-1 screen">
                  <div className="h-full flex items-center justify-center">
                     <Card className="p-8">
                     <Input placeholder="Username" onChange={(e) => {
                        setUsername(e.target.value)
                     }}>
                     </Input>
                     <Input placeholder="Password" onChange={(e) =>{
                        setPassword(e.target.value)
                     }}>
                     </Input>
               <Button variant={"outline"} onClick={Signup}> Signup</Button>
         </Card>
         </div>
         </div>
      </div>

}