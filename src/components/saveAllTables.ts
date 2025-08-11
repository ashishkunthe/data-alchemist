import { saveAs } from "file-saver";
import Papa from "papaparse";
import JSZip from "jszip";

export function saveAllTables(
  clients: any[],
  workers: any[],
  tasks: any[],
  rules: any
) {
  const zip = new JSZip();

  // Convert each table to CSV
  const clientsCsv = Papa.unparse(clients);
  const workersCsv = Papa.unparse(workers);
  const tasksCsv = Papa.unparse(tasks);

  // Add CSVs to the ZIP
  zip.file("Clients.csv", clientsCsv);
  zip.file("Workers.csv", workersCsv);
  zip.file("Tasks.csv", tasksCsv);
  zip.file("rules.json", JSON.stringify(rules, null, 2));

  // Generate and download the ZIP
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "export.zip");
  });
}
