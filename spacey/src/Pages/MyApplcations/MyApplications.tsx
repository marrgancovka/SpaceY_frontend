import axios from "axios"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import TableApplications from "../../components/TableApplications/TableApplications"
import { setDate, setDateEnd, setName, setStatus } from "../../store/slices/search_app";
import { Form } from "react-bootstrap"
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb"

interface app {
    ID: number;
    Status: string;
    Date_creation: string;
    Date_formation: string;
    Date_end: string;
    User: string,
    Admin: string,
};

const MyApplicationsPage:FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const role = useSelector((state: RootState) => state.auth.role);
    const idApp = useSelector((state: RootState) => state.draft.appId);
    const [apps, setApps] = useState<app[]>([])
    const [appsView, setAppsView] = useState<app[]>([])
    const dispatch = useDispatch()
    const search_name = useSelector((state: RootState) => state.sears_app.searchName)
    const search_date_start = useSelector((state: RootState) => state.sears_app.startDateTime)
    const search_date_end = useSelector((state: RootState) => state.sears_app.endDateTime)
    const search_status = useSelector((state: RootState) => state.sears_app.selectedStatus)
    const breadcrumbsItems = [
    { label: 'Корабли', link:'/starships' }, 
    { label: 'Заявки', link:`/applications` }
  ];



    const getApps = async () => {
        try {
            if (search_date_end=="" && search_date_start=="" && search_status==""){
                const resp = await axios.get(`/api/applications`, {headers: {"Authorization": `Bearer ${token}`}})
                setApps(resp.data.data)
                setAppsView(resp.data.data)
            } else{
                const resp = await axios.get(`/api/applications?status=${search_status}&date=${search_date_start}&date_end=${search_date_end}`, {headers: {"Authorization": `Bearer ${token}`}})
                setApps(resp.data.data)
                setAppsView(resp.data.data)
            }
        } catch (error) {
            console.log("Ошибка в получении заявок", error)
        }
    }
    const filterApps = async () => {
        try {
            const resp = await axios.get(`/api/applications?status=${search_status}&date=${search_date_start}&date_end=${search_date_end}`, {headers: {"Authorization": `Bearer ${token}`}})
            setApps(resp.data.data)
            setAppsView(resp.data.data)
            console.log(resp.data.data)
            filterClient(search_name)
            
        } catch (error) {
            console.log("Ошибка в получении заявок", error)
        }
    }
    const filterClient = (name: string) => {
        if (name!=''){
            const filteredApps = apps.filter(app => app.User.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
            setAppsView(filteredApps)
            console.log(filteredApps)
        } else {
            setAppsView(apps)
        }
    }
    const clean = () =>  {
        dispatch(setDate(''))
        dispatch(setDateEnd(''))
        dispatch(setName(''))
        dispatch(setStatus(''))
    }

    useEffect(() => {
        if (role=="client"){
            clean()
            getApps()
        } else{
            getApps()
        const intervalId = setInterval(() => {
            getApps();
        }, 3000); // 5000 миллисекунд (5 секунд) - можете установить свое значение
    
        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
        console.log('useEffect')
        }
    },[])
    useEffect(()=>{
        filterClient(search_name)
    },[apps])
    return(
        <div className="body">
        <div className="block mrg-2">
            <Breadcrumb items={breadcrumbsItems} className="lastitem"/>
            <h1 className="app_title">Заявки</h1>
            { role == "admin" && <div className="container_filter">
                <Form onSubmit={(e)=>e.preventDefault()} className="name_client">
                <input
                className="input_search_app input_name"
                    type="text"
                    placeholder="Поиск по имени клиента"
                    value={search_name}
                    onChange={(e) => {dispatch(setName(e.target.value))
                        console.log(search_name, e.target.value)
                        filterClient(e.target.value)
                    }}
                    
                />
                </Form>
                
                {/* Инпут как выпадающий список для фильтрации по статусам */}
                <select value={search_status} 
                onChange={(e) => {dispatch(setStatus(e.target.value))}}
                className="input_search_app grid_status"
                >
                  <option value="">Все статусы</option>
                  <option value="formated">Сформирована</option>
                  <option value="cancel">Отменена</option>
                  <option value="accepted">Завершена</option>
                </select>
                <label className="mr-8 grid-label-start" >Начальная дата:</label>
                <input
                  type="date"
                className="input_search_app grid-date-start"
                  value={search_date_start}
                  onChange={(e) => {dispatch(setDate(e.target.value))}}
                  />

                <label className="mr-8 grid-label-end">Конечная дата:</label>
                    <input
                      type="date"
                className="input_search_app grid-date-end"
                     value={search_date_end}
                     onChange={(e) => {dispatch(setDateEnd(e.target.value))}}
                     />
                <div className="grid-buttons">
                <button className="btnTrash" style={{marginBottom: "10px"}} onClick={filterApps}>Применить</button>
                <button className="btnTrash" style={{marginBottom: "10px"}} onClick={clean}>Очистить</button>
                </div>
            </div>}
            <TableApplications apps={appsView} role={role} getApps={getApps}/>
        </div>
        </div>
    )
}

export default MyApplicationsPage