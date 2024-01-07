import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import TableApplications from "../../components/TableApplications/TableApplications"


const MyApplicationsPage:FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const role = useSelector((state: RootState) => state.auth.role);
    const idApp = useSelector((state: RootState) => state.draft.appId);
    const [apps, setApps] = useState([])

    const getApps = async () => {
        try {
            console.log(token, idApp)
            const resp = await axios.get(`/api/applications`, {headers: {"Authorization": `Bearer ${token}`}})
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
            { role=="client" && <h1 className="app_title">Мои заявки</h1>}
            { role=="admin" && <h1 className="app_title">Заявки</h1>}
            <TableApplications apps={apps} role={role}/>
        </div>
    )
}

export default MyApplicationsPage