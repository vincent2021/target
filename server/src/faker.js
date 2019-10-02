const db = require("./db");
const faker = require('faker');
const fetch = require('node-fetch');

const tags = [
    "cool",
    "intelligent",
    "passionate",
    "affectionate",
    "ambitious",
    "hipster",
    "creative",
    "geek"
  ];

faker.locale = "fr";

async function generateLocation(city) {

    let geocode = await fetch(`https://geocode.xyz/${city}?json=1`)
    .then(res => res.json()).then(jsonData => {return(jsonData)});
    if (geocode.error.code == '008' || geocode.error.code == '006') {
        geocode = {
            latt: '48.86666',
            longt: '2.33333'
        };
    }
    console.log(geocode);
    return (geocode);
}



async function generateFakeUser(test_user) {    
    try {
        let newUser = await fetch(`https://randomuser.me/api/?nat=fr`)
        newUser = await newUser.json();
        newUser = newUser.results[0];
        const gender = newUser.gender;
        let target = '';
        if (gender === "male") {
           target = "female";
        } else {
           target = "male";
        }
        const firstName = newUser.name.first;
        const lastName = newUser.name.last;
        const pic = await fetch(`https://source.unsplash.com/random/?${gender}`);
        const pics_array = [`${pic.url}`];
        const city = newUser.location.city.charAt(0).toUpperCase() + newUser.location.city.substr(1);
        const geocode = await generateLocation();
        console.log(geocode);
        let login;
        if (test_user !== 'random') {
            login = test_user;
        } else {
            login = faker.internet.userName(firstName, lastName);
        }
        const fakeUser = { 
            user: {
                username: login,
                firstname: firstName,
                lastname: lastName,
                gender: gender,
                dob: newUser.dob.date,
                email: faker.internet.email(firstName, lastName),
                password: 'test42',
                user_pic: pics_array,
                city: city,
                location: `{
                    "type": "Point",
                    "coordinates": [${geocode.latt}, ${geocode.longt}]
                }`,
                score: 50,
                target: target,
                text: 'Loreum Ipsum'
        },};
        ret = db.addUser(fakeUser);
    } catch (err) {
        console.log(err);
    }
};

//Pour supprimer la BD au moment du seed
//db.createDb();

//Generate a user with specific login
//generateFakeUser('vincent');
//generateFakeUser('felix');
//generateFakeUser('test');

for (let i = 0; i < 150 ; i++) {
    generateFakeUser('random');
}