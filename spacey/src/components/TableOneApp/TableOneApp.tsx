import axios from "axios";
import { FC, useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import './TableOneApp.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from "date-fns";

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


}
const TableOneApp:FC<Props> = ({ships, deleteApp, formHandler, getApps}) => {
    const idApp = useSelector((state: RootState) => state.draft.appId);
    const token = useSelector((state: RootState) => state.auth.token);
    const [ship, setShip] = useState(ships)
    const [cosmodroms, setCosmodroms] = useState([])


    const deleteShip = async (id: number) => {
        try {

            await axios.get(`api/application/${idApp}`, {headers: {Authorization: `Bearer ${token}`}})
            await axios.delete(`api/flights/application/${idApp}/${id}`,{headers: {Authorization: `Bearer ${token}`}})

            setShip((prevShip)=>prevShip.filter(sh => sh.ID !== id))
            console.log(ship.length)
            if (ship.length==1) {
                deleteApp()
            }
            getApps()
        } catch (error) {
            console.log("Ошибка при удалении", error)
        }
    }
    const getCosmodroms = async () => {
        try {
            const resp = await axios.get('api/flights/cosmodroms')
            setCosmodroms(resp.data.data)
        } catch (error) {
            console.log("Ошибка получения космодромов", error)
        }
    }

    const putBegin = async (id: string, id_ship: number, flight: flight) => {
        try {
            
            await axios.put('api/flights/cosmodrom/begin', {
                "id_Ship": id_ship,
                "id_Application": idApp,
                "id_Cosmodrom_Begin": Number(id),
                "id_cosmodrom_End": Number(flight.CosmodromEnd),
                "date_Flight": flight.Date
            }, {headers: {Authorization: `Bearer ${token}`}})
            getApps()
        } catch (error) {
            console.log("Ошибка при изменении", error)
        }
    }
    const putEnd = async (id: string, id_ship: number, flight: flight) => {
        try {
            console.log(flight)
            await axios.put('api/flights/cosmodrom/end', {
                "id_Ship": id_ship,
                "id_Application": idApp,
                "id_Cosmodrom_Begin": Number(flight.CosmodromBegin),
                "id_cosmodrom_End": Number(id),
                "date_Flight": flight.Date
            }, {headers: {Authorization: `Bearer ${token}`}})
            getApps()
        } catch (error) {
            console.log("Ошибка при изменении", error)
        }
    }
    const handleDateTimeChange = async (date: Date, id_ship: number, flight: flight) => {
        console.log(date)
        const dateStringNew = date.toISOString()
        console.log(dateStringNew)

        try {
            console.log(flight)
            await axios.put('api/flights/date', {
                "id_Ship": id_ship,
                "id_Application": idApp,
                "id_Cosmodrom_Begin": 1,
                "id_cosmodrom_End": 1,
                "date_Flight": dateStringNew
            }, {headers: {Authorization: `Bearer ${token}`}})
            getApps()
        } catch (error) {
            console.log("Ошибка при изменении", error)
        }
    }

    useEffect(()=>{
        setShip(ships)
        getCosmodroms()
        console.log(ships)    
    }
    ,[ship])

    return(
        <>
        <Table  className='tableDocs'>
                <thead>
                    <tr >
                        <th style={{ width: '5%' }}>№</th>
                        <th>Название</th>
                        <th>Вылет</th>
                        <th>Приземление</th>
                        <th>Дата</th>
                        <th style={{ width: '5%' }}>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {ships.map((item, index) => (
                        <tr key={item.ID}>
                            <td>{++index}</td>
                            <td>{item.Title}</td>
                            <td>
                            <select
                            value={item.CosmodromBegin}
                            onChange={(event)=>putBegin(event.target.value, item.ID, item)}
                            >
                            <option value="" hidden >
                            {item.CosmodromBegin}
                            </option>
                            {cosmodroms.map((cosmodrom) => (
                                    <option key={cosmodrom.ID} value={cosmodrom.ID}>
                                    {cosmodrom.Title}
                                    </option>
                            ))}
                             </select>
                            </td>
                            
                            <td>
                            <select
                            value={item.CosmodromEnd}
                            onChange={(event)=>putEnd(event.target.value, item.ID, item)}
                            >
                            <option value="" hidden >
                            {item.CosmodromEnd}
                            </option>
                            {cosmodroms.map((cosmodrom) => (
                                    <option key={cosmodrom.ID} value={cosmodrom.ID}>
                                    {cosmodrom.Title}
                                    </option>
                            ))}
                             </select>    
                            </td>
                            <td>
                            <DatePicker
                                selected={ parseISO(item.Date) }
                                onChange={(date)=>handleDateTimeChange(date, item.ID, item)}
                                showTimeInput
                                dateFormat="Pp" // Формат даты и времени, можно настроить по своему
                            />
                                </td>
                            <td>
                                <button
                                    onClick={() => deleteShip(item.ID)}
                                    className="btnTrash"
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                
                
            </Table>
            <div className="btns">
            <button onClick={deleteApp} className="btnTrash btnaction">Удалить все</button>
            <button onClick={formHandler} className="btnTrash btnaction">Отправить заявку</button>
        </div>
        </>
    )
}

export default TableOneApp