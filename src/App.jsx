import Show from './components/show/Show';
import Create from './components/create/Create';
import Edit from './components/edit/Edit';
import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  

  return (
    <div className='container-app'>
      <h1>Home</h1>
      <Routes>
        <Route path='/' element={ <Show/> } />
        <Route path='/create' element={ <Create/> } />
        <Route path='/edit/:id' element={ <Edit/> } />
      </Routes>    
    </div>
  )
}

export default App
