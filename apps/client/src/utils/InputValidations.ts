
export const isPasswordValid:Function = (password: string):boolean => {
    const passwordRegex:RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/;
    if (passwordRegex.test(password)) {
        return true;
    }
    return false;
};

export const validatePasswords:Function = (password: string, confirmPassword: string):boolean => {
    if (password === confirmPassword) {
        return true;
    }
    return false;
};

export const isEmailValid:Function = (email: string):boolean => {
    const emailRegex:RegExp = /\S+@\S+\.\S+/;
    if (emailRegex.test(email)) {
        return true;
    }
    return false;
}

export const isInputEmpty:Function = (input: string):boolean => {
    if (input.length > 0) {
        return true;
    }
    return false;
}
