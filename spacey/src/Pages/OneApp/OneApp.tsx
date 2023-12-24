import axios from "axios"
import { FC, useEffect, useState } from "react"
import {  useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useParams } from "react-router-dom"
import TableOneApplication from "../../components/TableOneApplication/TableOneApplication"


const OneApp:FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [apps, setApps] = useState([])
    const {id} = useParams()
    const getApp = async () => {
        try {
            const resp = await axios.get(`/api/application/${id}`, {headers: {"Authorization": `Bearer ${token}`}})
            setApps(resp.data.flights)
            console.log(resp.data.flights)
        } catch (error) {
            console.log("Ошибка в получении заявки", error)
        }
    }

    useEffect(() => {
        getApp()
    },[])
    return(
        <div className="block marg">
            <h1 className="app_title">Заявка</h1>
            <TableOneApplication ships={apps} />
        </div>
    )
}

export default OneApp