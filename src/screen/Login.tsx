import React,{useState}from 'react'
import "./Login.css"

interface Credentials {
    name:string,
    password:string
}

interface Props{
    setLogin:React.Dispatch<React.SetStateAction<boolean>>
}

const Login:React.FC<Props>=({setLogin})=> {
  const [credentials,setCredentials]=useState<Credentials>({name:"",password:""})

  const credentialsHandler=(e: React.ChangeEvent<HTMLInputElement>)=>{
          setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  const formHandler=(e:React.FormEvent)=>{
       e.preventDefault()
       if (credentials?.name && credentials?.password){
            localStorage.setItem("login","true")
            setLogin(true)
        }
  }

  return (
    <div className='center'>
      <h1>Login</h1>
     <form onSubmit={formHandler}>
        <div className='txt-field'>
            <input id='name' placeholder='Enter Your Name' value={credentials?.name} name="name" onChange={credentialsHandler} className="input-box"/>
        </div>
        <div className='txt-field'>
           <input id='password' placeholder='Enter Your Password' value={credentials?.password} name="password" onChange={credentialsHandler} className="input-box"/>
        </div>
        <button type='submit' >Login</button>
     </form>
     </div>
  )
}
export default Login