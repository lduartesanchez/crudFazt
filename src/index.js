require('dotenv').config();

const app = require('./server')
require('./database')

app.listen(app.get('port'), () =>{
    console.log('Server listen on port', app.get('port'))
})
