import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import './Details.css'
import { Link } from "react-router-dom";

interface Ship {
    ID: string,
    Title: string,
    Image_url: string,
    Rocket: string,
    Type: string,
    Description: string
}

const DetailsPage: FC = () => {

    const {id} = useParams()
    const [ship, setShip] = useState<Ship>({ID: '', Title: '', Image_url: '', Rocket: '', Type: '', Description: ''})

    const breadcrumbsItems = [
        { label: 'Корабли', link:'/starships' }, // Link to the current page
        { label: ship.Title, link:`/starships/${ship.ID}` }
      ];

    useEffect(() => {
    
        fetch(`/api/ships/${id}`)
          .then((response) => response.json())
          .then((jsonData) => {setShip(jsonData.data)
            console.log(jsonData.data)
            console.log(ship)})
          .catch((error) => console.error('Error fetching data:', error));
      }, []);

    return(
        <div className="body ">
        <div className="block">
            <div className="mrg-2">
            <Breadcrumb items={breadcrumbsItems} className="lastitem"/>
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
                        <Link to="/starships" className="btn_back">Вернуться к списку</Link>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}
export default DetailsPage