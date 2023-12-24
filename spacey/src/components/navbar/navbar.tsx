import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './spacey_white.png'
import './navbar.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../store/store'
import { NavLink, useNavigate } from 'react-router-dom';
import {logoutUser} from '../../store/slices/auth_slices'



function Navigate() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const is_authenticated = useSelector((state: RootState) => state.auth.is_authenticated);
  const appID = useSelector((state: RootState) => state.draft.appId);
  const role = useSelector((state: RootState) => state.auth.role);
  const token = useSelector((state: RootState) => state.auth.token)
  const logout = async () =>{
    try {
      await axios.get('api/logout', {
          headers: {"Authorization": `Bearer ${token}`}
      });
      dispatch(
        logoutUser()
      );
      } catch (error) {
      console.error('Ошибка при авторизации:', error);
      }
  }
  const toDraft = () =>{
    navigate(`/application`)
  }

  return (
    
    <Navbar expand="lg" className="mynavbar" data-bs-theme="dark" fixed='top'>
      <Container>
      <Navbar.Brand>
            <img
              src={logo}
              width="100%"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/starships" className="link_navbar">Корабли</NavLink>
            {is_authenticated && role=="client" &&<NavLink to={"/applications"} className="link_navbar" >История заявок</NavLink>}
            {is_authenticated && role=="admin" &&<NavLink to={"/"} className="link_navbar">Редактировать список</NavLink>}
            {is_authenticated && role=="admin" &&<NavLink to={"/"} className="link_navbar">Заявки</NavLink>}
          </Nav>
        </Navbar.Collapse>
        <div className="buttons">
              {is_authenticated && appID!=0 && <button className="btn_log" onClick={toDraft}>Корзина</button>  }
              {is_authenticated && appID==0 && <button className="btn_log btn_deactive" disabled={true} >Корзина</button>  }
            </div>
        <div className="buttons">
                {is_authenticated 
                ? <button className="btn_log" onClick={logout}>Выйти</button> 
                : <button className="btn_log" onClick={() => navigate(`/login`, {replace: true})}>Войти</button>}
            </div>
            
      </Container>
    </Navbar>
  );
}

export default Navigate;