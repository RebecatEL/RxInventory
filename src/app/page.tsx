"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Camera } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const [din, setDin] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isDinValid, setIsDinValid] = useState(true);
  const [hasSearched, setHasSearched] = useState(false); // Track if a search has been performed

  const handleSearch = async () => {
    if (din.length !== 8) {
      setIsDinValid(false);
      setHasSearched(false); // Reset hasSearched if DIN is invalid
      return;
    }

    setIsDinValid(true);
    setHasSearched(true); // Set hasSearched to true after a search

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
      <div className="mb-4 flex flex-col space-y-2">
        <Input
          type="text"
          placeholder="Enter DIN number"
          value={din}
          onChange={(e) => {
            setDin(e.target.value);
            setIsDinValid(true); // Reset validation on input change
          }}
        />
        {!isDinValid && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>DIN number must be 8 digits.</AlertDescription>
          </Alert>
        )}
        <div className="flex space-x-2">
            <Button onClick={handleSearch}>Search</Button>
            <Button variant="secondary">
            <Camera className="mr-2 h-4 w-4" />
            Scan
            </Button>
        </div>
      </div>

      {/* Result Display Section */}
      {(results.length > 0 || hasSearched) ? (
        <div>
          <h2 className="text-lg font-semibold mb-2">
            Results for DIN: {din}
          </h2>
          {results.length > 0 ? (
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
                      <Button onClick={() => handleOperation(result)}>
                        {result.status === "New" ? "Open 1" : "Finished 1"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>No result</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
