const getAge = (date) => {
    return new Promise((res, rej) => {
        const dn = new Date(date)
        const auj = new Date();
        let age_now = (auj.getFullYear() - dn.getFullYear());
        var m = auj.getMonth() - dn.getMonth();
        if (m < 0 || (m === 0 && auj.getDate() < dn.getDate()))
            age_now--;
        if (age_now)
            res(age_now);
    })
}

const resizeImage = async (e, size) => {
    const img = await document.getElementById(e.target.id);
    img.style.width = 'auto';
    img.style.height = 'auto';
    img.style.right = '0px';
    img.style.bottom = '0px';

    if (img.width >= img.height) {
        img.style.height = size + 'px';
        img.style.right = (img.width - size) / 2 + 'px';
    }
    else {
        img.style.width = size + 'px';
        img.style.bottom = (img.height - size) / 2 + 'px';
    }
}

const isLogout = () => {
    localStorage.removeItem('token');
    document.location.href = 'http://localhost:3000/login';
}

export { getAge, resizeImage, isLogout }


