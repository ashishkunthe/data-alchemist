import { Card, CardContent, Typography, Button } from "@mui/material";
import { validateTable } from "./validators";
import { mapHeaders } from "@/components/columnMapper";
import Papa from "papaparse";

export default function UploadCard({
  label,
  tableKey,
  setData,
  setErrors,
  validateTitle,
}: {
  label: string;
  tableKey: string;
  setData: (data: any[]) => void;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  validateTitle: string;
}) {
  function handleFileUpload(file: File) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data.length) return;

        // Map headers
        const mappedHeaders = mapHeaders(Object.keys(results.data[0] || {}));

        // Map row values to new header names
        const mappedData = results.data.map((row: any) => {
          const newRow: any = {};
          mappedHeaders.forEach((mappedKey, index) => {
            newRow[mappedKey] = row[Object.keys(row)[index]];
          });
          return newRow;
        });

        // Save data
        setData(mappedData);

        // Run validation
        const validationErrors = validateTable(validateTitle, mappedData);
        setErrors((prev: any) => ({
          ...prev,
          [tableKey]: validationErrors,
        }));
      },
    });
  }

  return (
    <Card
      sx={{
        border: "2px dashed #ccc",
        borderRadius: 3,
        textAlign: "center",
        cursor: "pointer",
        "&:hover": { borderColor: "primary.main", backgroundColor: "#fafafa" },
        p: 2,
        width: 250,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {label}
        </Typography>
        <Button variant="contained" component="label">
          Select File
          <input
            type="file"
            accept=".csv,.xlsx"
            hidden
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          CSV or XLSX
        </Typography>
      </CardContent>
    </Card>
  );
}
