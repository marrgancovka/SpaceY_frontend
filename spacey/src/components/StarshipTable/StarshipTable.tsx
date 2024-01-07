import { FC } from "react";
import { Table } from "react-bootstrap";
import OneLineStarship from "../OneLineStarship/OneLineStarship";
import { useNavigate } from "react-router-dom";

interface ship {
    ID: number;
    Title: string,
    Rocket: string,
    Type: string,
    Description: string,
    Image_url: string
};
export type Props = {
    ships : ship[],
    deleteShip: (id: number)=>(void)
    editShip: (id: number)=>(void)
}

const StarshipTable:FC<Props> = ({ships, deleteShip, editShip}) => {


    return(
        <Table className='tableApps'>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Название</th>
                            <th>Ракета-носитель</th>
                            <th>Тип</th>
                            <th>Описание</th>
                            <th>Изображение</th>
                            <th>Действие</th>

                        </tr>
                    </thead>
                    <tbody>
                        {ships.map((item, index) => (
                            <OneLineStarship item={item} index={index} key={index} deleteShip={deleteShip} editShip={editShip}/>
                        ))}
                    </tbody>
                </Table>
    )
}

export default StarshipTable