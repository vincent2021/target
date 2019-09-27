const getAge = (date) => {
    const dn = new Date(date)
    const auj = new Date();
    let age_now = (auj.getFullYear() - dn.getFullYear());
    var m = auj.getMonth() - dn.getMonth();
    if (m < 0 || (m === 0 && auj.getDate() < dn.getDate()))
        age_now--;
    return age_now;
}

const getDOB = (age) => {
    let date = new Date;
    let dob = new Date();
    dob = date.setFullYear(date.getFullYear() - age);
    return (dob.getFullYear() + "-" + dob.getMonth() + "-" + dob.getDate());
}

module.exports = {
    toAge: getAge,
    toDOB: getDOB
}