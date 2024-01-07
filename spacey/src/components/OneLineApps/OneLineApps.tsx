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
}

const OneLineApps:FC<Props> = ({item,role, index}) => {
    const [status, setStatus] = useState(item.Status)
    const token = useSelector((state: RootState) => state.auth.token);


    const navigate = useNavigate()
    const toApp = (id: number) =>{
        navigate(`/application/${id}`)
    }

    const cancel = async (id: number) =>{
        setStatus("cancel")
        try {
            await axios.put('/api/application/admin', {"id": id, "status": "cancel"},{headers: {"Authorization": `Bearer ${token}`}})
        } catch (error) {
            console.log("Ошибка при принятии заявки", error)
        }

    }
    const ok = async (id: number) =>{
        setStatus("accepted")
        try {
            await axios.put('/api/application/admin', {"id": id, "status": "accepted"},{headers: {"Authorization": `Bearer ${token}`}})
        } catch (error) {
            console.log("Ошибка при принятии заявки", error)
        }

    }

    useEffect(()=>{

    }
    ,[])

    return(
        <tr key={item.ID} className='table-row'>
                                <td>{item.ID}</td>
                                { role=="client" && <td>{item.Date_creation === "0001-01-01T00:00:00Z" ? '-' : item.Date_creation.split('T')[0]}</td>}
                                <td>{item.Date_formation=== "0001-01-01T00:00:00Z" ? '-' : item.Date_formation.split('T')[0]}</td>
                                <td>{item.Date_end=== "0001-01-01T00:00:00Z" ? '-' : item.Date_end.split('T')[0]}</td>
                                
                                <td>
                                    {status === 'created' ? 'Создана' :
                                        status === 'formated' ? 'Сформирована' :
                                        status === 'accepted' ? 'Завершена' :
                                        status === 'cancel' ? 'Отменена' : '-'}
                                </td>
                                {role=="admin" && <td>{item.User}</td>}
                                { (role=="admin" && status=="formated") ? <td>
                                    <button className="btnTrash mr" onClick={()=> ok(item.ID)}>Принять</button>
                                    <button className="btnTrash" onClick={()=> cancel(item.ID)}>Отменить</button>
                                </td> : role=="admin" ? <td>Недоступно</td> : <></> }
                                <td>
                                    <button className="btnTrash" onClick={()=>toApp(item.ID)}>Открыть</button>
                                </td>
                            </tr>
    )

}

export default OneLineApps