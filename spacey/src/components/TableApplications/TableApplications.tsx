import { FC } from "react";
import { Table } from "react-bootstrap";
import './TableApplications.css'
import OneLineApps from "../OneLineApps/OneLineApps";

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
    apps : app[],
    role: string,
    getApps: ()=>(void)
}

const TableApplications:FC<Props> = ({apps, role, getApps}) => {



    return(
        <Table className='tableApp'>
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>№</th>
                            { role =="client" && <th>Дата создания</th>}
                            <th>Дата формирования</th>
                            <th>Дата завершения</th>
                            <th>Статус</th>
                            {role=="admin" && <th>Клиент</th>}
                            {role=="admin" && <th>Модератор</th>}
                            {role=="admin" && <th>Действие</th>}
                            <th>Открыть</th>

                        </tr>
                    </thead>
                    <tbody>
                        {apps.map((item, index) => (
                            <OneLineApps item={item} role={role} key={index} index={index} getApps={getApps}/>
                        ))}
                    </tbody>
                </Table>
    )
}

export default TableApplications