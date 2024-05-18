import start from '../image/start.svg';
import error from '../image/error.svg';
import finish from '../image/finish.svg';
import working from '../image/working.svg';
import axios from 'axios';

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

export const getColor = (val: string) => {
    switch (val) {
        case 'working':
            return '#FFD700';
        case 'error':
            return '#B22222';
        case 'finish':
            return '#3CB371';
        default:
            return '#4682B4';
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

export const sendLineNotification = async (message: string) => {
    try {
        await axios.post('http://localhost:5000/notify', { message });
    } catch (error) {
        console.error('Failed to send Line notification:', error);
    }
};