"use client";

import { useState, useEffect } from "react";
import {
  fetchFilteredApplications,
  Application,
} from "../utils/ApplicationServices";
import ApplicationList from "./ApplicationList";
import ApplicationForm from "./ApplicationForm";
import Statistics from "./Statistics";


const loadApplications = async (statusFilter: string, dateFilter: string, setApplications: React.Dispatch<React.SetStateAction<Application[]>>, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  setIsLoading(true);
  try {
    const data = await fetchFilteredApplications(statusFilter, dateFilter);
    setApplications(
      data.sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
    );
  } catch (error) {
    console.error("Error loading applications:", error);
  } finally {
    setIsLoading(false);
  }
};


export default function Dashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

 const loadApps = () => {
  loadApplications(statusFilter, dateFilter, setApplications, setIsLoading);

 }

  useEffect(() => {
    loadApplications(statusFilter, dateFilter, setApplications, setIsLoading);
  }, [statusFilter, dateFilter]);  // Only add filters to dependency array


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <ApplicationList
          applications={applications}
          onUpdate={loadApps}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          isLoading={isLoading}
        />
      </div>
      <div className="space-y-8">
        <ApplicationForm onSubmit={loadApps} />
        <Statistics applications={applications} dateFilter={dateFilter} />
      </div>
    </div>
  );
}
