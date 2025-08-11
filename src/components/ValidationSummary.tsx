// components/ValidationSummary.tsx
import React from "react";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";
// import { ValidationError } from "../utils/validationEngine";
import { ValidationError } from "./validationEngine";

interface Props {
  errors: ValidationError[];
}

export default function ValidationSummary({ errors }: Props) {
  const grouped = errors.reduce((acc, e) => {
    acc[e.entity] = acc[e.entity] || [];
    acc[e.entity].push(e);
    return acc;
  }, {} as Record<string, ValidationError[]>);

  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid",
        borderRadius: 2,
        bgcolor: "background.paper",
        maxHeight: 400,
        overflowY: "auto",
      }}
    >
      <Typography variant="h6">Validation Summary</Typography>
      {Object.entries(grouped).map(([entity, list]) => (
        <Box key={entity} sx={{ mt: 2 }}>
          <Typography variant="subtitle1">
            {entity.toUpperCase()} ({list.length})
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <List dense>
            {list.map((err, idx) => (
              <ListItem key={idx}>
                {err.message} (Row ID: {err.rowId})
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
