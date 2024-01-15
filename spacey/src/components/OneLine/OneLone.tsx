import { FC, useEffect, useState } from "react"
import DatePicker from 'react-datepicker'
import { parseISO } from "date-fns";


interface flight {
    ID: number;
    Title: string;
    CosmodromBegin: string;
    CosmodromEnd: string;
    Date: string;
};
interface cosmodrom {
    ID: number;
    Title: string;
};
export type Props = {
    ship : flight,
    cosmodroms: cosmodrom[],
    key: number,
    index: number,
    deleteShip: (id: number)=>(void),
    saveShip: (id_ship: number, id_cosm_begin: number, id_cosm_end: number, date: string) => (void),
    isNewApp: boolean
}

const OneLine:FC<Props> = ({ship, cosmodroms, index, deleteShip, saveShip, isNewApp}) => {
    const [cosmBegin, setCosmBegin] = useState(getIdCosm(ship.CosmodromBegin))
    const [cosmEnd, setCosmEnd] = useState(getIdCosm(ship.CosmodromEnd))
    const [date, setDate] = useState(ship.Date)
    const [dateView, setDateView] = useState(ship.Date)

    function getIdCosm(name: string): number | undefined{
        const cosmodrom = cosmodroms.find(cosm => cosm.Title === name);
        return cosmodrom?.ID;
    }

    useEffect(()=>{

    }
    ,[])
    if (!isNewApp){
        return(
            <tr key={ship.ID}>
                                <td>{++index}</td>
                                <td>{ship.Title}</td>
                                <td>{ship.CosmodromBegin}</td>
                                
                                <td>{ship.CosmodromEnd}</td>
                                <td>{ship.Date}</td>
                            </tr>
        )
    }

    return(
        <tr key={ship.ID}>
                            <td>{++index}</td>
                            <td>{ship.Title}</td>
                            <td>
                            <select
                            value={cosmBegin}
                            onChange={(event)=>setCosmBegin(event.target.value)}
                            >
                            <option value="" hidden >
                            {cosmBegin}
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
                            value={cosmEnd}
                            onChange={(event)=>{setCosmEnd(event.target.value)
                            console.log(event.target.value)
                            }}
                            >
                            <option value="" hidden >
                            {cosmEnd}
                            </option>
                            {cosmodroms.map((cosmodrom) => (
                                    <option key={cosmodrom.ID} value={cosmodrom.ID}>
                                    {cosmodrom.Title}
                                    </option>
                            ))}
                             </select>    
                            </td>
                            <td>
                            <input
                                type="datetime-local"
                                className="input_search_app"
                                value={dateView}
                                onChange={(e)=>{const dt = new Date(e.target.value)
                                    setDate(dt.toISOString())
                                    setDateView(e.target.value)
                                }}
                              />

                                </td>
                                <td>
                                <button
                                    onClick={() => saveShip(ship.ID, Number(cosmBegin), Number(cosmEnd), date)}
                                    className="btnTrash"
                                >
                                    Сохранить
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => deleteShip(ship.ID)}
                                    className="btnTrash"
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
    )

}

export default OneLine