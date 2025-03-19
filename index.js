function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(" ");
    employee.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour) });
    return employee;
}

function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(" ");
    employee.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour) });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(e => e.date === date);
    let timeOut = employee.timeOutEvents.find(e => e.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, e) => total + wagesEarnedOnDate(employee, e.date), 0);
}

function calculatePayroll(employees) {
    return employees.reduce((total, e) => total + allWagesFor(e), 0);
}

