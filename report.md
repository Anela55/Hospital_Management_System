# Hospital Management System Using Arrays

## 1. Introduction

A data structure is a way of organizing and storing data so that it can be accessed and managed efficiently. Arrays are among the most common data structures used in programming. An array stores multiple values in a single variable, allowing a program to work with a collection of related items.

This project demonstrates the use of arrays by developing a simple Hospital Management System using HTML, CSS, and JavaScript.

## 2. Real-World Applications That Use Arrays

Arrays are used in many real-world applications, including the following.

### 2.1 Hospital Management Systems

Hospitals manage patient details, departments, appointments, and admission records. Arrays can store collections of patient records, making it possible to search, display, update, and remove records.

### 2.2 Library Management Systems

Libraries maintain information about books, authors, borrowers, and book availability. Arrays can hold book records and allow a system to search for a book or update its availability.

### 2.3 Student Management Systems

Schools and universities manage student names, identification numbers, courses, and grades. Arrays can store student records and support operations such as searching and calculating results.

### 2.4 Banking Systems

Banking applications may use arrays to process collections of transactions, payment entries, or temporary account records. Each transaction can be represented as an object stored in an array.

### 2.5 E-Commerce Systems

Online shopping applications manage products, shopping carts, and order items. Arrays can store product collections and allow users to search for products, add items to a cart, and calculate totals.

### 2.6 Transport and Booking Systems

Airlines, bus companies, and railway services manage seats, passengers, and reservations. Arrays can represent collections of seats or booking records and help a system check availability.

## 3. Why Arrays Are Necessary

Arrays are useful because they provide a structured way to work with many related values.

1. **Organization:** Related records can be stored together in one collection.
2. **Easy access:** Elements can be accessed by their index or searched using array methods.
3. **Efficient iteration:** Loops and array methods can process many records without repeating the same code.
4. **Searching and filtering:** A program can find a specific record or display only records that meet certain conditions.
5. **Updating and deleting:** Records can be changed or removed as the application's requirements change.
6. **Reduced complexity:** Arrays make it easier to manage collections than creating a separate variable for every record.
7. **Support for dynamic collections:** JavaScript arrays can grow or shrink as records are added or removed.

Arrays are not the only possible data structure. For larger applications, databases and other structures are often more appropriate. Arrays are particularly useful for learning, prototypes, and managing in-memory collections.

## 4. Selected Application: Hospital Management System

The selected application is a Hospital Management System called CarePoint.

The system demonstrates how a hospital-style application can manage patient records. Each patient is represented by a JavaScript object, and all patient objects are stored in a single array.

### 4.1 Objectives

- Demonstrate the practical use of arrays in a real-world application.
- Register new patient records.
- Display a list of patients.
- Search for patients by name, identification number, condition, or department.
- Filter patients by their status.
- Edit existing records.
- Delete records.
- Display the total number of patients and counts by status.

### 4.2 Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Provides the structure of the application |
| CSS | Styles the interface and makes it responsive |
| JavaScript | Implements the application's logic and array operations |
| Browser Local Storage | Preserves demonstration records in the same browser |

### 4.3 Representation of Patient Records

Each patient is represented as an object containing fields such as identification number, name, age, gender, condition, department, and status.

Example:

```javascript
const patient = {
    id: "PAT-1001",
    name: "Ama Mensah",
    age: 28,
    gender: "Female",
    condition: "Routine check-up",
    department: "General Medicine",
    status: "Outpatient"
};
```

Multiple patient objects are stored in an array:

```javascript
let patients = [
    {
        id: "PAT-1001",
        name: "Ama Mensah",
        age: 28,
        gender: "Female",
        condition: "Routine check-up",
        department: "General Medicine",
        status: "Outpatient"
    }
];
```

The array allows the program to process multiple patient records using the same operations.

## 5. Array Operations Used in the Project

### 5.1 Adding Records with `push()`

The `push()` method adds a new patient to the end of the array.

```javascript
patients.push(newPatient);
```

This operation is used when registering a patient.

### 5.2 Finding Records with `find()`

The `find()` method returns the first element that satisfies a condition.

```javascript
const patient = patients.find(
    item => item.id === patientId
);
```

This helps the program locate a patient by identification number.

### 5.3 Finding a Position with `findIndex()`

The `findIndex()` method returns the index of the first matching element.

```javascript
const index = patients.findIndex(
    item => item.id === patientId
);
```

The returned index can be used to update the corresponding record.

### 5.4 Filtering Records with `filter()`

The `filter()` method creates a new array containing only records that satisfy a condition.

```javascript
const admitted = patients.filter(
    patient => patient.status === "Admitted"
);
```

This operation supports the status filter and patient statistics.

### 5.5 Checking Conditions with `some()`

The `some()` method checks whether at least one array element satisfies a condition.

```javascript
const idExists = patients.some(
    patient => patient.id === "PAT-1001"
);
```

In the project, `some()` helps ensure that newly generated identification numbers are not already in use.

### 5.6 Counting Records with `length`

The `length` property returns the number of elements in an array.

```javascript
const total = patients.length;
```

This is used to display the total number of patient records.

## 6. System Features

The application provides the following features:

- A dashboard displaying patient totals.
- A patient registration form.
- A table displaying patient details.
- Search and status-filter functionality.
- Editing and deleting of demonstration records.
- Automatic updates to the dashboard after changes.
- Browser-based saving and loading of demonstration records.
- A responsive layout for desktop and smaller screens.

## 7. Testing

The following tests can be performed to check whether the application works correctly.

| Test | Expected result |
|---|---|
| Open the page | Sample patient records appear |
| Register a patient | A new record appears in the table |
| Search by patient name | Matching records are displayed |
| Filter by Admitted | Only admitted records appear |
| Edit a patient | The selected record is updated |
| Delete a patient | The selected record is removed after confirmation |
| Check dashboard totals | The displayed totals reflect the current array |
| Refresh the page | Saved demonstration records are loaded when available |

## 8. Limitations

This project is an educational demonstration, not a production hospital information system.

- The data is stored in one browser and is not shared between users.
- Local Storage is not a secure medical-record database.
- There is no user authentication or access-control system.
- The application does not provide clinical decision-making, billing, pharmacy, or appointment scheduling.
- Changes may be lost if browser storage is cleared.
- Sample data must not be confused with actual hospital records.

A real hospital system would require a secure server, a properly designed database, authentication, authorization, audit logs, backups, and safeguards for sensitive medical information.

## 9. Conclusion

The Hospital Management System demonstrates how arrays can be applied to a practical programming problem. By storing patient objects in an array, the application can register, search, update, delete, and filter records using reusable JavaScript operations.

The project illustrates that arrays help organize related data and simplify the processing of collections. It also provides practical experience with HTML, CSS, JavaScript objects, array methods, event handling, and browser storage.

## 10. References

- MDN Web Docs, JavaScript Arrays: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- MDN Web Docs, Array.prototype.push(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
- MDN Web Docs, Array.prototype.filter(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
- MDN Web Docs, Window.localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
