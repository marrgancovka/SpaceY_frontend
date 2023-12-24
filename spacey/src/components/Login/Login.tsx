import { FC } from "react"
import { Form } from "react-bootstrap"
import './Login.css'
import { useNavigate } from "react-router-dom"

interface LoginProps{
    password : string
    username : string
    setPassword : (valuePassword : string) => void
    setUsername : (valueEmail : string) => void
    submitHandler:(event: any)=>void

}

const Login:FC <LoginProps> = ({password, username, setPassword, setUsername, submitHandler}) =>{
    const navigaye = useNavigate()
    return(
        <>  
            <Form className="my_form" onSubmit={submitHandler}>
                <h1 className="title_login">Авторизация</h1>
                <input type="text"  onChange={((event) => setUsername(event.target.value))} placeholder="Имя пользователя" value={username} className="my_items"/>
                <input type="password" onChange={((event) => setPassword(event.target.value))} placeholder="Пароль" value={password} className="my_items"/>
                <button className="btn_login" type="submit">Войти</button>
                <div className="navigate" onClick={()=>navigaye('/signup')}>Зарегистрироваться</div>
            </Form>
        </>
    )
}

export default Login