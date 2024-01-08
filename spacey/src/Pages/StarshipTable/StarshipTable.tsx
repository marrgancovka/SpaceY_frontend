import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import {  useNavigate } from "react-router-dom"
import StarshipTable from "../../components/StarshipTable/StarshipTable"
import Form from "react-bootstrap/esm/Form"
import { setSeachValue } from "../../store/slices/search_slice";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"


interface ship {
    ID: number;
    Title: string,
    Rocket: string,
    Type: string,
    Description: string,
    Image_url: string
};

const StarshipTablePage:FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [ships, setShips] = useState<ship[]>([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const search_value = useSelector((state: RootState) => state.search.value)
  let breadcrumbsItems = [
    { label: 'Корабли', link:'/starships' }, // Link to the current page
    { label: 'Корабли таблицей', link:`/starships/list` },
  ];

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.get(`/api/ships?search=${search_value}`, {headers: {Authorization: `Bearer ${token}`}});
        setShips(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
}
    const nullShip = {
        ID: 0,
        Title: '',
        Rocket: '',
        Type: '',
        Description: '',
        Image_url: null,
    }

    const getShips = async () => {
        try {
            const res = await axios.get(`/api/ships?search=${search_value}`, {headers: {"Authorization": `Bearer ${token}`}})
            console.log(res.data)
            setShips(res.data.data)
            
        } catch (error) {
            console.log("Ошибка в получении космолетов", error)
        }
    }


    const deleteShip = async (id: number) => {
        console.log("delete", id)
        try {
            await axios.delete(`/api/ships/${id}`, {headers: {"Authorization": `Bearer ${token}`}})
            setShips((prevShip)=>prevShip.filter(sh => sh.ID !== id))
            
        } catch (error) {
            console.log("Ошибка в удалении космолета", error)
        }

    }
    const editShip = async (id: number) => {
        console.log("edit")
        navigate(`/starships/edit/${id}`)
    }

    const newShip = async () => {

        try {
            const res = await axios.post(`/api/ships/`, nullShip, {headers: {"Authorization": `Bearer ${token}`}})
            const id = res.data.id
            navigate(`/starships/edit/${id}`)
            
        } catch (error) {
            console.log("Ошибка в создании космолета", error)
        }
    }

    useEffect(() => {
        getShips()
    },[])
    return(
        <div className="block marg">
            <Breadcrumb items={breadcrumbsItems} className="lastitem"/>
            <h1 className="app_title">Космические корабли</h1>
            <div className="head_search">
            <button className="btnTrash" onClick={newShip}>Добавить новый</button>
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
                </Form>
            </div>
            <StarshipTable ships={ships} deleteShip={deleteShip} editShip={editShip}/>
            
            
           
        </div>
    )
}

export default StarshipTablePage