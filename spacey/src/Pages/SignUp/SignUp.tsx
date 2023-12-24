import { FC, useState } from "react"
import Signup from "../../components/Signup/Signup"
import axios from "axios"
import { useNavigate } from "react-router-dom"



const SignupPage:FC =() =>{

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [secondname, setSecondName] = useState('')
    const [phone, setPhone] = useState('')

    const navigate = useNavigate()

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const response = await axios.post('api/sign_up', {userName: username, pass: password, name: firstname, phone: phone, secondName: secondname})
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
                        firstname={firstname}
                        secondname={secondname}
                        phone={phone}
                        setPassword={(password)=>setPassword(password)} 
                        setUsername={(username)=>setUsername(username)}
                        setFirstname={setFirstname}
                        setSecondName={setSecondName}
                        setPhone = {setPhone}
                        submitHandler={submitHandler}
                        />
        </>
        
    )
}

export default SignupPage