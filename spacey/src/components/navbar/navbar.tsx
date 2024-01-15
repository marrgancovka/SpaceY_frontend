import logo from './spacey_white.png'
import './navbar.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../store/store'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {logoutUser} from '../../store/slices/auth_slices'



function Navigate() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const is_authenticated = useSelector((state: RootState) => state.auth.is_authenticated);
  const appID = useSelector((state: RootState) => state.draft.appId);
  const role = useSelector((state: RootState) => state.auth.role);
  const token = useSelector((state: RootState) => state.auth.token)
  const userName = useSelector((state: RootState) => state.auth.username)
  const logout = async () =>{
    try {
      await axios.get('/api/logout', {
          headers: {"Authorization": `Bearer ${token}`}
      });
      console.log(1)
      dispatch(
        logoutUser()
      );
      console.log(1)

      if (!location.pathname.includes("/starships")){
          navigate('/starships')
      }
      console.log(1)

      } catch (error) {
      console.error('Ошибка при выходе:', error);
      }
  }
  const toDraft = () =>{
    navigate(`/application/${appID}`)
  }

  return (
    <div className="mynavbar">
      <div className="brand-nav-container">
    <div className="navbar-brand">
        <img src={logo} alt="Logo" height="30"/>
    </div>
    <div className="nav">
        <Link to="/starships" className="link_navbar">Корабли</Link>
        {is_authenticated && role=="client" &&<Link to={"/applications"} className="link_navbar" >История заявок</Link>}
        {is_authenticated && role=="admin" &&<Link to={"/applications"} className="link_navbar">Заявки</Link>}
        {is_authenticated && role=="admin" &&<Link to={"/starships/list"} className="link_navbar" style={{ lineHeight: 1 }}>Редактировать космолеты</Link>}
        
    </div>
    </div>
    <div className='name-buttons'>
    <div className='my_name'>{userName}</div>
    <div className='buttons'>
      {is_authenticated && appID!=0 && <button className="btn_log" onClick={toDraft}>Корзина</button>  }
      {is_authenticated && appID==0 && <button className="btn_log btn_deactive" disabled={true} >Корзина</button>  }
    {is_authenticated 
     ? <button className="btn_log" onClick={logout}>Выйти</button> 
     : <button className="btn_log" onClick={() => navigate(`/login`, {replace: true})}>Войти</button>}
     </div>
    </div>
</div>


    
    // <Navbar expand="lg" className="mynavbar" data-bs-theme="dark" fixed='top'>
    //   <Container>
    //   <Navbar.Brand>
    //         <img
    //           src={logo}
    //           width="100%"
    //           height="30"
    //           className="d-inline-block align-top"
    //           alt="React Bootstrap logo"
    //         />
    //       </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <NavLink to="/starships" className="link_navbar">Корабли</NavLink>
    //         {is_authenticated && role=="client" &&<NavLink to={"/applications"} className="link_navbar" >История заявок</NavLink>}
    //         {is_authenticated && role=="admin" &&<NavLink to={"/starships/list"} className="link_navbar">Редактировать космолеты</NavLink>}
    //         {is_authenticated && role=="admin" &&<NavLink to={"/applications"} className="link_navbar">Заявки</NavLink>}
    //       </Nav>
    //     </Navbar.Collapse>
    //     <div className='my_name'>{userName}</div>
    //     <div className="buttons">
    //           {is_authenticated && appID!=0 && <button className="btn_log" onClick={toDraft}>Корзина</button>  }
    //           {is_authenticated && appID==0 && <button className="btn_log btn_deactive" disabled={true} >Корзина</button>  }
    //         </div>
    //     <div className="buttons">
    //             {is_authenticated 
    //             ? <button className="btn_log" onClick={logout}>Выйти</button> 
    //             : <button className="btn_log" onClick={() => navigate(`/login`, {replace: true})}>Войти</button>}
    //         </div>
            
            
    //   </Container>
    // </Navbar>
  );
}

export default Navigate;