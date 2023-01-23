import './App.css';
import Subjects from './components/subjects';
import Navbar from './components/navBar';
import LogIn from './components/logIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/signUp';
import Profile from './components/profile';
import Reset from './components/reset';

function App() {
  return (
    <BrowserRouter>

      <Navbar/>

      <Routes>
        <Route path="/" element={<Subjects/>}/>
        <Route path="/login" element={ <LogIn/>}/>      
        <Route path="/signup" element={ <SignUp/>}/>      
        <Route path="/profile" element={ <Profile/>}/>      
        <Route path="/resetpassword" element={ <Reset/>}/>      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
