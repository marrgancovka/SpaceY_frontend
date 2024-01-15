import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import TableApplications from "../../components/TableApplications/TableApplications"
import { setDate, setDateEnd, setName, setStatus } from "../../store/slices/search_app";
import { Form } from "react-bootstrap"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"


const MyApplicationsPage:FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const role = useSelector((state: RootState) => state.auth.role);
    const idApp = useSelector((state: RootState) => state.draft.appId);
    const [apps, setApps] = useState([])
    const dispatch = useDispatch()
  const search_name = useSelector((state: RootState) => state.sears_app.searchName)
  const search_date_start = useSelector((state: RootState) => state.sears_app.startDateTime)
  const search_date_end = useSelector((state: RootState) => state.sears_app.endDateTime)
  const search_status = useSelector((state: RootState) => state.sears_app.selectedStatus)
  const breadcrumbsItems = [
    { label: 'Корабли', link:'/starships' }, // Link to the current page
    { label: 'Заявки', link:`/applications` }
  ];



    const getApps = async () => {
        try {
            console.log(token, idApp)
            const resp = await axios.get(`/api/applications?status=${search_status}&date=${search_date_start}&date_end=${search_date_end}`, {headers: {"Authorization": `Bearer ${token}`}})
            setApps(resp.data.data)
            console.log(resp.data.data)
            
        } catch (error) {
            console.log("Ошибка в получении заявок", error)
        }
    }
    const filterApps = async () => {
        try {
            console.log(token, idApp)
            const resp = await axios.get(`/api/applications?status=${search_status}&date=${search_date_start}&date_end=${search_date_end}`, {headers: {"Authorization": `Bearer ${token}`}})
            if (search_name!=''){
                filterClient(event)
            } else {
                setApps(resp.data.data)
            }
            
        } catch (error) {
            console.log("Ошибка в получении заявок", error)
        }
    }
    const filterClient = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (search_name!=''){
            const filteredApps = apps.filter(app => app.User.includes(search_name));
            setApps(filteredApps)
        } else {
            getApps()
        }
    }
    const clean = () =>  {
        dispatch(setDate(''))
        dispatch(setDateEnd(''))
        dispatch(setName(''))
        dispatch(setStatus(''))
        getApps()
    }

    useEffect(() => {
        if (role=="client"){
            clean()
        }
        getApps()
    },[])
    return(
        <div className="block ">
            <Breadcrumb items={breadcrumbsItems} className="lastitem"/>
            <h1 className="app_title">Заявки</h1>
            { role == "admin" && <div className="container_filter">
                <Form onSubmit={(event)=>filterClient(event)}>
                <input
                className="input_search_app"
                    type="text"
                    placeholder="Поиск по имени клиента"
                    value={search_name}
                    onChange={(e) => {dispatch(setName(e.target.value))}}
                    
                />
                </Form>
                
                {/* Инпут как выпадающий список для фильтрации по статусам */}
                <select value={search_status} 
                onChange={(e) => {dispatch(setStatus(e.target.value))}}
                className="input_search_app"
                >
                  <option value="">Все статусы</option>
                  <option value="formated">Сформирована</option>
                  <option value="cancel">Отменена</option>
                  <option value="accepted">Завершена</option>
                </select>
                {/* Инпуты для выбора даты в формате гггг-мм-дд */}
                <label className="mr-8">Начальная дата:</label>
                <input
                  type="date"
                className="input_search_app"
                  value={search_date_start}
                  onChange={(e) => {dispatch(setDate(e.target.value))}}
                  />

                {/* Инпуты для выбора даты в формате гггг-мм-дд */}
                <label className="mr-8">Конечная дата:</label>
                    <input
                      type="date"
                className="input_search_app"
                     value={search_date_end}
                     onChange={(e) => {dispatch(setDateEnd(e.target.value))}}
                     />
                <button className="btnTrash" onClick={filterApps}>Применить</button>
                <button className="btnTrash" onClick={clean}>Очистить</button>
            </div>}
            <TableApplications apps={apps} role={role} getApps={getApps}/>
        </div>
    )
}

export default MyApplicationsPage