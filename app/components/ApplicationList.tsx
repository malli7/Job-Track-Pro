'use client'

import { useState } from 'react'
import { Application, updateApplicationStatus, deleteApplication } from '../utils/ApplicationServices'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTrash, FaMapMarkerAlt, FaCalendarAlt, FaSpinner, FaExternalLinkAlt } from 'react-icons/fa'

interface ApplicationListProps {
  applications: Application[]
  onUpdate: () => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  dateFilter: string
  setDateFilter: (date: string) => void
  isLoading: boolean
}

export default function ApplicationList({ 
  applications, 
  onUpdate, 
  statusFilter, 
  setStatusFilter,
  dateFilter,
  setDateFilter,
  isLoading
}: ApplicationListProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      await updateApplicationStatus(id, status)
      onUpdate()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteApplication(id)
      onUpdate()
    } catch (error) {
      console.error('Error deleting application:', error)
    }
  }

  const filteredApplications = applications.filter(app =>
    (app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobLocation.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === '' || app.status === statusFilter) &&
    (dateFilter === '' || new Date(app.appliedAt).toISOString().split('T')[0] === dateFilter)
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-500'
      case 'Interview': return 'bg-yellow-500'
      case 'Offer': return 'bg-green-500'
      case 'Rejected': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-800">Your Applications</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search applications..."
          className="flex-grow p-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-3 border-2 border-indigo-200 rounded-lg bg-white focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300"
        >
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="p-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300"
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-5xl text-indigo-600" />
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredApplications.map((app) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">{app.jobTitle}</h3>
                      <p className="text-lg text-indigo-600 font-semibold mb-2">{app.company}</p>
                      <p className="text-gray-600 flex items-center mb-1">
                        <FaMapMarkerAlt className="mr-2 text-indigo-500" /> {app.jobLocation}
                      </p>
                      <p className="text-gray-500 text-sm flex items-center">
                        <FaCalendarAlt className="mr-2 text-indigo-400" /> Applied: {new Date(app.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(app.status)}`}>
                      {app.status}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusUpdate(app.id, e.target.value)}
                      className="p-2 border rounded-md bg-white text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <div className="flex items-center space-x-2">
                      <a
                        href={app.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center"
                      >
                        <FaExternalLinkAlt className="mr-2" /> View Job
                      </a>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition duration-300"
                        aria-label="Delete application"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              
                
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  )
}

