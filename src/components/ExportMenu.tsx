import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export default function ExportMenu({
  data,
  disabled,
}: {
  data: any[];
  disabled?: boolean;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleExport = (format: "csv" | "xlsx") => {
    if (format === "csv") {
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "export.xlsx");
    }
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        disabled={disabled}
      >
        Save As
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => handleExport("csv")}>CSV</MenuItem>
        <MenuItem onClick={() => handleExport("xlsx")}>XLSX</MenuItem>
      </Menu>
    </>
  );
}
