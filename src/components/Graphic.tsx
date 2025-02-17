/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import  { useEffect, useState } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory';
import Api from '../controllers/Api';
import log from '../components/Logger'

interface ChartData {
  date: string;  // data no formato de string
  opens: number; //  número de aberturas
}

export function Graphic () {

  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.GetDadosChart();
        setData(response.data);
      } catch (error) {
        log.error("Erro ao obter dados do gráfico:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    
    <VictoryChart theme={VictoryTheme.material} domainPadding={20} width={600} height={300}>
    <VictoryAxis
      tickFormat={(x) => new Date(x).toLocaleDateString()}
      style={{
        tickLabels: { fontSize: 10, fill: "#615A5A" },
      }}
    />
    <VictoryAxis
      dependentAxis
      tickFormat={(x) => `${x}`}
      style={{
        tickLabels: { fontSize: 10, fill: "#615A5A" },
      }}
    />
    <VictoryBar
      data={data}
      x="date"
      y="opens"
      style={{
        data: { fill: "#FFCE04" },
      }}
    />
  </VictoryChart>
    
  );
};

export default Graphic;

