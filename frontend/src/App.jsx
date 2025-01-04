import React from 'react'
import './index.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import DeleteBooks from './pages/DeleteBooks'
import EditBook from './pages/EditBook'
import ShowBooks from './pages/Showbooks'

const App = () => {
  return (
     <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path='/books/create' element={<CreateBooks/>}/>
      <Route path='/books/details/:id' element={<ShowBooks/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/edit/:id' element={<DeleteBooks/>}/>
     </Routes>
  )
}

export default App
