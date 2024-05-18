import start from '../image/start.svg';
import error from '../image/error.svg';
import finish from '../image/finish.svg';
import working from '../image/working.svg';

export const getButtonClass = (val: string) => {
    switch (val) {
        case 'working':
            return 'btn btn-warning';
        case 'error':
            return 'btn btn-danger';
        case 'finish':
            return 'btn btn-success';
        default:
            return 'btn btn-primary';
    }
};

export const statusMachine = (val: string) => {
    switch (val) {
        case "working":
            return "Working"
        case "error":
            return "Error"
        case "finish":
            return "Finish"
        default:
            return "Start"
    }
}

export const getBadgeClass = (val: string) => {
    switch (val) {
        case 'working':
            return 'badge bg-warning';
        case 'error':
            return 'badge bg-danger';
        case 'finish':
            return 'badge bg-success';
        default:
            return 'badge bg-primary';
    }
};

export const statusMachineIcon = (val: string) => {
    switch (val) {
        case 'working':
            return working;
        case 'error':
            return error;
        case 'finish':
            return finish;
        default:
            return start;
    }
}


export const formatTimeLeft = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
};