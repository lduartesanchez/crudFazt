const mongoose = require('mongoose')

const { NOTES_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `${NOTES_APP_MONGODB_DATABASE}`

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Database is conected'))
    .catch(err => console.log(err))

    //