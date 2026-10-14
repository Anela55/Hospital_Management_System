# Hospital_Management_System
# CarePoint Hospital Management System

A simple Hospital Management System developed with HTML, CSS, and JavaScript to demonstrate how arrays can be used to organize and manage patient records.

## Project Overview

The CarePoint Hospital Management System is an educational web application that allows users to register, view, search, edit, delete, and filter patient records.

The main objective is to demonstrate the practical application of arrays as a data structure in a real-world hospital management scenario.

## Features

- Dashboard with patient statistics
- Register new patients
- View patient records in a table
- Search by name, patient ID, condition, or department
- Filter patients by admission status
- Edit patient records
- Delete patient records with confirmation
- Save demonstration records using browser Local Storage
- Responsive interface for desktop and mobile screens

## Technologies Used

- HTML5
- CSS3
- JavaScript
- JavaScript arrays and objects
- Browser Local Storage

## Project Structure

```text
hospital-management-system/
├── index.html
├── style.css
├── script.js
├── report.md
└── README.md
```

## How to Run the Project

1. Create a folder named `hospital-management-system`.
2. Save the five project files inside the folder.
3. Open `index.html` in a modern web browser.
4. Use the Register Patient button to add a demonstration record.
5. Search, filter, edit, or delete records to test the application.

You can also open the folder in Visual Studio Code and use the Live Server extension to run the application locally.

## How Arrays Are Used

The application stores patient objects in a JavaScript array:

```javascript
let patients = [];
```

The project demonstrates these array operations:

| Method or property | Purpose |
|---|---|
| `push()` | Adds a new patient |
| `find()` | Searches for a patient |
| `findIndex()` | Finds a patient's position |
| `filter()` | Searches, filters, and removes records |
| `some()` | Checks whether a condition matches any record |
| `length` | Counts patient records |

These operations make it easier to manage multiple records without creating a separate variable for every patient.

## Data Storage

The project uses browser Local Storage to preserve demonstration records between page visits in the same browser. It does not use a server or a shared database.

**Important:** This is a learning project, not a production medical system. Do not enter real patient details, medical records, or confidential information.

## Project Report

The file `report.md` contains the assignment discussion, real-world applications of arrays, reasons for using arrays, project objectives, implementation details, testing, limitations, and conclusion.

## Future Improvements

Possible improvements include:

- A secure database such as MySQL or PostgreSQL
- User authentication and role-based permissions
- Appointment scheduling
- Doctor and staff management
- Billing and payment records
- Secure backups and audit logs

## Conclusion

CarePoint demonstrates how JavaScript arrays can be used to manage a collection of patient records. The project combines basic web development with practical data-structure operations.

## License

This project is provided for educational and demonstration purposes.
