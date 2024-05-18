export const getFromLocalStorage = (key: string): any => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const saveToLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// ฟังก์ชันสำหรับกำหนดข้อมูลเริ่มต้น
export const initializeData = (): void => {
  const initialData = [
    { id: "1", status: "available", endTime: 0 },
    { id: "2", status: "available", endTime: 0 },
    { id: "3", status: "available", endTime: 0 },
  ];
  saveToLocalStorage("machines", initialData);
};
