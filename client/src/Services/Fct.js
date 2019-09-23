// eslint-disable-next-line
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

const resizeImage = async e => {
    const img = await document.getElementById(e.target.id);
    img.style.width = 'auto';
    img.style.height = 'auto';
    img.style.right = '0px';
    img.style.bottom = '0px';

    if (img.width >= img.height) {
        img.style.height = '300px';
        img.style.right = (img.width - 300) / 2 + 'px';
    }
    else {
        img.style.width = '300px';
        img.style.bottom = (img.height - 300) / 2 + 'px';
    }
}

export { getAge, resizeImage }


