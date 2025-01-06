'use client'

import { Application } from '../utils/ApplicationServices'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { FaChartPie } from 'react-icons/fa'

ChartJS.register(ArcElement, Tooltip, Legend)

interface StatisticsProps {
  applications: Application[]
  dateFilter: string
}

export default function Statistics({ applications, dateFilter }: StatisticsProps) {
  const filteredApplications = dateFilter
    ? applications.filter(app => new Date(app.appliedAt).toISOString().split('T')[0] === dateFilter)
    : applications

  const statusCounts = filteredApplications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          '#4C51BF',
          '#ED64A6',
          '#48BB78',
          '#ECC94B',
        ],
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-800 flex items-center">
        <FaChartPie className="mr-2" /> Application Statistics
      </h2>
      <Pie data={data} options={options} />
      <div className="mt-6 grid grid-cols-2 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="text-center bg-indigo-50 rounded-lg p-3">
            <p className="font-semibold text-indigo-800">{status}</p>
            <p className="text-2xl text-indigo-600">{count}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-500 text-center">
        Total: {filteredApplications.length} application(s)
      </p>
    </div>
  )
}

