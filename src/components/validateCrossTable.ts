// components/validateCrossTable.ts
import { ValidationError } from "./validators";

export const validateCrossTable = (
  clients: any[],
  workers: any[],
  tasks: any[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const clientIDs = new Set(clients.map((c) => c.ClientID));
  const workerIDs = new Set(workers.map((w) => w.WorkerID));
  const taskIDs = new Set(tasks.map((t) => t.TaskID));

  // Example 1: Check if tasks reference valid clients
  tasks.forEach((task, i) => {
    if (task.ClientID && !clientIDs.has(task.ClientID)) {
      errors.push({
        row: i,
        field: "ClientID",
        message: `ClientID '${task.ClientID}' in Tasks not found in Clients table`,
      });
    }
  });

  // Example 2: Check if tasks reference valid workers
  tasks.forEach((task, i) => {
    if (task.WorkerID && !workerIDs.has(task.WorkerID)) {
      errors.push({
        row: i,
        field: "WorkerID",
        message: `WorkerID '${task.WorkerID}' in Tasks not found in Workers table`,
      });
    }
  });

  // Example 3: Check for duplicate IDs across tables (shouldn't happen)
  clients.forEach((client, i) => {
    if (workerIDs.has(client.ClientID)) {
      errors.push({
        row: i,
        field: "ClientID",
        message: `ClientID '${client.ClientID}' is also used as a WorkerID`,
      });
    }
  });

  // Example 4: Check numeric ranges in cross-data context (if relevant)
  workers.forEach((worker, i) => {
    if (worker.AvailableSlots) {
      try {
        const parsed = JSON.parse(worker.AvailableSlots);
        if (
          !Array.isArray(parsed) ||
          !parsed.every((n) => Number.isInteger(n))
        ) {
          throw new Error();
        }
      } catch {
        errors.push({
          row: i,
          field: "AvailableSlots",
          message: "AvailableSlots must be a JSON array of integers",
        });
      }
    }
  });

  return errors;
};
