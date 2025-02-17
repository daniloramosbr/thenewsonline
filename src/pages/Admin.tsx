/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import Api from '../controllers/Api';
import Graphic from '../components/Graphic';
import log from '../components/Logger'

interface rankCount {     //tipagem rank
  _count: {
    email: number;
  };
  email: string;
}

interface HistoryItem {     //tipagem history item
  _count: {
    email: number;
  };
  email: string;
}

interface Metrics {      //tipagem metrica
  totalAberturas: number;
  totalLeitores: number;
  history: HistoryItem[];
}


export function Admin () {
  const [metrics, setMetrica] = useState<Metrics>({
    totalAberturas: 0,
    totalLeitores: 0,
    history: [],
  });
  const [ranking, setRanking] = useState<rankCount[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
   
    const fetchMetrics = async () => {                     //obter metricas de todos 
      try {
        const response = await Api.GetAllMetricas()
        setMetrica(response.data);
      } catch (error) {
        log.error('Erro ao obter métricas:', error);
        setError('Erro ao obter métricas');
      }
    };

    const fetchRanking = async () => {                 //ranking de todos
      try {
        const response = await Api.GetRanking()
        setRanking(response.data);
      } catch (error) {
        log.error('Erro ao obter ranking:', error);
        setError('Erro ao obter ranking');
      }
    };

    fetchMetrics();
    fetchRanking();
  }, []);

  return (
    <div className="dashboard">
      <h1>ADMIN DASHBOARD</h1>
      {error && <p className="error">{error}</p>}

      <div className="metrics-container">
        <h2>Métricas de Engajamento Geral</h2>
        <div className="metrics">
          <div className="metric-box">
            <h3>Total de Aberturas</h3>
            <p>{metrics.totalAberturas}</p>
          </div>
          <div className="metric-box">
            <h3>Total de Leitores</h3>
            <p>{metrics.totalLeitores}</p>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <h2>Gráfico de Aberturas por Dia</h2>
       <Graphic/>
      </div>

      <div className="ranking-container">
        <h2>Ranking dos Leitores Mais Engajados</h2>
        <ul className="ranking-list">
          {ranking.map((reader, index) => (
            <li key={index}>
              <span className="reader-email">{reader.email}</span>
              <span className="reader-streaks">{reader._count.email} Streaks</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
