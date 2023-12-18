import React, { FC, useState } from "react";
import { useEffect } from "react";
import image  from './1.png'

interface Props {
  data: any[]
}

const Card: FC<Props> = (props) => {

    // const [item, setItem] = useState(props.data)
    useEffect(() => {
        console.log(props)
        console.log(props.data)
      }, []);

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
            </div>
    )
}

export default Card;