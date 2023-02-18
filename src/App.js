import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Grantee from './pages/Grantee';
import Donor from './pages/Donor';
import DonorIntro from './components/DonorIntro';
import Projects from './components/Projects';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/grantee' element={<Grantee/>}/>
          <Route path='/donor' element={<Donor/>}/>
          <Route path='/donorintro' element={<DonorIntro/>}/>
          <Route path='projects' element={<Projects/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
