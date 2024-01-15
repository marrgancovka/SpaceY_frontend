import axios from "axios";
import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";


interface app {
    ID: number;
    Status: string;
    Date_creation: string;
    Date_formation: string;
    Date_end: string;
    User: string,
    Admin: string,
};
export type Props = {
    item : app,
    index: number,
    role: string,
    getApps: ()=>(void)
}

const OneLineApps:FC<Props> = ({item,role, getApps}) => {
    const [date, setDate] = useState(item.Date_end)
    const [admin, setAdmin] = useState(item.Admin)
    const token = useSelector((state: RootState) => state.auth.token);
    const name = useSelector((state: RootState) => state.auth.username);


    const navigate = useNavigate()
    const toApp = (id: number) =>{
        navigate(`/application/${id}`)
    }

    const cancel = async (id: number) =>{
        // setStatus("cancel")
        setDate((new Date()).toISOString())
        // setAdmin(name)
        try {
            await axios.put('/api/application/admin', {"id": id, "status": "cancel"},{headers: {"Authorization": `Bearer ${token}`}})
            getApps()
        } catch (error) {
            console.log("Ошибка при принятии заявки", error)
        }

    }
    const ok = async (id: number) =>{
        // setStatus("accepted")
        setDate((new Date()).toISOString())
        // setAdmin(name)
        try {
            await axios.put('/api/application/admin', {"id": id, "status": "accepted"},{headers: {"Authorization": `Bearer ${token}`}})
            getApps()
        } catch (error) {
            console.log("Ошибка при принятии заявки", error)
        }

    }

    useEffect(()=>{
        
    }
    ,[item])

    return(
        <tr key={item.ID} className='table-row'>
                                <td>{item.ID}</td>
                                { role=="client" && <td>{item.Date_creation === "0001-01-01T00:00:00Z" ? '-' : item.Date_creation.split('T')[0]}</td>}
                                <td>{item.Date_formation=== "0001-01-01T00:00:00Z" ? '-' : item.Date_formation.split('T')[0]}</td>
                                <td>{date=== "0001-01-01T00:00:00Z" ? '-' : date.split('T')[0]}</td>
                                
                                <td>
                                    {item.Status === 'created' ? 'Создана' :
                                        item.Status === 'formated' ? 'Сформирована' :
                                        item.Status === 'accepted' ? 'Завершена' :
                                        item.Status === 'cancel' ? 'Отменена' : '-'}
                                </td>
                                {role=="admin" && <td>{item.User}</td>}
                                {role=="admin" && (item.Status=='accepted' || item.Status=='cancel')  && item.Admin!="" ?  <td>{item.Admin}</td> : role=='client' ? <></>  : <td>-</td>}
                                { (role=="admin" && item.Status=="formated") ? <td>
                                    <button className="btnTrash mr" onClick={()=> ok(item.ID)}>Принять</button>
                                    <button className="btnTrash" onClick={()=> cancel(item.ID)}>Отменить</button>
                                </td> : role=="admin" ?  
                                    <td>
                                        
                                        <span>-</span>
                                    </td> : <></> }
                                <td>
                                    <button className="btnTrash" onClick={()=>toApp(item.ID)}>Открыть</button>
                                </td>
                            </tr>
    )

}

export default OneLineApps