import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../../config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { data } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



async function createAvatar({url, name} : {url : string, name: string}) {
    const response = await axios.post(`${BACKEND_URL}/api/v1/avatar`, {
        name, image : url
    })
    
    return response.data;
}

async function getAvatar() {    
    const response = await axios.get(`${BACKEND_URL}/api/v1/avatars`)

    return response.data.avatars;
    
}
export function Dashboard() {

    const [avatarUrl, setAvatarUrl]  = useState("");
    const [name, setName] = useState("");
    const [avatars, setAvatars] = useState([])
    
    const mutation = useMutation({
        mutationFn : createAvatar,
        onSuccess : (data) =>{

        }
    })

    const query = useQuery({
        queryFn : getAvatar,
        queryKey : ['avatars']
    })

    return <div>

        DashBoard Page

        <div className="w-md border p-4">
            <Input onChange={(e) => setName(e.target.value)} />
            <Input onChange={(e) => setAvatarUrl(e.target.value)} />
            <Button onClick={ async () =>{
                await mutation.mutate({
                    name,url : avatarUrl
                })
            }}> Create Avatar </ Button>
        </div>

        
    </div>

}