import { Paper, Box, Typography, Alert, useTheme } from "@mui/material";
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
  const theme = useTheme();

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
                  bgcolor: cellError
                    ? theme.palette.error.light
                    : "transparent",
                  color: cellError
                    ? theme.palette.error.main
                    : theme.palette.text.primary,
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
      <Paper
        elevation={3}
        sx={{
          p: 2,
          mb: 4,
          borderRadius: 3,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            {title}
          </Typography>
          <ExportMenu data={data} disabled={errors[tableKey]?.length > 0} />
        </Box>

        {errors[tableKey]?.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            ⚠ {errors[tableKey].length} validation error(s) found. Please fix
            them before exporting.
          </Alert>
        )}

        <Box
          sx={{
            height: 300,
            "& .MuiDataGrid-root": {
              bgcolor:
                theme.palette.mode === "dark"
                  ? "#121212"
                  : theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          }}
        >
          <DataGrid
            rows={data.map((row: any, i: number) => ({ id: i, ...row }))}
            columns={createColumns(data)}
            disableRowSelectionOnClick
            editMode="cell"
            processRowUpdate={(newRow: GridRowModel) => {
              const updated = [...data];
              updated[newRow.id as number] = { ...newRow };
              delete updated[newRow.id as number].id;

              setData(updated);
              setErrors((prev: any) => ({
                ...prev,
                [tableKey]: validateTable(updated, title),
              }));

              return newRow;
            }}
          />
        </Box>
      </Paper>
    )
  );
}
