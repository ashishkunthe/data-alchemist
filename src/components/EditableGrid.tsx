import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridEventListener,
} from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";

interface EditableGridProps {
  rows: any[];
  columns: GridColDef[];
  onRowsChange: (updatedRows: any[]) => void;
  title?: string;
}

export default function EditableGrid({
  rows,
  columns,
  onRowsChange,
  title,
}: EditableGridProps) {
  const theme = useTheme();

  const handleRowEdit = React.useCallback<GridEventListener<"cellEditStop">>(
    (params) => {
      // No need to handle here; DataGrid onProcessRowUpdate will handle updates
    },
    []
  );

  const processRowUpdate = (newRow: any, oldRow: any) => {
    const updatedRows = rows.map((row) =>
      row.id === oldRow.id ? { ...oldRow, ...newRow } : row
    );
    onRowsChange(updatedRows);
    return newRow;
  };

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        bgcolor: theme.palette.background.paper,
        p: 2,
        borderRadius: 2,
      }}
    >
      {title && <h3 style={{ color: theme.palette.text.primary }}>{title}</h3>}
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="cell"
        processRowUpdate={processRowUpdate}
        onCellEditStop={handleRowEdit}
        // @ts-ignore
        disableSelectionOnClick
        sx={{
          bgcolor: theme.palette.mode === "dark" ? "#121212" : "#fff",
          color: theme.palette.text.primary,
        }}
      />
    </Box>
  );
}
