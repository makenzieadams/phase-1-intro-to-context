function createEmployeeRecord(array) {
  let firstName = array[0];
  let familyName = array[1];
  let title = array[2];
  let payPerHour = array[3];

  let timeInEvents = [];
  let timeOutEvents = [];

  let employeeObj = {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents,
    timeOutEvents,
  };
  return employeeObj;
}

function createEmployeeRecords(array) {
  return array.map(function (records) {
    return createEmployeeRecord(records);
  });
}

function createTimeInEvent(record, timestamp) {
  // 2021-12-15 1400
  // date = 2021-12-15
  // time 1400
  const splitTimes = timestamp.split(" ");
  // ["2021-12-15", "1400"]

  const timeInEvent = {
    type: "TimeIn",
    date: splitTimes[0],
    hour: Number(splitTimes[1]),
  };

  record.timeInEvents.push(timeInEvent);

  return record;
}

function createTimeOutEvent(record, timestamp) {
  // 2021-12-15 1400
  // date = 2021-12-15
  // time 1400
  const splitTimes = timestamp.split(" ");
  // ["2021-12-15", "1400"]

  const timeInEvent = {
    type: "TimeOut",
    date: splitTimes[0],
    hour: Number(splitTimes[1]),
  };

  record.timeOutEvents.push(timeInEvent);

  return record;
}

function hoursWorkedOnDate(record, date) {
  const n = record.timeInEvents.find((event) => {
    return event.date === date;
  });
  const out = record.timeOutEvents.find((event) => {
    return event.date === date;
  });

  let timeIn = n.hour;
  let timeOut = out.hour;
  let total = timeOut - timeIn;
  return total / 100;
}

function wagesEarnedOnDate(record, date) {
  const hours = hoursWorkedOnDate(record, date);
  return record.payPerHour * hours;
}

function allWagesFor(record) {
  let total = 0;

  record.timeInEvents.forEach((e) => {
    const wages = wagesEarnedOnDate(record, e.date);
    total = wages + total;
  });

  return total;
}

function calculatePayroll(employees) {
  let total = 0;

  employees.forEach((employee) => {
    const wages = allWagesFor(employee);
    total = wages + total;
  });

  return total;
}
