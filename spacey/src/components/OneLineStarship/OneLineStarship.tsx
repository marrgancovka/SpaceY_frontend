import { FC, useEffect } from "react"
import "./OneLineStarship.css"


interface ship {
    ID: number;
    Title: string,
    Rocket: string,
    Type: string,
    Description: string,
    Image_url: string
};
export type Props = {
    item : ship,
    index: number,
    deleteShip: (id: number)=>(void)
    editShip: ()=>(void)
}

const OneLineStarship:FC<Props> = ({item, index, deleteShip, editShip}) => {
    // const token = useSelector((state: RootState) => state.auth.token);


    useEffect(()=>{

    }
    ,[])

    return(
        <tr key={item.ID} className='table-row'>
                                <td>{++index}</td>
                                <td>{item.Title}</td>
                                <td>{item.Rocket}</td>
                                <td>{item.Type}</td>
                                <td>{item.Description}</td>
                                <td>
                                    <img src={item.Image_url} alt="" className="image_list"/>
                                </td>
                                <td>
                                    <button className="btnTrash mb w90" onClick={()=>deleteShip(item.ID)}>Удалить</button>
                                    <button className="btnTrash w90 mb" onClick={editShip}>Изменить</button>
                                </td>
                                
                            </tr>
    )

}

export default OneLineStarship