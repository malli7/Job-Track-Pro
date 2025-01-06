// /app/services/applicationService.ts
import axios from 'axios';

export interface ApplicationData {
  company: string;
  jobTitle: string;
  link: string;
  jobLocation: string;
  status?: string;
}

export interface Application {
  id: number;
  company: string;
  jobTitle: string;
  link: string;
  jobLocation: string;
  status: string;
  appliedAt: string; 
}

// Create a new application
export async function createApplication(applicationData: ApplicationData): Promise<Application> {
  try {
    const response = await axios.post<Application>('/api/applications', applicationData);
    return response.data;
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
}

// Fetch all applications
export async function fetchApplications(): Promise<Application[]> {
  try {
    const response = await axios.get<Application[]>('/api/applications');
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
}

// Fetch filtered applications by status and date
export async function fetchFilteredApplications(status?: string, date?: string): Promise<Application[]> {
  try {
    const response = await axios.get<Application[]>('/api/filters', {
      params: { status, date },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered applications:', error);
    throw error;
  }
}

// Update the status of an application
export async function updateApplicationStatus(id: number, status: string): Promise<Application> {
  try {
    const response = await axios.put<Application>('/api/applications', { id, status });
    return response.data;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
}

// Delete an application by ID
export async function deleteApplication(id: number): Promise<Application> {
  try {
    const response = await axios.delete<Application>('/api/applications', { data: { id } });
    return response.data;
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
}
