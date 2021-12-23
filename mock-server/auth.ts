const timeout = 100;
let isAuthorized = false;

export const loginAPI = (value: any) => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (value.username === 'user' && value.password === '123') {
                isAuthorized = true;
                resolve(true);
            } else {
                isAuthorized = false;
                resolve(false);
            }
        }, timeout);
    });
}

export const getUserProfile = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isAuthorized) {
                resolve({
                    id: '1',
                    firstName: 'John',
                    lastName: 'Doe'
                });
            }
            reject(new Error('Not authorized'));
        }, timeout);
    });
}