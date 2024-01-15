import  { FC } from "react";
import './Card.css'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../store/store";
import { appSet } from "../../store/slices/draft_slice";
import {  useNavigate } from "react-router-dom";

interface ship {
    ID: number;
    Title: string,
    Rocket: string,
    Type: string,
    Description: string,
    Image_url: string
};

interface Props {
  data: ship
}

const Card: FC<Props> = ({data}) => {
    const dispatch = useDispatch()
    const token = useSelector((state: RootState) => state.auth.token);
    const role = useSelector((state: RootState) => state.auth.role);
    const id = useSelector((state: RootState) => state.draft.appId);
    const navigate = useNavigate()




    const addShipHandler = async () =>{
        try {
            await axios.post('api/ships/application', {"id_ship": data.ID},{
                headers: {"Authorization": `Bearer ${token}`}
            
            })
            dispatch(appSet({app:true, appId: id}))
        } catch (error) {
            console.log("Ошибка добавления: ", error)
        }
        
    }

    return(
        <div className="card">
                <div onClick={()=>{navigate(`/starships/${data.ID}`)}} className="image_item">
                    <img src={data.Image_url} alt="" className="image"/>
                </div>
                <div onClick={()=>{navigate(`/starships/${data.ID}`)}} className="text_item">
                    {data.Title}
                </div>
                <div className="discription">
                    <div className="type">{data.Type}</div>
                </div>
                {role!=""  && <button onClick={addShipHandler} className="btn_add">Добавить</button>}
            </div>
    )
}

export default Card;