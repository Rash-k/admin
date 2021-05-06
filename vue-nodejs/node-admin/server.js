const express = require('express')
const bodyParse = require('body-parser')
const app = express()
const passport = require('passport')

app.use(require('cors')())
app.use(express.json())

//使用body-parser中间件
app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())
app.use(passport.initialize())

require('./plugins/db')(app)
require('./routers/api/users')(app)
require('./routers/api/profiles')(app)
require('./routers/api/customers')(app)
require('./routers/api/repairs')(app)
require('./routers/api/prices')(app)
require('./routers/api/maintains')(app)
require('./routers/api/complaint')(app)
require('./routers/api/appointment')(app)
//passport初始化

require('./config/passport')(passport)



app.listen(3000,()=>{
    console.log('http://localhost:3000')
})
