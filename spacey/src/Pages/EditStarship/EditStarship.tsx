import axios from "axios"
import { FC, useEffect, useState } from "react"
import {  useSelector } from "react-redux"
import { RootState } from "../../store/store"
import {  useLocation } from "react-router-dom"
import './EditStarship.css'
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"

interface ship {
    ID: number;
    Title: string,
    Rocket: string,
    Type: string,
    Description: string,
    Image_url: string
};

const EditStarshipPage:FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [ship, setShip] = useState<ship>({
        ID: 0,
        Title: '',
        Rocket: '',
        Type: '',
        Description: '',
        Image_url: '',
      })
    const [img, setImg] = useState('')
    const location = useLocation()
    const parts = location.pathname.split('/')
    const curId = parts[3]
    const [isSave, setIsSave] = useState(true)
    let breadcrumbsItems = [
        { label: 'Корабли', link:'/starships' }, // Link to the current page
        { label: 'Корабли таблицей', link:`/starships/list` },
        { label: `Редактировать корабль №${curId}`, link:`/starships/edit/${curId}` },
      ];


    const getShip = async () => {
        try {
            const res = await axios.get(`/api/ships/${curId}`, {headers: {"Authorization": `Bearer ${token}`}})
            console.log(res.data)
            setShip(res.data.data)
            setImg(res.data.data.Image_url)
        } catch (error) {
            console.log("Ошибка в получении космолетов", error)
        }
    }

    const saveEdit = async () => {
        try {
            if (ship.Image_url != img){
                const formData = new FormData();
                formData.append('file', ship.Image_url);
                formData.append('id', curId);
                await axios.put('/api/ships/image', formData,{headers: {"Authorization": `Bearer ${token}`, 'Content-Type': 'form-data',} })
                
            }
            await axios.put('/api/ships', {"id": Number(curId), "title": ship.Title, "rocket": ship.Rocket, "type": ship.Type, "description": ship.Description, "image_url": "", "is_delete": false},{headers: {"Authorization": `Bearer ${token}`}})
            setIsSave(true)
            
        } catch (error) {
            console.log("Ошибка в изменении данных о космолете", error)
        }
    }
    const saveImage =  (event:  React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setShip({
            ...ship,
            Image_url: String(file),
        })
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
              setImg(String(e?.target?.result))
            };
            reader.readAsDataURL(file);
          }
        setShip({
            ...ship,
            Image_url: String(event.target.files?.[0])
        })
        setIsSave(false)
    }

    useEffect(() => {
        getShip()
    },[])
    return(
        <div className="body">
        <div className="block mrg-2">
            <Breadcrumb items={breadcrumbsItems} className="lastitem"/>
            <h1 className="app_title">Редактировать космолет</h1>
            <div className="edit_area">
                
                <div className="edit_image">
                    <img className="image_edit" src={img} alt="" />
                </div>
                <div className="edit_text">
                    <input type="text" value={ship?.Title} placeholder="Введите название космолета" className="edit_input mb-15" onChange={(event)=>{
                        setShip({
                            ...ship,
                            Title: event.target.value,
                        })
                        setIsSave(false)
                    }}/>         
                    <input type="text" value={ship?.Rocket} placeholder="Введите название ракеты-носителя" className="edit_input mb-15" onChange={(event)=>{
                        setShip({
                            ...ship,
                            Rocket: event.target.value,
                        })
                        setIsSave(false)
                    }}/>         
                    <input type="text" value={ship?.Type} placeholder="Введите тип космолета" className="edit_input mb-15" onChange={(event)=>{
                        setShip({
                            ...ship,
                            Type: event.target.value,
                        })
                        setIsSave(false)
                    }}/>       
                    <textarea name="" id="" cols={30} rows={10} className="edit_input mb-15" value={ship?.Description} placeholder="Введите описание " onChange={(event)=>{
                        setShip({
                            ...ship,
                            Description: event.target.value,
                        })
                        setIsSave(false)
                    }}>{ship?.Description}</textarea>
                    <label>Выбрать новое изображение</label>
                    <input type="file" className="mb-15" onChange={(event)=>saveImage(event)} accept=".jpg, .jpeg, .png"/>
                    { !isSave && <button className="edit_save" onClick={saveEdit}>Сохранить</button> }
                    { isSave && <div className="isSave">Сохранить</div> }
                </div>
            </div>
            </div>
            </div>
    )
}

export default EditStarshipPage