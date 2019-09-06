const db = require("./src/db");
const faker = require('faker');
const axios = require('axios');

faker.locale = "fr";



for (let i = 0; i < 50; i++) {
    const gender = "female";
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    let picture;
    axios.get(`https://images.unsplash.com/?gender=${gender}`).then((res, req) => {
        picture = res.body;});
    const fakeUser = { 
        user: {
            username: faker.internet.userName(firstName, lastName),
            firstname: firstName,
            gender: gender,
            email: faker.internet.email(firstName, lastName),
            password: faker.internet.password(),
            user_pic: picture
    },};
    console.log(fakeUser);
    db.addUser(fakeUser);
}