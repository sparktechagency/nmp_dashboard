// Utility functions for exporting data to CSV and PDF formats

export const exportToCSV = (data: any[], filename: string) => {
  // Convert data to CSV format
  const headers = ["ID", "Full Name", "Email", "Phone", "Status", "Profile Image"]
  const csvContent = [
    headers.join(","),
    ...data.map((user) =>
      [user._id, `"${user.fullName}"`, user.email, user.phone || "N/A", user.status, user.profile_img || "N/A"].join(
        ",",
      ),
    ),
  ].join("\n")

  // Create and download the file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

export const exportToPDF = async (data: any[], filename: string) => {
  // Create PDF content using HTML and CSS
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>User Data Export</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #333;
          padding-bottom: 10px;
        }
        .header h1 {
          margin: 0;
          color: #2563eb;
        }
        .header p {
          margin: 5px 0 0 0;
          color: #666;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #f8f9fa;
          font-weight: bold;
          color: #333;
        }
        tr:nth-child(even) {
          background-color: #f8f9fa;
        }
        .status {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }
        .status.unblocked {
          background-color: #dcfce7;
          color: #166534;
        }
        .status.blocked {
          background-color: #fecaca;
          color: #dc2626;
        }
        .id-cell {
          font-family: monospace;
          font-size: 10px;
          color: #666;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #ddd;
          padding-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>User Data Export</h1>
        <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        <p>Total Users: ${data.length}</p>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (user) => `
            <tr>
              <td>${user.fullName}</td>
              <td>${user.email}</td>
              <td>${user.phone || "N/A"}</td>
              <td><span class="status ${user.status}">${user.status}</span></td>
              <td class="id-cell">${user._id}</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
      
      <div class="footer">
        <p>This document contains ${data.length} user records exported from the user management system.</p>
      </div>
    </body>
    </html>
  `

  // Create a new window for printing
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(htmlContent)
    printWindow.document.close()

    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print()
      printWindow.close()
    }
  } else {
    // Fallback: create downloadable HTML file
    const blob = new Blob([htmlContent], { type: "text/html" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", filename.replace(".pdf", ".html"))
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}
