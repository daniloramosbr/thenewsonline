/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import Api from '../controllers/Api';
import { format } from 'date-fns'
import { useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { logOutOutline  } from "ionicons/icons";
import log from '../components/Logger'

interface HistoryItem {  //tipagem do history
  id: string;
  email: string;
  data: string;
  newsletterId: string;
}

interface EmailMetrics {      //tipagem das metricas
  data :string
  email: string;
  totalAberturas: number;
  history: HistoryItem[];
}

interface TokenInt {   //tipagem do token
  email: string;
  exp: number;
  iat: number;
}

export default function Main () {

  const navigate = useNavigate()
  const [streak, setStreak] = useState<number>(0);
  const [history, setHistory] = useState<EmailMetrics[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [badge, setBadge] = useState<string>();
  const token: string = Cookies.get("user");    //pega cookie user
  const decoded: TokenInt = token ? jwtDecode(token) : undefined       //se token tiver algo valido entao decodifica, senao undefined
  const { email } = decoded != undefined && decoded     //só pega se decoded tiver o valor

  useEffect(() => {

    if (token == undefined) {   //só entra se tiver logado
     
      navigate("/thenewsonline/");
    }
   
    const fetchStreak = async () => {
      try {
        const res = await Api.GetUserStreak(email) //busca streaks do user
        setStreak(res.data.streak)
    
      } catch (error) {
        log.error('Erro ao obter streaks:', error);
        setError('Erro ao obter streaks');
      }
    };

    const fetchHistory = async () => {
      try {
        const res = await Api.GetUserMetricas(email)     //busca metricas do user
        const userHistory = res.data.history.filter((entry: any) => entry.email === email);
        setHistory(userHistory);
      } catch (error) {
        log.error('Erro ao obter histórico de aberturas:', error);
        setError('Erro ao obter histórico de aberturas');
      }
    }

    const getBadge = () => {       //condiçoes do emblema (nivel)

      if (streak < 5) {
        setBadge("Prata");
      } else if (streak >= 5 && streak < 10) {   //de 1 a 4 dias: Prata, de 5 a 9: Ouro, de +10: Diamante
        setBadge("Ouro")
      } else {
        setBadge("Diamante")
      }
    }

    fetchStreak();
     fetchHistory();
     getBadge();
    
  }, [email, token, navigate, streak]);

  return (
    <div className="dashboard-container">
     
    <div className="admin-button-container">
    <button onClick={()=> {
       Cookies.remove('user')
         navigate("/thenewsonline/");
      }} className="admin-button">SAIR <div>
        <IonIcon icon={logOutOutline} style={{ fontSize: "24px" }} /> </div>
     </button>
      <button onClick={()=> {
         navigate("/thenewsonline/admin");
      }} className="admin-button">ACESSAR ÁREA DE ADMIN
      </button>
    </div>
    <h1 className="dashboard-title">DASHBOARD</h1>
    {error && <p className="error-message">{error}</p>}
    <div className="streak-container">
      <p className="streak-text">
        Seu streak atual: <span className="streak-number">{streak} dias</span>
      </p>
    </div>

    <div className="badge-container">
      <div className="tooltip-container">
        <span className="tooltip">de 1 a 4 dias: Prata, de 5 a 9: Ouro, de +10: Diamante</span>
        <span className="tooltip-trigger">?</span>
      </div>
      <div className="badge">
        Seu nivel atual: <span className="badge-name">{badge}</span>
      </div>
    </div>

    <h2 className="history-title">Histórico de Aberturas</h2>
    <ul className="history-list">
      {history.map((item, index) => (
        <li key={index} className="history-item">
          {format(new Date(item.data), "dd/MM/yyyy HH:mm:ss")}
        </li>
      ))}
    </ul>
    <div className="motivation-container">
      <p>
        Você está fazendo um ótimo trabalho! Continue assim e mantenha o seu streak.
      </p>
      <p>Lembre-se: consistência é a chave para o sucesso. Mantenha o ritmo e continue crescendo!</p>
      <p>Estamos aqui para te apoiar em cada passo. Você consegue!</p>
    </div>
  </div>
  
  );
};
