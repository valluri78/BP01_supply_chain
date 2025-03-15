import { redirect } from "react-router-dom";

export const saveUserInfo = (token, role, userName) => {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('userName', userName);
};

export const getUserInfo = () => {
    const token = sessionStorage.getItem('authToken');
    const role = sessionStorage.getItem('role')
    const userName = sessionStorage.getItem('userName')
    return { role, token, userName }
};

export const removeToken = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userName');
}

export function convertToTitleCase(str) {
    if (str.includes('-')) {
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    } else {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
};

export function pathToTitlesConversion(path) {
    const pathTitleMap = {
        'dashboard': "Dashboard",
        "createNode":"Canvas",
        "transactions":"Transactions",
        "graphVisualization":"Graph Visualization",
        "citedWorks":"Cited Works",
        "recharts":"React recharts",
    };
    return pathTitleMap[path] || '';
}

export function toCamelCase(input) {
    return input.charAt(0).toLowerCase() + input.slice(1);
}


export function checkAuthLoader() {
    const { token } = getUserInfo();

    if (!token) {
        return redirect('/login');
    }

    return null;
}

export const validateFields = (fields) => {
    const errors = [];
    let isValid = true;

    const getField = (name) => fields.find((field) => field.name === name);

    fields.forEach((field) => {
        const { name, value, type, required, min, max, compareTo } = field;

        if (required && (!value || (Array.isArray(value) && value.length === 0))) {
            isValid = false;
            errors.push(`${name} is required.`);
            return;
        }

        if (type === 'date') {
            const dateValue = new Date(value);
            if (isNaN(dateValue.getTime())) {
                isValid = false;
                errors.push(`${name} is not a valid date.`);
            }

            if (name === 'To Date') {
                const currentDate = new Date();
                if (dateValue > currentDate) {
                    isValid = false;
                    errors.push(`${name} cannot be in the future.`);
                }
            }

            if (compareTo) {
                const compareField = getField(compareTo);
                const compareDate = new Date(compareField.value);
                if (name === 'To Date' && dateValue < compareDate) {
                    isValid = false;
                    errors.push(`${name} cannot be before ${compareTo}.`);
                }
                if (name === 'From Date' && dateValue > compareDate) {
                    isValid = false;
                    errors.push(`${name} cannot be after ${compareTo}.`);
                }
            }
        }

        if (type === 'number') {
            const numValue = Number(value);
            if (isNaN(numValue)) {
                isValid = false;
                errors.push(`${name} is not a valid number.`);
            }

            if (min !== undefined && numValue < min) {
                isValid = false;
                errors.push(`${name} cannot be less than ${min}.`);
            }

            if (max !== undefined && numValue > max) {
                isValid = false;
                errors.push(`${name} cannot be greater than ${max}.`);
            }
        }

        if (type === 'string') {
            if (min !== undefined && value.length < min) {
                isValid = false;
                errors.push(`${name} must be at least ${min} characters long.`);
            }

            if (max !== undefined && value.length > max) {
                isValid = false;
                errors.push(`${name} cannot be more than ${max} characters long.`);
            }
        }

        if (type === 'array') {
            if (Array.isArray(value) && value.length === 0) {
                isValid = false;
                errors.push(`Please select at least one ${name}.`);
            }
        }
    });

    return {
        isValid,
        errors,
    };
};


export const extractLabels = (obj) => {
    const result = {};
    Object.keys(obj).forEach((key) => {
        if (Array.isArray(obj[key]) && obj[key].length >= 1) {
            result[key] = obj[key].map((item) => item.label);
        }
    });
    return result;
};

export const mergeUniqueValues = (...arrays) => {
    const set = new Set(arrays.flat());
    return Array.from(set);
};

export function toPascalCase(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

export const dateRangeConvert = (dateStr) => {

    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      
}

export const getFourDaysEarlier = () => {
    const today = new Date();
    today.setDate(today.getDate() - 4); // Subtracts 4 days from the current date
    today.setHours(0, 0, 0, 0);
    return today;
  };