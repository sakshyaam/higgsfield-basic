import "./index.css";
import {BrowserRouter, Routes, Route} from "react-router"
import { Button } from "./components/ui/button";
import { Appbar } from "./components/Appbar.tsx";
import { Signin } from "./pages/Signin.tsx";
import { Signup } from "./pages/Signup.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Landing } from "./pages/Landing.tsx";
import { VideoCreate } from "./pages/VideoCreate.tsx";



export function App() {
  return (
     <div>
       <Appbar  />
       <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Landing />} />
          <Route path = "/signin" element = {<Signin />} />
          <Route path = "/signup" element = {<Signup />} /> 
          <Route path = "/dashboard" element = {<Dashboard />} />
          <Route path = "/videocreate" element = {<VideoCreate />} />
        </Routes>
      </BrowserRouter>
  </div>
)}

export default App;
