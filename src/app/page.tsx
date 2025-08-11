"use client";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import UploadCard from "../components/UploadCard";
import TableSection from "../components/TableSection";
import { validateTable, ValidationError } from "../components/validators";
import { validateCrossTable } from "@/components/validateCrossTable";
import { saveAllTables } from "@/components/saveAllTables";
import { Button } from "@mui/material";
import RulesSection from "@/components/RulesSection";

export default function Home() {
  const [clients, setClients] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, ValidationError[]>>({
    clients: [],
    workers: [],
    tasks: [],
    cross: [],
  });
  const [rules, setRules] = useState<any[]>([]);

  // Run cross-table validation whenever any dataset changes
  useEffect(() => {
    const crossErrors = validateCrossTable(clients, workers, tasks);
    setErrors((prev) => ({ ...prev, cross: crossErrors }));
  }, [clients, workers, tasks]);

  // Gather all errors to use for save button logic
  const allErrors = [
    ...errors.clients,
    ...errors.workers,
    ...errors.tasks,
    ...errors.cross,
  ];

  const canSave = allErrors.length === 0;

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        📊 Data Alchemist
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Upload, edit, validate, and save your CSV/XLSX files.
      </Typography>

      {/* Upload Cards */}
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

      {/* Table Sections */}
      <TableSection
        title="Clients"
        tableKey="clients"
        data={clients}
        setData={setClients}
        errors={errors}
        setErrors={setErrors}
        validateTable={(title: any, updated: any) =>
          validateTable(updated, title)
        }
      />

      <TableSection
        title="Workers"
        tableKey="workers"
        data={workers}
        setData={setWorkers}
        errors={errors}
        setErrors={setErrors}
        validateTable={(title: any, updated: any) =>
          validateTable(updated, title)
        }
      />

      <TableSection
        title="Tasks"
        tableKey="tasks"
        data={tasks}
        setData={setTasks}
        errors={errors}
        setErrors={setErrors}
        validateTable={(title: any, updated: any) =>
          validateTable(updated, title)
        }
      />

      <RulesSection
        tasks={tasks}
        clients={clients}
        workers={workers}
        onRulesChange={setRules}
      />

      {/* Cross-table validation errors */}
      {errors.cross.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" color="error" gutterBottom>
            Cross-Table Validation Errors
          </Typography>
          {errors.cross.map((err, i) => (
            <Typography key={i} color="error">
              Row {err.row + 1} ({err.field}): {err.message}
            </Typography>
          ))}
        </Box>
      )}

      {/* Example save button */}
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => saveAllTables(clients, workers, tasks, rules)}
          disabled={
            !clients.length ||
            !workers.length ||
            !tasks.length ||
            Object.values(errors).some((arr) => arr.length > 0)
          }
        >
          Save As
        </Button>
      </Box>
    </Box>
  );
}
