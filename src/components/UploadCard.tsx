import { Card, CardContent, Typography, Button } from "@mui/material";
import { parseFile } from "./fileParser";
import { validateTable } from "./validators";

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
            hidden
            onChange={(e) => {
              if (e.target.files) {
                parseFile(e.target.files[0], (parsed) => {
                  setData(parsed);
                  setErrors((prev: any) => ({
                    ...prev,
                    [tableKey]: validateTable(validateTitle, parsed),
                  }));
                });
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
