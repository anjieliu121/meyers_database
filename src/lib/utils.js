import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs) => twMerge(clsx(inputs));

const testIsPositiveInteger = input => /^[1-9]\d*$/.test(input.trim());

const areEqual = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) 
        return a.length === b.length && a.every((val, index) => val === b[index]);
    return a === b;
}

export {cn, testIsPositiveInteger, areEqual };