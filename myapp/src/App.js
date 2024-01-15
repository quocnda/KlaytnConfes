import logo from './logo.svg';
import './App.css';
import {About} from "./pages/About";
import { Home } from './pages/Home';
import { DetailsAboutDes } from './pages/DetailsAboutDes';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
function App() {
  return (
    <div className="App">
      <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/checkdetailaboutdes/:desid" element={<DetailsAboutDes/>}/>
        </Routes>
      </Router>
      </AppProvider>
      
    </div>
  );
}

export default App;
