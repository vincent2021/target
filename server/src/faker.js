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

async function generateFakeUser() {    
    try {
        let newUser = await fetch(`https://randomuser.me/api/?nat=fr`)
        newUser = await newUser.json();
        newUser = newUser.results[0];
        const gender = newUser.gender;
        const firstName = newUser.name.first;
        const lastName = newUser.name.last;
        const pic = await fetch(`https://source.unsplash.com/random/?${gender}`);
        const default_pic = 'http://localhost:8000/upload/default.png';
        const pics_array = [`${pic.url}`, `${default_pic}`, `${default_pic}`, `${default_pic}`, `${default_pic}`];
        const fakeUser = { 
            user: {
                username: faker.internet.userName(firstName, lastName),
                firstname: firstName,
                lastname: lastName,
                gender: gender,
                dob: newUser.dob.date,
                email: faker.internet.email(firstName, lastName),
                password: newUser.login.password,
                user_pic: pics_array,
                city: newUser.location.city.charAt(0).toUpperCase() + newUser.location.city.substr(1),
                location: `{
                    "type": "Point",
                    "coordinates": [${newUser.location.coordinates.latitude}, ${newUser.location.coordinates.longitude}]
                }`,
        },};
        console.log(fakeUser);
        ret = db.addUser(fakeUser);
    } catch (err) {
        console.log(err);
    }
};

db.createDb();

for (let i = 0; i < 50; i++) {
    generateFakeUser();
}