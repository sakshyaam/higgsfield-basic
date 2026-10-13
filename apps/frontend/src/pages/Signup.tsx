import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios"
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router";
import { Query, QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



async function signup({username, password} : {username : string, password : string}) {
    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`,{
        username,
        password
    })

    return response.data
    
}


export function Signup() {

      const [username, setUsername] = useState("")
      const [password, setPassword] = useState("")
      const navigate = useNavigate();
      const query = useQueryClient();

      const mutation = useMutation({
        mutationFn : signup,
        onSuccess: () =>{
            localStorage.setItem("token", data.token) //assuming there is a token
            navigate("/dashboard")
         },
        onError : (error) =>{
            alert("error when signing up")
        }
      })

      
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
               <Button variant={"outline"} onClick={ async () =>{
                try { 
                    await mutation.mutate( {
                        username,
                        password
                    })
                } catch (error) {
                    alert("Error while signing up")
                }
               }}> {mutation.isPending ? "Signing up...." : "Signup"} Signup</Button>
               {mutation.isError && <p> Something went wrong. Try again</p>}
         </Card>
         </div>
         </div>
      </div>

}