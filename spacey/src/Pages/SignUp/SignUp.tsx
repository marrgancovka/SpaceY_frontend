import { FC, useState } from "react"
import Signup from "../../components/Signup/Signup"
import axios from "axios"
import { useNavigate } from "react-router-dom"



const SignupPage:FC =() =>{

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const response = await axios.post('api/sign_up', {userName: username, pass: password})
            const userData = response.data;
            console.log(userData)
            navigate('/login')

            } catch (error) {
                console.error('Ошибка при регистрации:', error);
            }
      };

    return(
        <>
                <Signup password={password} 
                        username={username} 
                        setPassword={(password)=>setPassword(password)} 
                        setUsername={(username)=>setUsername(username)}
                        submitHandler={submitHandler}
                        />
        </>
        
    )
}

export default SignupPage