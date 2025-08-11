// utils/validationEngine.ts
export interface ValidationError {
  entity: "clients" | "workers" | "tasks";
  rowId: string | number;
  field?: string;
  message: string;
}

export function validateClients(
  clients: any[],
  tasks: any[]
): ValidationError[] {
  const errors: ValidationError[] = [];
  const ids = new Set();

  clients.forEach((client) => {
    if (!client.ClientID) {
      errors.push({
        entity: "clients",
        rowId: client.id,
        field: "ClientID",
        message: "Missing ClientID",
      });
    } else if (ids.has(client.ClientID)) {
      errors.push({
        entity: "clients",
        rowId: client.id,
        field: "ClientID",
        message: "Duplicate ClientID",
      });
    } else {
      ids.add(client.ClientID);
    }

    if (client.PriorityLevel < 1 || client.PriorityLevel > 5) {
      errors.push({
        entity: "clients",
        rowId: client.id,
        field: "PriorityLevel",
        message: "PriorityLevel must be 1–5",
      });
    }

    if (client.RequestedTaskIDs) {
      const requested = client.RequestedTaskIDs.split(",").map((t: string) =>
        t.trim()
      );
      requested.forEach((t: string) => {
        if (!tasks.some((task) => task.TaskID === t)) {
          errors.push({
            entity: "clients",
            rowId: client.id,
            field: "RequestedTaskIDs",
            message: `Unknown TaskID ${t}`,
          });
        }
      });
    }

    try {
      if (client.AttributesJSON) JSON.parse(client.AttributesJSON);
    } catch {
      errors.push({
        entity: "clients",
        rowId: client.id,
        field: "AttributesJSON",
        message: "Invalid JSON",
      });
    }
  });

  return errors;
}
