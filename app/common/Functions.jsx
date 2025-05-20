import * as XLSX from "xlsx";

export const exportToCSV = (grid) => {
  const store = grid.getStore();
  const data = store.getData().items; // Fetch all records in the store
  const columns = grid.getColumns();

  // Extract column headers
  const headers = columns.map((column) => column.config.text);

  // Extract data rows
  const rows = data.map((record) => {
    const rowData = [];
    columns.forEach((column) => {
      const dataIndex = column.config.dataIndex;
      rowData.push(record.get(dataIndex) || ""); // Get data based on dataIndex
    });
    return rowData;
  });

  // Combine headers and rows into a single CSV content
  const csvContent = [headers, ...rows];

  // Convert the CSV content array into a string
  const csvString = csvContent.map((row) => row.join(",")).join("\n");

  // Trigger CSV file download
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "grid-data.csv";
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToExcel = (grid) => {
  const store = grid.getStore();
  const data = store.getData().items.map((record) => record.data);
  const headers = grid.getColumns().map((column) => column.config.text);

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, "grid-data.xlsx");
};
