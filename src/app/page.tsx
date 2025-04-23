"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Camera } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const [din, setDin] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isDinValid, setIsDinValid] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  const dummyData = [
    { din: "01234567", expiryDate: "01/2025", status: "New", bottles: 3 },
    { din: "01234567", expiryDate: "01/2025", status: "Opened", bottles: 1 },
    { din: "01234567", expiryDate: "03/2025", status: "New", bottles: 5 },
  ];

  useEffect(() => {
    const handleSearch = async () => {
      if (din.length === 8) {
        setIsDinValid(true);
        setHasSearched(true);

        const filteredData = dummyData.filter((item) => item.din === din);
        setResults(filteredData);
      } else {
        setIsDinValid(din.length === 0 || din.length === 8); // Only show error if something is entered
        setHasSearched(false);
        setResults([]);
      }
    };

    handleSearch();
  }, [din]);

  const handleOperation = (result: any, operationType: string) => {
    // TODO: Implement database update logic here
    console.log(`Operation ${operationType} clicked for:`, result);

    if (operationType === "Open 1") {
      // Find the index of the "New" status row for this DIN and Expiry Date
      const newIndex = results.findIndex(
        (item) => item.status === "New" && item.expiryDate === result.expiryDate && item.din === result.din
      );
  
      // Find the index of the "Opened" status row for this DIN and Expiry Date
      const openedIndex = results.findIndex(
        (item) => item.status === "Opened" && item.expiryDate === result.expiryDate && item.din === result.din
      );
  
      // Check if both "New" and "Opened" status rows were found
      if (newIndex !== -1 && openedIndex !== -1) {
        // Update the number of bottles for "New" and "Opened" statuses
        const updatedResults = [...results];
        updatedResults[newIndex] = { ...updatedResults[newIndex], bottles: updatedResults[newIndex].bottles - 1 };
        updatedResults[openedIndex] = { ...updatedResults[openedIndex], bottles: updatedResults[openedIndex].bottles + 1 };
  
        // Update the results state with the updated data
        setResults(updatedResults);
      } else {
        console.error("Could not find 'New' or 'Opened' status row for DIN:", result.din, "and Expiry Date:", result.expiryDate);
      }
    }
  
    if (operationType === "Finished 1") {
            // Find the index of the "Opened" status row
            const openedIndex = results.findIndex(
                (item) => item.status === "Opened" && item.expiryDate === result.expiryDate && item.din === result.din
            );

            // Find the index of the "Finished" status row
            const finishedIndex = results.findIndex(
                (item) => item.status === "Finished" && item.expiryDate === result.expiryDate && item.din === result.din
            );

            // Check if both "Opened" and "Finished" status rows were found
            if (openedIndex !== -1 && finishedIndex !== -1) {
                // Update the number of bottles for "Opened" and "Finished" statuses
                const updatedResults = [...results];
                updatedResults[openedIndex] = { ...updatedResults[openedIndex], bottles: updatedResults[openedIndex].bottles - 1 };
                updatedResults[finishedIndex] = { ...updatedResults[finishedIndex], bottles: updatedResults[finishedIndex].bottles + 1 };

                // Update the results state with the updated data
                setResults(updatedResults);
            } else {
                console.error("Could not find 'Opened' or 'Finished' status row");
            }
    }

    if (operationType === "Unopen 1") {
          // Find the index of the "New" status row
          const newIndex = results.findIndex(
            (item) => item.status === "New" && item.expiryDate === result.expiryDate && item.din === result.din
          );
  
          // Find the index of the "Opened" status row
          const openedIndex = results.findIndex(
            (item) => item.status === "Opened" && item.expiryDate === result.expiryDate && item.din === result.din
          );
  
          // Check if both "New" and "Opened" status rows were found
          if (newIndex !== -1 && openedIndex !== -1) {
            // Update the number of bottles for "New" and "Opened" statuses
            const updatedResults = [...results];
            updatedResults[newIndex] = { ...updatedResults[newIndex], bottles: updatedResults[newIndex].bottles + 1 };
            updatedResults[openedIndex] = { ...updatedResults[openedIndex], bottles: updatedResults[openedIndex].bottles - 1 };
  
            // Update the results state with the updated data
            setResults(updatedResults);
          } else {
            console.error("Could not find 'New' or 'Opened' status row");
          }
    }
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
                      {result.status === "New" && (
                        <Button onClick={() => handleOperation(result, "Open 1")}>
                          Open 1
                        </Button>
                      )}
                      {result.status === "Opened" && (
                        <>
                          <Button onClick={() => handleOperation(result, "Finished 1")}>
                            Finished 1
                          </Button>
                          &nbsp;
                          <Button variant="destructive" onClick={() => handleOperation(result, "Unopen 1")}>
                            Unopen 1
                          </Button>
                        </>
                      )}
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

