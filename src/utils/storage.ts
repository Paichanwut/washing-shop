export const getFromLocalStorage = (key: string): any => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const saveToLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const statusMachine = ["available", "working", "error", "finish"];

export const initializeData = (): void => {
  const initialData = [
    { id: "1", status: statusMachine[0], endTime: 0 },
    { id: "2", status: statusMachine[0], endTime: 0 },
    { id: "3", status: statusMachine[0], endTime: 0 },
    { id: "4", status: statusMachine[0], endTime: 0 },
    { id: "5", status: statusMachine[0], endTime: 0 },
    { id: "6", status: statusMachine[0], endTime: 0 },
    { id: "7", status: statusMachine[0], endTime: 0 },
    { id: "8", status: statusMachine[2], endTime: 0 },
    { id: "9", status: statusMachine[3], endTime: 0 },
  ];
  saveToLocalStorage("machines", initialData);
};
