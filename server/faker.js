const db = require("./src/db");
const faker = require('faker');

faker.locale = "en";

for (let i = 0; i < 50; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const fakeUser = { 
        user: {
            username: faker.internet.userName(firstName, lastName),
            firstname: firstName,
            lastname: lastName,
            email: faker.internet.email(firstName, lastName),
            password: faker.internet.password(),
            user_pic: faker.internet.avatar()
    },};
    console.log(fakeUser);
    db.addUser(fakeUser);
}