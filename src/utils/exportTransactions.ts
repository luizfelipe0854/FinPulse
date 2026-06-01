import ExcelJS from "exceljs";
import type { ITransaction } from "@/services/firebase/firestore";

export async function exportTransactionsToExcel(transactions: ITransaction[]) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Transações");

  sheet.columns = [
    { header: "Data", key: "date", width: 15 },
    { header: "Centro de Custo", key: "category", width: 25 },
    { header: "Valor", key: "amount", width: 15 },
    { header: "Descrição", key: "description", width: 40 },
  ];

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true };

  transactions.forEach((t) => {
    sheet.addRow({
      date: t.date.toLocaleDateString("pt-BR"),
      category: t.category,
      amount: t.type === "saida" ? -t.amount : t.amount,
      description: t.description,
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transacoes.xlsx";
  a.click();
  URL.revokeObjectURL(url);
}
