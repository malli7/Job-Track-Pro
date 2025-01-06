'use client'

import { useState } from 'react'
import { createApplication, ApplicationData } from '../utils/ApplicationServices'
import { FaPlus } from 'react-icons/fa'

interface ApplicationFormProps {
  onSubmit: () => void
}

export default function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [formData, setFormData] = useState<ApplicationData>({
    company: '',
    jobTitle: '',
    link: '',
    jobLocation: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createApplication(formData)
      setFormData({ company: '', jobTitle: '', link: '', jobLocation: '' })
      onSubmit()
    } catch (error) {
      console.error('Error creating application:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-800">Add New Application</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="url"
          name="link"
          placeholder="Job Listing URL"
          value={formData.link}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="jobLocation"
          placeholder="Job Location"
          value={formData.jobLocation}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
        >
          <FaPlus className="mr-2" /> Add Application
        </button>
      </div>
    </form>
  )
}

