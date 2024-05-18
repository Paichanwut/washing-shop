import React, { useEffect, useState } from 'react';

interface MachineProps {
    machine: {
        id: string;
        status: string;
        endTime: number;
    };
    updateMachine: (id: string, status: string, endTime: number) => void;
}

const Machine: React.FC<MachineProps> = ({ machine, updateMachine }) => {
    const [alertShown, setAlertShown] = useState(false);

    const handleStart = () => {
        const endTime = Date.now() + 30 * 60 * 100; // ตั้งเวลาจบใน 30 นาที
        updateMachine(machine.id, 'in_use', endTime);
        setAlertShown(false); // Reset alert shown state
    };

    useEffect(() => {
        if (machine.status === 'in_use') {
            const interval = setInterval(() => {
                const timeLeft = machine.endTime - Date.now();
                if (timeLeft <= 0) {
                    updateMachine(machine.id, 'available', 0);
                    clearInterval(interval);
                } else if (timeLeft <= 60 * 1000 && !alertShown) {
                    alert(`Machine ${machine.id} has less than 1 minute remaining!`);
                    setAlertShown(true);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [machine, updateMachine, alertShown]);

    return (
        <div>
            <p>Machine {machine.id} - Status: {machine.status}</p>
            <button onClick={handleStart} disabled={machine.status === 'in_use'}>
                {machine.status === 'in_use' ? 'In Use' : 'Start'}
            </button>
        </div>
    );
};

export default Machine;
