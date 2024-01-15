import { FC } from "react";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import Form from 'react-bootstrap/Form';
import Breadcrumbs from "../Breadcrumb/Breadcrumb";
import './Body.css'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { appSet } from "../../store/slices/draft_slice";
import { setSeachValue } from "../../store/slices/search_slice";
import { RootState } from "../../store/store";


const Body: FC = () => {
    const [ships, setShips] = useState<any[]>([])
    
    const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.auth.token)
  const app = useSelector((state: RootState) => state.draft.app)
  const search_value = useSelector((state: RootState) => state.search.value)



    const getShips = async () => {
        try {
            const resp = await axios.get(`api/ships?search=${search_value}`, {headers: {Authorization: `Bearer ${token}`}})
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



    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.get(`api/ships?search=${search_value}`, {headers: {Authorization: `Bearer ${token}`}});
            setShips(response.data.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    const breadcrumbsItems = [
        { label: 'Корабли', link:'' } // Link to the current page
      ];
    return(
        <div className="body">
        <div className="block">
            <div className="mytop">
            <Breadcrumbs items={breadcrumbsItems}/>
            <Form className="search" method="GET" role="search" action="/starships" onSubmit={(event)=>handleFormSubmit(event)}>
                <Form.Group className="" controlId="formBasicEmail">
                    <Form.Control 
                    type="search" 
                    placeholder="Поиск по названию" 
                    className="myinput" 
                    name="search" 
                    autoComplete="off" 
                    value={search_value} onChange={(e) => {dispatch(setSeachValue(e.target.value))}}/>
                </Form.Group>
                {/* <Button variant="light" type="submit" className="btn_submit">
                    <img src={search_img} alt="" className="search_image"/>
                </Button> */}
            </Form>
            </div>
            {ships.length!=0 && <div className="card_container">
                {ships.map((item) => (
                    <Card data={item}/>
                ))}
            </div>}
            {ships.length==0 && <div className="card_container notFound">
                    Ничего не найдено :(
                </div>}
        </div>
        </div>
    )
}

export default Body;