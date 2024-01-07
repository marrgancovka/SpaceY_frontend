import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import {  useNavigate } from "react-router-dom"
import StarshipTable from "../../components/StarshipTable/StarshipTable"


const StarshipTablePage:FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const idApp = useSelector((state: RootState) => state.draft.appId);
    const [ships, setShips] = useState([])
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
        
    }
    const editShip = async () => {
        console.log("edit")
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