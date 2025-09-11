"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, FileText, FileSpreadsheet } from "lucide-react"
import { exportToCSV, exportToPDF } from "@/lib/export-utils"

// Parse the JSON data
const rawData = `"data": [
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
        }
    ]`

// Extract and parse the data
const userData = JSON.parse(`{${rawData}}`).data

export default function UserDataExport() {
  const [isExporting, setIsExporting] = useState(false)

  const handleCSVExport = async () => {
    setIsExporting(true)
    try {
      await exportToCSV(userData, "user-data.csv")
    } catch (error) {
      console.error("CSV export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handlePDFExport = async () => {
    setIsExporting(true)
    try {
      await exportToPDF(userData, "user-data.pdf")
    } catch (error) {
      console.error("PDF export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">User Data Management</h1>
          <p className="text-muted-foreground">View and export user data in CSV or PDF format</p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCSVExport}
            disabled={isExporting}
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={handlePDFExport} disabled={isExporting} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            User Data ({userData.length} users)
          </CardTitle>
          <CardDescription>Complete list of users with their details and status information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((user: any) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.profile_img || "/placeholder.svg"} alt={user.fullName} />
                        <AvatarFallback>
                          {user.fullName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{user.fullName}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell className="text-muted-foreground">{user.phone || "N/A"}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "unblocked" ? "default" : "destructive"} className="capitalize">
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{user._id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
