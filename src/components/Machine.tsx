import React, { useEffect, useState } from "react";
import {
    formatTimeLeft,
    getColor,
    sendLineNotification,
    statusMachine,
    statusMachineIcon,
} from "./FunctionMachine";

interface MachineProps {
    machine: {
        id: string;
        status: string;
        endTime: number;
    };
    updateMachine: (id: string, status: string, endTime: number) => void;
}

const Machine: React.FC<MachineProps> = ({ machine, updateMachine }) => {
    const [alertShown, setAlertShown] = useState<boolean>(false);

    const [runtime, setRuntime] = useState<number>(0);

    const handleStart = () => {
        if (machine.status === "available") {
            const endTime = Date.now() + 3 * 60 * 1000;
            updateMachine(machine.id, "working", endTime);
            setAlertShown(false);
        } else {
            updateMachine(machine.id, "available", 0);
        }
    };

    useEffect(() => {
        if (machine.status === "working") {
            const interval = setInterval(() => {
                const timeLeft = machine.endTime - Date.now();
                setRuntime(timeLeft)
                if (timeLeft <= 0) {
                    updateMachine(machine.id, "finish", 0);
                    clearInterval(interval);
                } else if (timeLeft <= 60 * 1000 && !alertShown) {
                    sendLineNotification(`Machine No ${machine.id} has less than 1 minute remaining!`);
                    setAlertShown(true);
                }
            }, 1000);
            return () => clearInterval(interval);
        } else if (machine.status === "finish") {
            setRuntime(0)
            sendLineNotification(`Machine No ${machine.id} has finished washing`);
        } else {
            setRuntime(0)
        }
    }, [machine, updateMachine, alertShown]);


    return (
        <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="p-4">
                <div className="container">
                    <img
                        className="mt-2"
                        src={statusMachineIcon(machine.status)}
                        style={{ width: "100px" }}
                    />
                    <div className="title">
                        Machine No {machine.id}
                    </div>
                    <p className="time">Time : {formatTimeLeft(runtime)}</p>
                    <div className="ribbon-wrap">
                        <div className="ribbon" style={{ background: getColor(machine.status) }}> {machine.status}</div>
                    </div>
                    <div>
                        <button
                            className={`subscribe-button`}
                            style={{ background: getColor(machine.status) }}
                            onClick={handleStart}
                            disabled={
                                machine.status === "working" || machine.status === "error"
                            }
                        >
                            {statusMachine(machine.status)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Machine;
