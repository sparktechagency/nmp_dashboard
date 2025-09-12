import { Dropdown, type MenuProps } from "antd"
import { Download } from "lucide-react";
import exportFromJSON from "export-from-json";

const ExportOrderData = () => {

    const data = [
        {
            "_id": "68c00e5f552ecff46a0fd9b0",
            "fullName": "Afrin",
            "email": "afrin4aiz@gmail.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68c005edddcd7edf508f3b65",
            "fullName": "Osman Goni",
            "email": "gonidev715@gmail.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68bff87c0b7871c3d9edc6e3",
            "fullName": "Afrin",
            "email": "wowoa4508@ncien.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68bff7b0cf4519d95f283756",
            "fullName": "Shelly Mclean",
            "email": "ciciq@mailinator.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68bff6eccf4519d95f283753",
            "fullName": "Jocelyn Edwards",
            "email": "reyopa8893@dextrago.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68bff568cf4519d95f28374c",
            "fullName": "Afrin",
            "email": "wowoa4558@ncien.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68bff34f7240e9e1bd161953",
            "fullName": "Final Test",
            "email": "wowora4558@ncien.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68bbd3241003892da396c37e",
            "fullName": "Vance Meyer",
            "email": "wagoja7071@dextrago.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": "https://res.cloudinary.com/dwok2hmb7/image/upload/v1757400007/NMP-Ecommerce/kut2krzvevssbdqu2mjs.jpg"
        },
        {
            "_id": "68b2ebc8644a61f603ebff24",
            "fullName": "Toru",
            "email": "pexes56899@skateru.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68b29e6e262cd3d0122493dd",
            "fullName": "Test user FE",
            "email": "fayiyer536@futurejs.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68b287f71625609490f3382d",
            "fullName": "Oprah Weaver",
            "email": "bofod50453@lanipe.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68b27b93adbe64d1e6da9114",
            "fullName": "Jana Fulton",
            "email": "pesabis468@futurejs.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68b2790a64a9ee6d41ee6ed9",
            "fullName": "Peter Dean",
            "email": "cipit52597@lanipe.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68b04daa00877c04311074ab",
            "fullName": "AfrinTest",
            "email": "afrin4axz@gmail.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68b0452bb3044b5eaad28fe6",
            "fullName": "Kanej Fatema",
            "email": "kanej32428@aperiol.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68b0440e16a2e0df556c9b1d",
            "fullName": "QC Tester",
            "email": "lenox54960@namestal.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68b042f638e81007dec35fe8",
            "fullName": "QC",
            "email": "yemekix130@litepax.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68aefb3b6c068e49287678f5",
            "fullName": "Afrin",
            "email": "letov41160@namestal.com",
            "phone": "01711010288",
            "status": "unblocked",
            "profile_img": "https://res.cloudinary.com/dwok2hmb7/image/upload/v1756362886/NMP-Ecommerce/peoobtnjfm8ofl9udg7v.jpg"
        },
        {
            "_id": "68aef459ab11733a94c254f3",
            "fullName": "QA Test",
            "email": "afrin4axiz@gmail.com",
            "phone": "0171101055",
            "status": "unblocked",
            "profile_img": "https://res.cloudinary.com/dwok2hmb7/image/upload/v1756297323/NMP-Ecommerce/ep0hot2pd8ycx22ghlkw.jpg"
        },
        {
            "_id": "68a9a37ee179b51c641b7f87",
            "fullName": "Fefa Fen",
            "email": "fefenok455@aperiol.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68a1608d0517222161467e15",
            "fullName": "Briar Pugh",
            "email": "pajohed505@fursee.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68a1548db197109329d471af",
            "fullName": "Kylynn Flynn",
            "email": "tudycawy@mailinator.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68a0643d942f4096fbe97e09",
            "fullName": "Sigourney Larson",
            "email": "wicoram393@mardiek.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68a0634a942f4096fbe97e04",
            "fullName": "Mechelle Lewis",
            "email": "yokarat477@fursee.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68a05c7a942f4096fbe97e01",
            "fullName": "Rabeya Akter",
            "email": "rabeyaak45terbdcit@gmail.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68a05c5b942f4096fbe97dfd",
            "fullName": "Rabeya Akter",
            "email": "rabeyaakterbd4cit@gmail.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68a056cb942f4096fbe97de9",
            "fullName": "Katelyn Horne",
            "email": "woge@mailinator.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        },
        {
            "_id": "68a012b09431a265def5345b",
            "fullName": "Rabeya Akter",
            "email": "rabeyaakterbdcit@gmail.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": "https://res.cloudinary.com/dwok2hmb7/image/upload/v1757396707/NMP-Ecommerce/y63zlplpjb9gqze8njxx.jpg"
        },
        {
            "_id": "689c706053aac040ca07e2ff",
            "fullName": "Boda Ex",
            "email": "bodex71939@blaxion.com",
            "phone": "",
            "status": "unblocked",
            "profile_img": ""
        }
    ]
    
    const DownloadExport = () => {
        const fileName = 'users'
        if (data.length > 0) {
            const csvData = data?.map((item) => ({
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
      doc.text(`Total Records: ${data.length}`, 14, 40)

      // Prepare table data
      const tableData = data.map((user) => [
        // user._id.substring(0, 8) + "...", // Truncate ID for better fit
        user.fullName,
        user.email,
        user.phone || "N/A",
        // user.status,
      ])

      // Add table
      autoTable(doc, {
        head: [["Full Name", "Email", "Phone"]],
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
                <button className="px-3 flex gap-2 py-1 lg:py-2 text-white bg-blue-500 hover:bg-blue-600 duration-200 rounded-md">
                    <Download />Export Data</button>
            </Dropdown>
        </>
    )
}

export default ExportOrderData