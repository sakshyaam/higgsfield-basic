import "./index.css";
import {BrowserRouter, Routes, Route} from "react-router"
import { Button } from "./components/ui/button";
import { Appbar } from "./components/Appbar.tsx";
import { Signin } from "./pages/Signin.tsx";
import { Signup } from "./pages/Signup.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Landing } from "./pages/Landing.tsx";
import { VideoCreate } from "./pages/VideoCreate.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export function App() {
  return (
     <div>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
             <Routes>
               <Route path = "/" element = {<Landing />} />
               <Route path = "/signin" element = {<Signin />} />
               <Route path = "/signup" element = {<Signup />} /> 
               <Route path = "/dashboard" element = {<Dashboard />} />
               <Route path = "/videocreate" element = {<VideoCreate />} />
             </Routes>
           </BrowserRouter>
         </QueryClientProvider>
  </div>
)}

export default App;
