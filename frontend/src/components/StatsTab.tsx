import { useEffect, useState } from 'react';
import BarChart from './BarChart';
import { api } from '../services/api'; 
import '../styles/BarChart.css';

const StatsTab = () => {
  const [data, setData] = useState<Record<string, number>>({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user?.id) return;

    api.getStudyMinutesLast100Days(user.id)
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h3>Últimos 100 días</h3>
      <BarChart data={data} />
    </div>
  );
};

export default StatsTab;
