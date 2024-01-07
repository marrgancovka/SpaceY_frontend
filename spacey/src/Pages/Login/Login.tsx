import { FC, useState } from "react"
import Login from "../../components/Login/Login"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import {loginUser} from '../../store/slices/auth_slices'


const LoginPage:FC =() =>{

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            console.log("1235")
            const response = await axios.post('api/login', {login: username, password: password})
            const userData = response.data;
            console.log(userData)
            dispatch(
                loginUser({
                token: userData.AccessToken,
                role: userData.Role,
                username: userData.Username,
                })
                
            );

        navigate('/starships')
                

            } catch (error) {
                console.error('Ошибка при авторизации:', error);
            }
      };

    return(
        <>
                <Login password={password} 
                        username={username} 
                        setPassword={(password)=>setPassword(password)} 
                        setUsername={(username)=>setUsername(username)}
                        submitHandler={submitHandler}
                        />
        </>
        
    )
}

export default LoginPage