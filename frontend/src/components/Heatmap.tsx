import { useEffect, useRef } from 'react'
import CalHeatmap from 'cal-heatmap'
import 'cal-heatmap/cal-heatmap.css'
import '../styles/StatsTab.css';
import { api } from '../services/api'

export default function HeatmapLast100Days({data}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const calInstance = useRef<CalHeatmap | null>(null)

  useEffect(() => {
    async function fetchDataAndRender() {
      const userId = JSON.parse(localStorage.getItem('user') || '{}').id
      if (!userId) {
        console.error('No hay usuario logueado')
        return
      }

      try {
        const rawData = await api.getStudyMinutesLast100Days(userId)
        console.log('Datos recibidos del API:', rawData)

        const parsedData: Record<number, number> = {}
        Object.entries(rawData).forEach(([dateStr, value]) => {
          const timestamp = Math.floor(new Date(dateStr + 'T00:00:00').getTime() / 1000)
          parsedData[timestamp] = value as number
          console.log(`Fecha: ${dateStr}, Timestamp: ${timestamp}, Valor: ${value}`)
        })

        console.log('Datos procesados para el heatmap:', parsedData)

        if (!calInstance.current) {
          calInstance.current = new CalHeatmap()
        } else {
          calInstance.current.destroy()
          calInstance.current = new CalHeatmap()
        }

        const startDate = new Date()
        startDate.setDate(startDate.getDate() - 99)
        startDate.setHours(0,0,0,0)

        if (containerRef.current) {
            calInstance.current.paint({
                itemSelector: containerRef.current,
                data: parsedData,
                date: {
                  start: new Date(Date.now() - (99 * 24 * 60 * 60 * 1000)),
                  highlight: new Date(),
                },
                range: 4,
                domain: { type: 'month' },
                subDomain: { type: 'day', radius: 2, width: 15, height: 15 },
                scale: {
                  color: {
                    type: 'threshold',
                    domain: [1, 30, 60, 120],
                    range: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
                  }
                }
            })
        }
      } catch (error) {
        console.error('Error cargando datos para heatmap:', error)
      }
    }

    fetchDataAndRender()

    return () => {
      if (calInstance.current) {
        calInstance.current.destroy()
        calInstance.current = null
      }
    }
  }, [])

  return (
    <div className="calendar-heatmap">
      <div ref={containerRef} />
    </div>
  );
}
