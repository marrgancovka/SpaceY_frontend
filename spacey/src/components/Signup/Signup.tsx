import { FC } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

interface LoginProps{
    password : string
    username : string
    firstname: string
    secondname: string
    phone: string
    setPassword : (password : string) => void
    setUsername : (username : string) => void
    setFirstname: (firstname : string) => void
    setSecondName: (secondname : string) => void
    setPhone: (phone : string) => void
    submitHandler:(event: any)=>void

}

const Signup:FC<LoginProps> = ({password, username, setPassword, setUsername, submitHandler, phone, firstname, secondname, setFirstname,setSecondName, setPhone}) =>{
    const navigate = useNavigate()
    return(
        <>  
            <Form className="my_form" onSubmit={submitHandler}>
                <h1 className="title_login">Регистрация</h1>
                <input type="text" onChange={((event) => setFirstname(event.target.value))} placeholder="Имя" value={firstname} className="my_items"/>
                <input type="text" onChange={((event) => setSecondName(event.target.value))} placeholder="Фамилия" value={secondname} className="my_items"/>
                <input type="text" onChange={((event) => setPhone(event.target.value))} placeholder="Номер телефона" value={phone} className="my_items"/>
                <input type="text"  onChange={((event) => setUsername(event.target.value))} placeholder="Имя пользователя" value={username} className="my_items"/>
                <input type="password" onChange={((event) => setPassword(event.target.value))} placeholder="Пароль" value={password} className="my_items"/>
                <button className="btn_login" type="submit">Зарегистрироваться</button>
                <div onClick={()=>navigate('/login')} className="navigate">Войти</div>
            </Form>
        </>
    )
}

export default Signup