import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import image from '../../components/Card/1.png'
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import './Details.css'

// interface Ship {
//     ID: Int16Array
//     Title: string
//     Rocket: string
//     Type: string
//     Description: string
//     Image_url: string
// }


const DetailsPage: FC = () => {

    const {id} = useParams()
    const [ship, setShip] = useState({})


    useEffect(() => {
        fetch(`/api/ships/${id}`)
          .then((response) => response.json())
          .then((jsonData) => {setShip(jsonData.data)
            console.log(jsonData.data)
            console.log(ship)})
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

    return(
        <div className="body mydetails">
        <div className="block">
            <Breadcrumb title={ship.Title} id={ship.ID}/>
            <div className="mycontainer">
                <div className="photo"> <img className="image" src={ship.Image_url} alt=""/></div>
                <div className="text">
                    <div className="title">ОПИСАНИЕ ЗВЁЗДНОГО КОРАБЛЯ</div>
                    <div className="overview">
                        <div className="item_owerview"> 
                            <span>ИМЯ</span>
                            <span>{ship.Title}</span>
                        </div>
                        <div className="item_owerview"> 
                            <span>РАКЕТА-НОСИТЕЛЬ</span>
                            <span>{ship.Rocket}</span>
                        </div>
                        <div className="item_owerview"> 
                            <span>ТИП</span>
                            <span>{ship.Type}</span>
                        </div>
                        <div className="item_owerview description"> 
                            <span>{ship.Description}</span>
                        </div>
                    </div>
                    <div className="mybtn">
                        <a href="/starships" className="btn_back">Вернуться к списку</a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default DetailsPage