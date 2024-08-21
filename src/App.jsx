import { useState } from 'react'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import User from './Components/User/User';
import Admin from './Components/Admin/Admin'
import Graph from './Components/Graph/Graph'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route exact path='/' element={<Signup/>} />
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/User' element={<User/>}/>
        <Route path='/Admin' element={<Admin/>}/>
        <Route path='/Graph' element={<Graph/>}/>
      </Routes>
    </>
  )
}

export default App
