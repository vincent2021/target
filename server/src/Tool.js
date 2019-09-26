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
    const date = new Date();
    const age_ms = age * 365 * 24 * 60 * 60 * 100;
    console.log("age" + age_ms);
    console.log("date" + date);
    const dob = date - age_ms;
    console.log(dob);
    return (dob);
}

module.exports = {
    toAge: getAge,
    toDOB: getDOB
}