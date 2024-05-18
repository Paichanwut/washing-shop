import React, { useEffect, useState } from 'react';
import Machine from './Machine';
import { getFromLocalStorage, saveToLocalStorage, initializeData } from '../utils/storage';

interface Machine {
    id: string;
    status: string;
    endTime: number;
}

const MachineList: React.FC = () => {
    const [machines, setMachines] = useState<Machine[]>([]);

    useEffect(() => {
        let storedMachines = getFromLocalStorage('machines');
        if (!storedMachines) {
            initializeData();
            storedMachines = getFromLocalStorage('machines');
        }
        setMachines(storedMachines);
    }, []);

    const updateMachine = (id: string, status: string, endTime: number) => {
        const updatedMachines = machines.map(machine =>
            machine.id === id ? { ...machine, status, endTime } : machine
        );
        setMachines(updatedMachines);
        saveToLocalStorage('machines', updatedMachines);
    };

    return (
        <div>
            {machines.map(machine => (
                <Machine key={machine.id} machine={machine} updateMachine={updateMachine} />
            ))}
        </div>
    );
};

export default MachineList;
