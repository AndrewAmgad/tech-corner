const mongoose = require('mongoose');

// mongodb connection
mongoose.connect(
    process.env.DB_LINK,
    {useNewUrlParser: true, useFindAndModify: false, autoIndex: false, useUnifiedTopology: true}
).then(() => {
    console.log("MongoDB Connected")
}).catch(error => console.log(error));

mongoose.Promise = global.Promise;
