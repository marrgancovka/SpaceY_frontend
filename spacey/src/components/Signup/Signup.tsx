import { FC } from "react"
import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

interface LoginProps{
    password : string
    username : string
    setPassword : (password : string) => void
    setUsername : (username : string) => void
    submitHandler:(event: any)=>void

}

const Signup:FC<LoginProps> = ({password, username, setPassword, setUsername, submitHandler}) =>{
    const navigate = useNavigate()
    return(
        <>  
            <Form className="my_form" onSubmit={submitHandler}>
                <h1 className="title_login">Регистрация</h1>
                <input type="text"  onChange={((event) => setUsername(event.target.value))} placeholder="Имя пользователя" value={username} className="my_items"/>
                <input type="password" onChange={((event) => setPassword(event.target.value))} placeholder="Пароль" value={password} className="my_items"/>
                <button className="btn_login" type="submit">Зарегистрироваться</button>
                <div>
                    <span className="navigate" style={{color: 'grey'}}>Уже есть аккаунт? </span>
                    <span className="navigate" onClick={()=>navigate('/login')}> Войти</span>
                </div>
            </Form>
        </>
    )
}

export default Signup