import { FC, useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import 'react-datepicker/dist/react-datepicker.css';

interface flight {
    ID: number;
    Title: string;
    CosmodromBegin: string;
    CosmodromEnd: string;
    Date: string;
};
export type Props = {
    ships : flight[]
}
const TableOneApplication:FC<Props> = ({ships}) => {
    const [ship, setShip] = useState(ships)


    useEffect(()=>{
        setShip(ships)
        console.log(ships)    
    }
    ,[ships])

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
                    </tr>
                </thead>
                <tbody>
                    {ships.map((item, index) => (
                        <tr key={item.ID}>
                            <td>{++index}</td>
                            <td>{item.Title}</td>
                            <td>{item.CosmodromBegin}</td>
                            
                            <td>{item.CosmodromEnd}</td>
                            <td>{item.Date.split('T')[0]}</td>
                        </tr>
                    ))}
                </tbody>
                
                
            </Table>
            
        </>
    )
}

export default TableOneApplication