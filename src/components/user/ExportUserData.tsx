import { Dropdown, type MenuProps } from "antd"
import { Download } from "lucide-react";
import exportFromJSON from "export-from-json";
import { useGetExportUsersQuery } from "../../redux/features/user/userApi";
import type { IUser } from "../../types/user.type";

const ExportUserData = () => {
     const { data, isLoading } = useGetExportUsersQuery(undefined);
     const users = data?.data || [];

    const DownloadExport = () => {
        const fileName = 'users'
        if (users?.length > 0) {
            const csvData = users?.map((item: IUser) => ({
                name: item?.fullName,
                email: item?.email,
                phone: item?.phone || "N/A",
            }))
            exportFromJSON({ data: csvData, fileName: fileName, exportType: "csv" })
        }
    }


  const exportToPDF = async () => {

    try {
      // Dynamic import to avoid SSR issues
      const { jsPDF } = await import("jspdf")
      const { default: autoTable } = await import("jspdf-autotable")

      const doc = new jsPDF()

      // Add title
      doc.setFontSize(20)
      doc.text("User Data Export", 14, 22)

      // Add export info
      doc.setFontSize(12)
      doc.text(`Export Date: ${new Date().toLocaleDateString()}`, 14, 32)
      doc.text(`Total Records: ${users?.length}`, 14, 40)

      // Prepare table data
      const tableData = users?.map((user:IUser, index:number) => [
        Number(index+1),
        user.fullName,
        user.email,
        user.phone || "N/A",
        // user.status,
      ])

      // Add table
      autoTable(doc, {
        head: [["S.N.", "Full Name", "Email", "Phone"]],
        body: tableData,
        startY: 50,
        styles: {
          fontSize: 8,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { top: 50 },
      })

      // Save the PDF
      doc.save(`${"users"}-${new Date().toISOString().split("T")[0]}.pdf`)
    } catch (error) {
      console.error("Error exporting PDF:", error)
    }
  }


    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <button onClick={DownloadExport}>
                    Export as CSV
                </button>
            ),
        },
        {
            key: '2',
            label: (
                <button onClick={exportToPDF}>
                    Export as PDF
                </button>
            ),
        },
    ];





    return (
        <>
            <Dropdown menu={{ items }} placement="bottomRight">
                <button disabled={isLoading} className="px-3 flex gap-2 py-1 lg:py-2 text-white bg-blue-500 hover:bg-blue-600 duration-200 rounded-md">
                    <Download />Export Data</button>
            </Dropdown>
        </>
    )
}

export default ExportUserData