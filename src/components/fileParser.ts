import Papa from "papaparse";
import * as XLSX from "xlsx";

export const parseFile = (file: File, setData: (data: any[]) => void) => {
  const ext = file.name.split(".").pop()?.toLowerCase();

  if (ext === "csv") {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => setData(results.data as any[]),
    });
  } else if (ext === "xlsx") {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      setData(XLSX.utils.sheet_to_json(sheet) as any[]);
    };
    reader.readAsArrayBuffer(file);
  } else {
    alert("Unsupported file type. Please upload CSV or XLSX.");
  }
};
