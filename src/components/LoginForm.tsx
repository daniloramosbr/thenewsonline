/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import Api from "../controllers/Api";
import Cookies from "js-cookie";
import log from '../components/Logger'
export default function LoginForm() {

  const [isLoading, setIsLoading] = useState(false)      //laoding 
  const navigate = useNavigate();
  const [dataForm, setDataForm] = useState({               //form para guardar o email
    email: "",
  });

  const HandleChange = (event: any) => {              //funçao que manda o email pro state
    setDataForm((dataForm) => ({
      ...dataForm,
      [event.target.name]: event.target.value,
    }));
  };
  
  async function SignIn() {           //funçao para logar

    const email = dataForm.email.trim(); 

    if (!email) {
      alert("Preencha o email");
      return;
    }

    try {
      setIsLoading(true);
  
        const res = await Api.ValidLogin(dataForm.email)               
        Cookies.set("user", res.data.token, { expires: 1 });          //salva cookie
        navigate("/thenews/dashboard/");     //encaminha pra outra pagina

      
    } catch (error) {
      log.error('erro:', error);
     
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={HandleChange} className="form">
      <div className="form-group">
        <label htmlFor="email" className="label">
             Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={HandleChange}
          required
          className="input"
          value={dataForm.email}
          placeholder="usuario@exemplo.com"
        />
      </div>
      <button onClick={SignIn} type="submit" disabled={isLoading} className="button">
        {isLoading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  )
}

