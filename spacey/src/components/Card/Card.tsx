import React, { FC, useState } from "react";
import { useEffect } from "react";
import './Card.css'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../store/store";
import { appSet } from "../../store/slices/draft_slice";


interface Props {
  data: any[]
}

const Card: FC<Props> = (props) => {
    const dispatch = useDispatch()
    const token = useSelector((state: RootState) => state.auth.token);
    const id = useSelector((state: RootState) => state.draft.appId);




    const addShipHandler = async () =>{
        try {
            await axios.post('api/ships/application', {"id_ship": props.data.ID},{
                headers: {"Authorization": `Bearer ${token}`}
            
            })
            dispatch(appSet({app:true, appId: id}))
        } catch (error) {
            console.log("Ошибка добавления: ", error)
        }
        
    }

    return(
        <div className="card">
                <a href={"starships/"+props.data.ID} className="image_item">
                    <img src={props.data.Image_url} alt="" className="image"/>
                </a>
                <a href="" className="text_item">
                    {props.data.Title}
                </a>
                <div className="discription">
                    <div className="type">{props.data.Type}</div>
                </div>
                <button onClick={addShipHandler} className="btn_add">Добавить</button>
            </div>
    )
}

export default Card;