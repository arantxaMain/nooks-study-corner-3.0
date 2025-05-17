import { useEffect, useState } from 'react';
import Heatmap from '../components/Heatmap';
import { api } from '../services/api'; 

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
      <Heatmap data={data} />
    </div>
  );
};

export default StatsTab;
