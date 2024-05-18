import React, { useEffect, useState } from "react";
import {
    formatTimeLeft,
    getBadgeClass,
    getButtonClass,
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
            const endTime = Date.now() + 30 * 60 * 1000;
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
                    alert(`Machine ${machine.id} has less than 1 minute remaining!`);
                    setAlertShown(true);
                }
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setRuntime(0)
        }
    }, [machine, updateMachine, alertShown]);


    return (
        <div className="col-sm-6 col-md-4">
            <div className="card p-4">
                <div className="row">
                    <div className="col-4 d-flex justify-content-center">
                        <img
                            src={statusMachineIcon(machine.status)}
                            style={{ width: "100px" }}
                        />
                    </div>
                    <div className="col">
                        <p className="d-flex justify-content-between">
                            <h4>
                                Machine No {machine.id}
                            </h4>

                            <span> Status : {" "}
                                <span className={`${getBadgeClass(machine.status)} p-2 fs-7`}>
                                    {machine.status}
                                </span>
                            </span>
                        </p>
                        <p>Time : {formatTimeLeft(runtime)}</p>
                        <button
                            className={getButtonClass(machine.status)}
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
