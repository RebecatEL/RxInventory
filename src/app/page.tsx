"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Camera } from "lucide-react";

export default function Home() {
  const [din, setDin] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    // TODO: Implement database query logic here
    // For now, let's use some dummy data
    const dummyData = [
      { din: "01234567", expiryDate: "01/2025", status: "New", bottles: 3 },
      { din: "01234567", expiryDate: "01/2025", status: "Opened", bottles: 1 },
      { din: "01234567", expiryDate: "03/2025", status: "New", bottles: 5 },
    ];
    // Filter the dummy data based on the input DIN
    const filteredData = dummyData.filter((item) => item.din === din);
    setResults(filteredData);
  };

  const handleOperation = (result: any) => {
    // TODO: Implement database update logic here
    console.log("Operation clicked for:", result);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">RxInventory</h1>

      {/* Input Section */}
      <div className="mb-4 flex space-x-2">
        <Input
          type="text"
          placeholder="Enter DIN number"
          value={din}
          onChange={(e) => setDin(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
        <Button variant="secondary">
          <Camera className="mr-2 h-4 w-4" />
          Scan
        </Button>
      </div>

      {/* Result Display Section */}
      {results.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Results for DIN: {din}
          </h2>
          <Table>
            <TableCaption>
              A list of drugs with the same DIN number, grouped by expiry date and status.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Number of Bottles</TableHead>
                <TableHead>Operation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{result.expiryDate}</TableCell>
                  <TableCell>{result.status}</TableCell>
                  <TableCell>{result.bottles}</TableCell>
                  <TableCell>
                    <Button variant="default" onClick={() => handleOperation(result)}>
                      {result.status === "New" ? "Open 1" : "Finished 1"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
