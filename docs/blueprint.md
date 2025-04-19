# **App Name**: RxInventory

## Core Features:

- Input Section: Implement a user interface section that allows the user to input a DIN number manually or via camera/image upload.
- DIN Extraction: Use an AI model to extract the DIN number from an image taken by the user or uploaded from their device. Extract the 8 digit number following the 'DIN' characters using an AI tool.
- Database Query: Implement backend logic to query a Firestore database for records matching the extracted DIN, grouping by expiry date and status, and ordering by expiry date.
- Result Display: Design and implement a table to display the query results, including columns for Expiry Date, Status, Number of Bottles, and an Operation button. The 'Operation' button text should dynamically update based on the 'Status' column value.
- Database Update: Implement backend logic to update the database when the 'Operation' button is clicked. When 'Operation' button from status 'New''s row is clicked, decrementing 'Number of Bottles' in that row , and incrementing  'Number of Bottles' in the row of status 'Opened'. When  'Operation' button from status 'Opened''s row is clicked, decrementing 'Number of Bottles' in that row , and incrementing  'Number of Bottles' in the row of status 'Finished'.

## Style Guidelines:

- Primary color: White or light gray for the background to ensure readability.
- Secondary color: A muted blue or green for headers and interactive elements.
- Accent: A bright teal (#008080) for buttons and key actions to draw attention.
- Use a clean and organized layout with clear sections for input and results.
- Use recognizable icons for camera, upload, and other actions.

## Original User Request:
A Web-based pharmacy drugs inventry app contain a simple front-end, simple backend logics and connect to a small database (please suggest one):
Front-end divided into 2 parts:
Part 1: A section to let user open camera(a camera icon button)/upload a pic (a upload icon button)/input numbers (a textbox with a search button)
- After user take a photo from camera/ upload a pic, the app need to detect a set of eight digit numbers after a set of characters "DIN".
- After the app detect the eight digit numbers from the pic or from user manually input, the app need to connect to database and retrieve the result to the front end Part 2 section (result will include a list with different expiry date and number of the bottles with the same expiry date)

Part 2: display a list of database results. there are a text on top to show user which DIN number (8 digit number) they are looking at, and the bottom part is the result from the database.
- The list contain 4 columns: Expiry date, Status, Number of bottles, Operation.
- Expiry date show MM/YYYY
- Status: there are 4 status (New, Opened, Finished, Expired)
- Number of bottles only show integer
- Operation provide some buttons to allow user take some action to update the database: if in the row "Status"= "New", display a button with text "Open 1"; if "Status"= "Opened", display a button with "Finished 1". 

Backend logic:
1. After user took a pic/uploaded the pic/manully input the 8 digit number, send the set of number to database and fetch the result with the sort as follow:
- select everything from the table when DIN = the input number, group by expiry date, status, and then order by expiry data in asd.
and the result will look like example below (expiry date, status, number of bottles):
01, 2025 | Opened | 1
01, 2025 | New | 3
01, 2025 | Finished | 2
01, 2025 | Expired | 1
03, 2025 | Opened | 0
03, 2025 | New | 5
03, 2025 | Finished | 0
03, 2025 | Expired | 0

Database design: There are 4 columns in a table (DIN, expiry date, status, number of bottles), which will be like below:
01234567 | 01, 2025 | Opened | 1
01234567 | 01, 2025 | New | 3
01234567 | 01, 2025 | Finished | 2
01234567 | 01, 2025 | Expired | 1
01234567 | 03, 2025 | Opened | 0
01234567 | 03, 2025 | New | 5
01234567 | 03, 2025 | Finished | 0
01234567 | 03, 2025 | Expired | 0
02345678 | 01, 2025 | Opened | 1
02345678 | 01, 2025 | New | 3
02345678 | 01, 2025 | Finished | 2
02345678 | 01, 2025 | Expired | 1
02345678 | 03, 2025 | Opened | 0
02345678 | 03, 2025 | New | 5
02345678 | 03, 2025 | Finished | 0
02345678 | 03, 2025 | Expired | 0
  