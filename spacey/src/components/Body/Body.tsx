import React, { FC } from "react";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
// import search_img from './search.png'
import Form from 'react-bootstrap/Form';
import Breadcrumbs from "../Breadcrumb/Breadcrumb";
import './Body.css'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { appSet } from "../../store/slices/draft_slice";
import { RootState } from "../../store/store";


const Body: FC = () => {
    const [ships, setShips] = useState<any[]>([])
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.auth.token)
  const id = useSelector((state: RootState) => state.draft.appId)
  const app = useSelector((state: RootState) => state.draft.app)



    const getShips = async () => {
        try {
            const resp = await axios.get('api/ships', {headers: {Authorization: `Bearer ${token}`}})
            setShips(resp.data?.data)
            dispatch(
                appSet({
                        app: false,
                        appId: resp.data.app
                    }
                )
            ) 
            
        } catch (error) {
            console.log("Ошибка получения данных", error)
        }
    }

    useEffect(() => {
        getShips()
      }
    ,[app]);

    const searchHandler = async () => {
        try {
            const response = await fetch(`api/ships?search=${search}`);
            const jsonData = await response.json();
            setShips(jsonData.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(search)
        searchHandler(event);
    }
    if (ships.length==0){
        return (
            <div className="body">
            <div className="block">
                <div className="mytop">
                <Breadcrumbs title="" id=""/>
                <Form className="search" method="GET" role="search" action="/starships" onSubmit={handleFormSubmit}>
                    <Form.Group className="" controlId="formBasicEmail">
                        <Form.Control 
                        type="search" 
                        placeholder="Поиск по названию" 
                        className="myinput" 
                        name="search" 
                        autoComplete="off" 
                        value={search} onChange={(e) => {setSearch(e.target.value)
                        console.log(e.target.value)
                        console.log(search)
                        }}/>
                    </Form.Group>
                    {/* <Button variant="light" type="submit" className="btn_submit">
                        <img src={search_img} alt="" className="search_image"/>
                    </Button> */}
                </Form>
                </div>
                <div className="card_container notFound">
                    Ничего не найдено :(
                </div>
            </div>
            </div>
        )
    }
    return(
        <div className="body">
        <div className="block">
            <div className="mytop">
            <Breadcrumbs title="" id=""/>
            <Form className="search" method="GET" role="search" action="/starships" onSubmit={handleFormSubmit}>
                <Form.Group className="" controlId="formBasicEmail">
                    <Form.Control 
                    type="search" 
                    placeholder="Поиск по названию" 
                    className="myinput" 
                    name="search" 
                    autoComplete="off" 
                    value={search} onChange={(e) => {setSearch(e.target.value)
                    console.log(e.target.value)
                    console.log(search)
                    }}/>
                </Form.Group>
                {/* <Button variant="light" type="submit" className="btn_submit">
                    <img src={search_img} alt="" className="search_image"/>
                </Button> */}
            </Form>
            </div>
            <div className="card_container">
                {ships.map((item) => (
                    <Card data={item}/>
                ))}
            </div>
        </div>
        </div>
    )
}

export default Body;