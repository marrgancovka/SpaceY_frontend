import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import './Applications.css'
import TableOneApp from "../../components/TableOneApp/TableOneApp"
import { appSet } from "../../store/slices/draft_slice"
import { useNavigate } from "react-router-dom"


const ApplicationsPage:FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const idApp = useSelector((state: RootState) => state.draft.appId);
    const [flights, setFlights] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getApps = async () => {
        try {
            console.log(token, idApp)
            const res = await axios.get(`api/application/${idApp}`, {headers: {"Authorization": `Bearer ${token}`}})
            setFlights(res.data.flights)
            
        } catch (error) {
            console.log("Ошибка в получении заявки", error)
        }
    }


    const deleteApp = async () => {
        try {
            await axios.delete(`api/application/${idApp}`, {headers: {"Authorization": `Bearer ${token}`}})
            dispatch(appSet({app:false, appId:0}))
            navigate('/starships')

        } catch (error) {
            console.log("Ошибка при удалении", error)
        }

    }
    const formHandler = async () => {
        try {
            if (flights.length == 0){
                console.log("Нет выбранных полетов")
            }
            await axios.put('api/application/client', {"id": idApp, "status": "formated"},{headers: {"Authorization": `Bearer ${token}`}})
            dispatch(appSet({app:false, appID: 0}))
            navigate('/starships')
        } catch (error) {
            console.log("Ошибка при отправке заявки", error)
        }
    }

    useEffect(() => {
        getApps()
    },[idApp])
    return(
        <div className="block marg">
            <h1 className="app_title">Новая заявка</h1>
            <TableOneApp ships={flights}
                        formHandler={formHandler}
                        deleteApp={deleteApp}
                        getApps = {getApps}
            />
        </div>
    )
}

export default ApplicationsPage