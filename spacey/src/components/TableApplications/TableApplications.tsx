import { FC } from "react";
import { Table } from "react-bootstrap";
import './TableApplications.css'
import { useNavigate } from "react-router-dom";

interface app {
    ID: number;
    Status: string;
    Date_creation: string;
    Date_formation: string;
    Date_end: string;
    Id_user: number,
    Id_admin: number,
};
export type Props = {
    apps : app[],
}

const TableApplications:FC<Props> = ({apps}) => {
    const navigate = useNavigate()
    const toApp = (id: number) =>{
        navigate(`/application/${id}`)
    }
    return(
        <Table className='tableApps'>
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>№</th>
                            <th>Дата создания</th>
                            <th>Дата формирования</th>
                            <th>Дата завершения</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apps.map((item, index) => (
                            <tr key={item.ID} className='table-row' onClick={()=>toApp(item.ID)}>
                                <td>{++index}</td>
                                <td>{item.Date_creation === "0001-01-01T00:00:00Z" ? '-' : item.Date_creation.split('T')[0]}</td>
                                <td>{item.Date_formation=== "0001-01-01T00:00:00Z" ? '-' : item.Date_formation.split('T')[0]}</td>
                                <td>{item.Date_end=== "0001-01-01T00:00:00Z" ? '-' : item.Date_end.split('T')[0]}</td>
                                
                                <td>
                                    {item.Status === 'created' ? 'Создана' :
                                        item.Status === 'formated' ? 'Сформирована' :
                                        item.Status === 'accepted' ? 'Завершена' :
                                        item.Status === 'canceled' ? 'Отменена' : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
    )
}

export default TableApplications