import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import {  useNavigate } from "react-router-dom"
import StarshipTable from "../../components/StarshipTable/StarshipTable"

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
    const idApp = useSelector((state: RootState) => state.draft.appId);
    const [ships, setShips] = useState<ship[]>([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getShips = async () => {
        try {
            const res = await axios.get(`/api/ships`, {headers: {"Authorization": `Bearer ${token}`}})
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

    useEffect(() => {
        getShips()
    },[])
    return(
        <div className="block marg">
            <h1 className="app_title">Космолеты</h1>
            <StarshipTable ships={ships} deleteShip={deleteShip} editShip={editShip}/>
           
        </div>
    )
}

export default StarshipTablePage