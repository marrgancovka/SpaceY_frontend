import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import './Applications.css'
import TableOneApp from "../../components/TableOneApp/TableOneApp"
import { appSet } from "../../store/slices/draft_slice"
import { useLocation, useNavigate } from "react-router-dom"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"


const ApplicationsPage:FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const idApp = useSelector((state: RootState) => state.draft.appId);
    const [flights, setFlights] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const parts = location.pathname.split('/')
    const curId = parts[2]
    console.log(curId)
    const isNewApp = (idApp==Number(curId))
    
    let breadcrumbsItems = [
        { label: 'Корабли', link:'/starships' }, // Link to the current page
        { label: 'Заявки', link:`/applications` },
        { label: `Заявка №${curId}`, link:`/application/${curId}` },
      ];

    const getApps = async () => {
        try {
            const res = await axios.get(`/api/application/${curId}`, {headers: {"Authorization": `Bearer ${token}`}})
            setFlights(res.data.flights)
            
        } catch (error) {
            console.log("Ошибка в получении заявки", error)
        }
    }


    const deleteApp = async () => {
        try {
            await axios.delete(`/api/application/${idApp}`, {headers: {"Authorization": `Bearer ${token}`}})
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
            await axios.put('/api/application/client', {"id": idApp, "status": "formated"},{headers: {"Authorization": `Bearer ${token}`}})
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
        <div className="body">
        <div className="block mrg-2">
            <Breadcrumb items={breadcrumbsItems} className="lastitem"/>
            <h1 className="app_title">Заявка №{curId}</h1>
            <TableOneApp ships={flights}
                        formHandler={formHandler}
                        deleteApp={deleteApp}
                        getApps = {getApps}
                        isNewApp = {isNewApp}
            />
        </div>
        </div>
    )
}

export default ApplicationsPage