import axios from "axios";
import log from '../components/Logger'
const BASE_URL = import.meta.env.VITE_API_URL

class Api {
  async ValidLogin(email :string) {  //valida ou cria login com email

   try {

    return await axios.post(`${BASE_URL}/login`, {
      email: email,
    });
    
   } catch (error) {
    log.error('Erro ao obter streaks:', error);
    throw error;
   }
  }

  async GetUserStreak (email :string) {  //busca streak do user

    try {
      return await axios.get(`${BASE_URL}/relatorios/streaks-user`, { params: { email } });
      
    } catch (error) {
      log.error('Erro ao obter streaks:', error);
    throw error;
    }
  }

  async GetUserMetricas (email :string) {   //busca metricas do user

    try {
      return await axios.get(`${BASE_URL}/relatorios/metricas-user`, { params: {email}})
      
    } catch (error) {
      log.error('Erro:', error);
    throw error;
    }
  }

  async GetAllMetricas () {         //busca metrica geral
    try {
      return await axios.get(`${BASE_URL}/relatorios/metricas`)
      
    } catch (error) {
      log.error('Erro:', error);
    throw error;
    }
  }

  async GetRanking() {         //ranking dos maiores streaks
    try {
      return await axios.get(`${BASE_URL}/relatorios/ranking`)
      
    } catch (error) {
      log.error('Erro:', error);
    throw error;
    }
  }

  async GetDadosChart () {        //dados de dias para o grafico
    try {
      return await axios.get(`${BASE_URL}/relatorios/total-days-streak`)
      
    } catch (error) {
      log.error('Erro:', error);
    throw error;
    }
  }

}

export default new Api()