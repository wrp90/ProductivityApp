const mongoose = require("mongoose");
const db = require("../models");


mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/productivityapp"
);

const notesSeed = [
    {
        title: "The Dead Zone",
        postDate: 11 / 15 / 2021,
        text:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",

    },
    {
        title: "Lord of the Flies",
        postDate: 3 / 8 / 2020,
        text:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English",

    },
    {
        title: "The Catcher in the Rye",
        postDate: 10 / 28 / 2021,
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged'
    }
];

const userSeed= [
    {
        username: "MasterKeef",
        email: "masterkeef34@yahoo.com",
        password: "password123"
    },
    {
        username: "YoDirt",
        email: "yodirt@yahoo.com",
        password: "password333"
    }
]

db.Note
    .remove({})
    .then(() => db.Note.collection.insertMany(notesSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
});

db.User
    .remove({})
    .then(() => db.User.collection.insertMany(userSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
});


