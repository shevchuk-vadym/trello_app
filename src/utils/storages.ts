

export const setToLocalStorage = (key: string, data: any) => {
    window.localStorage.setItem(key, data)
}

export const getFromStorage = (key: string) => {
    return window.localStorage.getItem(key)
}