import axios from "axios";
import { FC, useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import './TableOneApp.css'
import 'react-datepicker/dist/react-datepicker.css';
import OneLine from "../OneLine/OneLone";

interface flight {
    ID: number;
    Title: string;
    CosmodromBegin: string;
    CosmodromEnd: string;
    Date: string;
};
export type Props = {
    ships : flight[],
    formHandler: ()=>(void),
    deleteApp: ()=>(void)
    getApps: ()=>(void)
    isNewApp: boolean
}
const TableOneApp:FC<Props> = ({ships, deleteApp, formHandler, getApps, isNewApp}) => {
    const idApp = useSelector((state: RootState) => state.draft.appId);
    const token = useSelector((state: RootState) => state.auth.token);
    const [ship, setShip] = useState(ships)
    const [cosmodroms, setCosmodroms] = useState([])


    const deleteShip = async (id: number) => {
        try {
            await axios.delete(`/api/flights/application/${idApp}/${id}`,{headers: {Authorization: `Bearer ${token}`}})

            setShip((prevShip)=>prevShip.filter(sh => sh.ID !== id))
            console.log(ships.length)
            if (ships.length==1) {
                deleteApp()
            }
            getApps()
        } catch (error) {
            console.log("Ошибка при удалении", error)
        }
    }
    const saveShip = async (id_ship: number, id_cosm_begin: number, id_cosm_end: number, date: string) => {
        try {
            await axios.put(`/api/flights`,{
                "id_Ship": id_ship,
                "id_Application": idApp,
                "id_Cosmodrom_Begin": id_cosm_begin,
                "id_cosmodrom_End": id_cosm_end,
                "date_Flight": date
            }, {headers: {Authorization: `Bearer ${token}`}})

            
        } catch (error) {
            console.log("Ошибка при save", error)
        }
    }

    const getCosmodroms = async () => {
        try {
            const resp = await axios.get('/api/flights/cosmodroms')
            setCosmodroms(resp.data.data)
        } catch (error) {
            console.log("Ошибка получения космодромов", error)
        }
    }

    

    useEffect(()=>{
        // setShip(ships)
        console.log(ships)
        console.log(ships.length)
        getCosmodroms()
        console.log(ships)
    }
    ,[ship])

    return(
        <>
        <Table  className='tableDocs'>
                <thead>
                    <tr >
                        <th >№</th>
                        <th>Космолет</th>
                        <th>Вылет</th>
                        <th>Приземление</th>
                        <th>Дата полета</th>
                       {isNewApp && <th >Сохранить</th>}
                        { isNewApp && <th >Удалить</th>}
                    </tr>
                </thead>
                <tbody>
                    {ships.map((item, index) => (
                        <OneLine ship = {item} cosmodroms={cosmodroms} deleteShip={deleteShip} saveShip={saveShip} key={index} index={index} isNewApp={isNewApp}/>
                    ))}
                </tbody>
                
                
            </Table>
            <div className="btns">
            {isNewApp && <button onClick={deleteApp} className="btnTrash btnaction">Удалить все</button>}
            {isNewApp && <button onClick={formHandler} className="btnTrash btnaction">Отправить заявку</button>}
        </div>
        </>
    )
}

export default TableOneApp