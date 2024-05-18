function getEmployeeInfo(employees, targetName) {
  const employee = employees.find((emp) => emp.name === targetName);

  if (employee) {
    return `Expected Output: ชื่อ ${employee.name} ตำแหน่ง ${employee.position}`;
  } else {
    return `Employee with name ${targetName} not found.`;
  }
}

const employees = [
  { name: "Arm", position: "Front End" },
  { name: "Game", position: "Back End" },
];

console.log(getEmployeeInfo(employees, "Janny"));
console.log(getEmployeeInfo(employees, "Game"));
