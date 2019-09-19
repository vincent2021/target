
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

// deplacer à l'inscription (calcul de l'age)
const getAge = (date) => {
    const dn = new Date(date)
    const auj = new Date();
    let age_now = (auj.getFullYear() - dn.getFullYear());
    var m = auj.getMonth() - dn.getMonth();
    if (m < 0 || (m === 0 && auj.getDate() < dn.getDate()))
        age_now--;
    return age_now;
}

export { getAge }


