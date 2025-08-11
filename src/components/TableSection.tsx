import { Paper, Box, Typography, Alert } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowModel,
} from "@mui/x-data-grid";
import ExportMenu from "./ExportMenu";

export default function TableSection({
  title,
  tableKey,
  data,
  setData,
  errors,
  setErrors,
  validateTable,
}: any) {
  const createColumns = (data: any[]): GridColDef[] =>
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key,
          width: 150,
          editable: true,
          renderCell: (params: GridRenderCellParams) => {
            const cellError = errors[tableKey]?.find(
              (err: any) => err.row === params.row.id && err.field === key
            );
            return (
              <Box
                sx={{
                  bgcolor: cellError ? "#ffebee" : "transparent",
                  color: cellError ? "red" : "inherit",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  px: 1,
                }}
              >
                {params.value}
              </Box>
            );
          },
        }))
      : [];

  return (
    data.length > 0 && (
      <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">{title}</Typography>
          <ExportMenu data={data} disabled={errors[tableKey]?.length > 0} />
        </Box>

        {errors[tableKey]?.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            ⚠ {errors[tableKey].length} validation error(s) found. Please fix
            them before exporting.
          </Alert>
        )}

        <Box sx={{ height: 300 }}>
          <DataGrid
            rows={data.map((row: any, i: any) => ({ id: i, ...row }))}
            columns={createColumns(data)}
            disableRowSelectionOnClick
            processRowUpdate={(newRow: GridRowModel) => {
              const updated = [...data];
              updated[newRow.id as number] = { ...newRow };
              delete updated[newRow.id as number].id;
              setData(updated);

              setErrors((prev: any) => ({
                ...prev,
                [tableKey]: validateTable(title, updated),
              }));

              return newRow;
            }}
          />
        </Box>
      </Paper>
    )
  );
}
