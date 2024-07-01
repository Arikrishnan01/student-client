import './App.css';
import {Routes, Route} from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./pages/home/Home";
import Add from "./pages/add/Add";
import Edit from './pages/edit/Edit';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path='/student/add' element={<Add />} />
        <Route path='/student/:id' element={<Edit />}/>
      </Routes>
    </div>
  );
}

export default App;
