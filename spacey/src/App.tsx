import React from 'react'
import {FC} from 'react'
import StarshipsPage from './Pages/Starships/Starships.tsx'
import DetailsPage from './Pages/Details/Details.tsx'
import { Routes ,Route, BrowserRouter} from 'react-router-dom';
import Navigate from './components/navbar/navbar.tsx'
import Footer from './components/Footer/Footer.tsx'
import './css.css'


const StartPage: FC = () => {
    return (
      <BrowserRouter>
        <Navigate/>
        <Routes>
          <Route path='/starships' element={<StarshipsPage/>}/>
          <Route path='/starships/:id' element={<DetailsPage/>}/>
        </Routes>
        <Footer/>
  </BrowserRouter>
    )
}

export default StartPage