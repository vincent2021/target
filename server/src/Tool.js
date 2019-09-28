function getAge(date) {
    const dn = new Date(date)
    const auj = new Date();
    let age_now = (auj.getFullYear() - dn.getFullYear());
    var m = auj.getMonth() - dn.getMonth();
    if (m < 0 || (m === 0 && auj.getDate() < dn.getDate()))
        age_now--;
    return age_now;
}

function toDOB(age) {
    let dob = new Date
    dob.setFullYear(dob.getFullYear() - age);
    return (dob.toISOString());
}

module.exports = {
    getAge: getAge,
    toDOB: toDOB
}