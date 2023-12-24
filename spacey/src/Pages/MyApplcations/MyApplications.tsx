import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useNavigate } from "react-router-dom"
import TableApplications from "../../components/TableApplications/TableApplications"


const MyApplicationsPage:FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const idApp = useSelector((state: RootState) => state.draft.appId);
    const [apps, setApps] = useState([])

    const getApps = async () => {
        try {
            console.log(token, idApp)
            const resp = await axios.get(`api/applications`, {headers: {"Authorization": `Bearer ${token}`}})
            setApps(resp.data.data)
            console.log(resp.data.data)
            
        } catch (error) {
            console.log("Ошибка в получении заявок", error)
        }
    }

    useEffect(() => {
        getApps()
    },[idApp])
    return(
        <div className="block marg">
            <h1 className="app_title">Мои заявки</h1>
            <TableApplications apps={apps} />
        </div>
    )
}

export default MyApplicationsPage