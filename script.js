const user_name = document.getElementById("name");
const user_mail = document.getElementById("email");
const password = document.getElementById("password");
const U_dob = document.getElementById("dob");
const u_terms = document.getElementById("acceptTerms");
const Submit = document.getElementById("submit");
const entries_history = document.getElementById("history");

const date = new Date();
let local_entries = []

const check_dateValidity = (givenDate) => {

    const user_dob = givenDate.split("-").map((d) => Number(d))
    const valid_year = (user_dob[0] >= (date.getFullYear() - 55) && user_dob[0] <= (date.getFullYear() - 18))

    let valid_Month;
    let valid_Day;

    if (user_dob[0] === date.getFullYear() - 55) {
        valid_Month = user_dob[1] >= (date.getMonth() + 1)
        valid_Day = user_dob[2] >= (date.getDate())
    } else if (user_dob[0] === date.getFullYear() - 18) {
        valid_Month = user_dob[1] <= (date.getMonth() + 1)
        valid_Day = user_dob[2] <= (date.getDate())
    } else if (valid_year) {
        valid_Month = true
        valid_Day = true
    } else {
        valid_Month = false
        valid_Day = false
    }

    return valid_year && valid_Month && valid_Day
}

const checkValidity = (element) => {
    return element.validity.valid
}

const nums = (num) => {
    if (num < 10) {
        return "0" + num
    } else {
        return num
    }
}
const send_Storage = (name, email, password, dob, terms) => {
    const user_data = {
        name,
        email,
        password,
        dob,
        terms
    }
    local_entries.push(user_data)
    localStorage.setItem('userData', JSON.stringify(local_entries))
}

const getuser_Storage = () => {
    local_entries = JSON.parse(localStorage.getItem("userData"))
    if (local_entries === null) {
        local_entries = []
    } else {
        const view = local_entries.map((entry) => {
            let row = ""
            const allKeys = Object.keys(entry)

            for (let i = 0; i < allKeys.length; i++) {
                row += `<td>${entry[allKeys[i]]}</td>`
            }

            return `<tr>${row}</tr>`
        })
        entries_history.innerHTML += view.join("\n")
    }
}


Submit.addEventListener("click", () => {
    const userDate = U_dob.value

    if (!check_dateValidity(userDate)) {
        U_dob.setCustomValidity(`Date must be between ${date.getFullYear() - 55}-${nums(date.getMonth() + 1)}-${nums(date.getDate())} and ${date.getFullYear() - 18}-${nums(date.getMonth() + 1)}-${nums(date.getDate())}`)
    } else {
        U_dob.setCustomValidity("")
    }

    const allValid = checkValidity(user_name) && checkValidity(user_mail) && checkValidity(password) && checkValidity(U_dob)

    if (allValid) {
        send_Storage(user_name.value, user_mail.value, password.value, U_dob.value, u_terms.checked)
    }
})

getuser_Storage()
