import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Grantee from "./pages/Grantee";
import Donor from "./pages/Donor";
import DonorIntro from "./components/DonorIntro";
import Projects from "./components/Projects";
import IndividualProject from "./components/IndividualProject";
import {LivepeerConfig, createReactClient, studioProvider,} from '@livepeer/react';

const client = createReactClient({
  provider: studioProvider({ apiKey: '24c8e4a8-0ab4-4199-9c34-d6328e31c25d' }),
});

function App() {
  return (
    <div className="App">
      <LivepeerConfig client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/grantee" element={<Grantee />} />
            <Route path="/donor" element={<Donor />} />
            <Route path="/donorintro" element={<DonorIntro />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<IndividualProject/>}/>
          </Routes>
        </BrowserRouter>
      </LivepeerConfig>
    </div>
  );
}

export default App;


// 24c8e4a8-0ab4-4199-9c34-d6328e31c25d