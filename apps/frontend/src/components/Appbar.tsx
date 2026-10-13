import { Button } from "./ui/button";


export function Appbar() {
    return <div className=" bg-black text-white flex justify-between">
      <div className="p-4 text-xl text-white">
        HiggsField
      </div> 
  
       <div className="flex gap-2">  
            <div className="flex item-center p-2">
                <Button variant={"outline"}> SignIn</Button>  
              </div>     
              <div className="flex item-center p-2">
                <Button variant={"outline"}> SignUp </Button>                
              </div>
       </div>
    </div>
}