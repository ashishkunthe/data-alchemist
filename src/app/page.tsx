"use client";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import UploadCard from "../components/UploadCard";
import TableSection from "../components/TableSection";
import { validateTable, ValidationError } from "../components/validators";

export default function Home() {
  const [clients, setClients] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, ValidationError[]>>({
    clients: [],
    workers: [],
    tasks: [],
  });

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        📊 Data Alchemist
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Upload, edit, validate, and save your CSV/XLSX files.
      </Typography>

      <Box sx={{ display: "flex", gap: 3, mb: 5, flexWrap: "wrap" }}>
        <UploadCard
          label="Upload Clients"
          tableKey="clients"
          setData={setClients}
          setErrors={setErrors}
          validateTitle="Clients"
        />
        <UploadCard
          label="Upload Workers"
          tableKey="workers"
          setData={setWorkers}
          setErrors={setErrors}
          validateTitle="Workers"
        />
        <UploadCard
          label="Upload Tasks"
          tableKey="tasks"
          setData={setTasks}
          setErrors={setErrors}
          validateTitle="Tasks"
        />
      </Box>

      <TableSection
        title="Clients"
        tableKey="clients"
        data={clients}
        setData={setClients}
        errors={errors}
        setErrors={setErrors}
        validateTable={validateTable}
      />
      <TableSection
        title="Workers"
        tableKey="workers"
        data={workers}
        setData={setWorkers}
        errors={errors}
        setErrors={setErrors}
        validateTable={validateTable}
      />
      <TableSection
        title="Tasks"
        tableKey="tasks"
        data={tasks}
        setData={setTasks}
        errors={errors}
        setErrors={setErrors}
        validateTable={validateTable}
      />
    </Box>
  );
}
