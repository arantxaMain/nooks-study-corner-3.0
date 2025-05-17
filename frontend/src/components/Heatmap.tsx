import { useEffect, useRef } from 'react'
import CalHeatmap from 'cal-heatmap'
import 'cal-heatmap/cal-heatmap.css'
import '../styles/StatsTab.css';
import { api } from '../services/api'

export default function HeatmapLast100Days() {
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

        const parsedData: Record<number, number> = {}
        Object.entries(rawData).forEach(([dateStr, value]) => {
          const timestamp = Math.floor(new Date(dateStr + 'T00:00:00').getTime() / 1000)
          parsedData[timestamp] = value as number
        })

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
                  start: startDate,
                  highlight: new Date(),
                },
                range: 4,
                domain: { type: 'month' },
                subDomain: { type: 'day', radius: 2, width: 15, height: 15 },
                scale: {
                  color: {
                    type: 'linear',
                    domain: [0, 30, 60, 120],
                    range: ['#eee', '#ffeda0', '#feb24c', '#f03b20']
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

  return <div><div ref={containerRef} /></div>
}
