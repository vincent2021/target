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
        const fakeUser = { 
            user: {
                username: faker.internet.userName(firstName, lastName),
                firstname: firstName,
                lastname: lastName,
                gender: gender,
                dob: newUser.dob.date,
                email: faker.internet.email(firstName, lastName),
                password: newUser.login.password,
                user_pic: pic.url,
                city: newUser.location.city.charAt(0).toUpperCase() + newUser.location.city.substr(1)
        },};
        console.log(fakeUser);
        db.addUser(fakeUser);
    } catch (err) {
        console.log(err);
    }
};

for (let i = 0; i < 50; i++) {
    generateFakeUser();
}