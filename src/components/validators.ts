export type ValidationError = { row: number; field: string; message: string };

export const validateTable = (
  title: string,
  data: any[]
): ValidationError[] => {
  let validationErrors: ValidationError[] = [];

  data.forEach((row, index) => {
    // Clients
    if (title === "Clients") {
      if (!/^C\d+$/.test(row.ClientID || "")) {
        validationErrors.push({
          row: index,
          field: "ClientID",
          message: "ClientID must be in format C<number>",
        });
      }
      if (!row.ClientName?.trim()) {
        validationErrors.push({
          row: index,
          field: "ClientName",
          message: "ClientName is required",
        });
      }
      if (!(+row.PriorityLevel >= 1 && +row.PriorityLevel <= 5)) {
        validationErrors.push({
          row: index,
          field: "PriorityLevel",
          message: "PriorityLevel must be between 1 and 5",
        });
      }
      if (
        row.GroupTag &&
        !["GroupA", "GroupB", "GroupC"].includes(row.GroupTag)
      ) {
        validationErrors.push({
          row: index,
          field: "GroupTag",
          message: "GroupTag must be GroupA, GroupB, or GroupC",
        });
      }
      if (row.AttributesJSON) {
        try {
          JSON.parse(row.AttributesJSON);
        } catch {
          validationErrors.push({
            row: index,
            field: "AttributesJSON",
            message: "AttributesJSON must be valid JSON",
          });
        }
      }
    }

    // Workers
    if (title === "Workers") {
      if (!/^W\d+$/.test(row.WorkerID || "")) {
        validationErrors.push({
          row: index,
          field: "WorkerID",
          message: "WorkerID must be in format W<number>",
        });
      }
      if (!row.WorkerName?.trim()) {
        validationErrors.push({
          row: index,
          field: "WorkerName",
          message: "WorkerName is required",
        });
      }
      if (row.AvailableSlots && !/^\[\d+(,\d+)*\]$/.test(row.AvailableSlots)) {
        validationErrors.push({
          row: index,
          field: "AvailableSlots",
          message: "AvailableSlots must be in [n,n,...] format",
        });
      }
      if (!(+row.QualificationLevel >= 1 && +row.QualificationLevel <= 5)) {
        validationErrors.push({
          row: index,
          field: "QualificationLevel",
          message: "QualificationLevel must be between 1 and 5",
        });
      }
      if (
        row.WorkerGroup &&
        !["GroupA", "GroupB", "GroupC"].includes(row.WorkerGroup)
      ) {
        validationErrors.push({
          row: index,
          field: "WorkerGroup",
          message: "WorkerGroup must be GroupA, GroupB, or GroupC",
        });
      }
    }

    // Tasks
    if (title === "Tasks") {
      if (!/^T\d+$/.test(row.TaskID || "")) {
        validationErrors.push({
          row: index,
          field: "TaskID",
          message: "TaskID must be in format T<number>",
        });
      }
      if (!row.TaskName?.trim()) {
        validationErrors.push({
          row: index,
          field: "TaskName",
          message: "TaskName is required",
        });
      }
      if (
        row.Category &&
        ![
          "ETL",
          "Analytics",
          "ML",
          "Design",
          "QA",
          "Security",
          "DevOps",
          "Infrastructure",
          "Research",
          "Writing",
          "Marketing",
          "Sales",
          "Compliance",
        ].includes(row.Category)
      ) {
        validationErrors.push({
          row: index,
          field: "Category",
          message: "Category must be valid",
        });
      }
      if (!(+row.Duration > 0)) {
        validationErrors.push({
          row: index,
          field: "Duration",
          message: "Duration must be a positive number",
        });
      }
      if (
        row.PreferredPhases &&
        !/^\[\d+(,\d+)*\]$|^\d+\s*-\s*\d+$/.test(row.PreferredPhases)
      ) {
        validationErrors.push({
          row: index,
          field: "PreferredPhases",
          message: "PreferredPhases must be [n,n,...] or n - m format",
        });
      }
      if (!(+row.MaxConcurrent >= 1)) {
        validationErrors.push({
          row: index,
          field: "MaxConcurrent",
          message: "MaxConcurrent must be ≥ 1",
        });
      }
    }
  });

  return validationErrors;
};
