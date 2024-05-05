export const testFirstName = (name) => {
    return name.length > 2 && name.length <= 28
}

export const testLastName = (name) => {
    return name.length > 2 && name.length <= 28
}

export const testEmail = (email) => {
    const regexp =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexp.test(email)
}

export const testPhoneNumber = (phoneNumber) => {
    const regexp = /^\d{10}$/

    return regexp.test(phoneNumber)
}
