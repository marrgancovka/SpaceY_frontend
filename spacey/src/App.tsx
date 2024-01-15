
import {FC} from 'react'
import StarshipsPage from './Pages/Starships/Starships.tsx'
import DetailsPage from './Pages/Details/Details.tsx'
import { Routes ,Route, BrowserRouter} from 'react-router-dom';
import Navigate from './components/navbar/navbar.tsx'
import Footer from './components/Footer/Footer.tsx'
import './css.css'
import LoginPage from './Pages/Login/Login.tsx';
import SignupPage from './Pages/SignUp/SignUp.tsx';
import ApplicationsPage from './Pages/Applications/Applications.tsx'
import MyApplicationsPage from './Pages/MyApplcations/MyApplications.tsx';
import StarshipTablePage from './Pages/StarshipTable/StarshipTable.tsx';
import EditStarshipPage from './Pages/EditStarship/EditStarship.tsx';

const StartPage: FC = () => {
    return (
      <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigate/>
        <div style={{ flex: '1 0 100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Routes>
          <Route path='/starships' element={<StarshipsPage/>}/>
          <Route path='/starships/:id' element={<DetailsPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path='/applications' element={<MyApplicationsPage/>}/>
          <Route path='/application/:id' element={<ApplicationsPage/>}/>
          <Route path='/starships/list' element={<StarshipTablePage/>}/>
          <Route path='/starships/edit/:id' element={<EditStarshipPage/>}/>

        </Routes>
        </div>
        <Footer/>
      </div>
  </BrowserRouter>
    )
}

export default StartPage