import { useState } from 'react'
import Home from "./routing/home/Home";
import {BrowserRouter,Routes, Route} from  "react-router-dom"
import Students from './routing/students/Students';
import Teachers from './routing/teachers/Teachers';
import Classes from  './routing/classes/Classes';

function App() {


  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element= {<Home />}/>
            <Route path='students' element={<Students/>}/>
            <Route path='teachers' element={<Teachers/>}/>
            <Route path='classes' element={<Classes/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
