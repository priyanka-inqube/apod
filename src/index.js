const express = require('express')
const app = express();
require('dotenv').config()
require('./db/config')
const path = require('path')
let publicPath = path.join(__dirname,'../uploads')
let viewsPath = path.join(__dirname,'/views') 
let partialsPath = path.join(__dirname,'/views/partials')
const astroRoute = require('./routes/Astro')

console.log(publicPath)
app.use('/uploads',express.static(publicPath))
app.set('view engine', 'ejs');
app.set('views', viewsPath)

app.use(express.json())
app.use(express.urlencoded())

app.use('/astro' ,astroRoute)

const port = process.env.PORT || 3001

//routes
app.get('',(req,res)=>{
    res.send('Hello World')
})

app.use((err, req, res, next) => {
    console.log('ERROR---------',err)
      res.status(err.status || 500).send({
        data: {},
        message: err.message ||'Something Went Wrong!',
        success: false,
        status: err.status || 500
      })
  })

// wildcard route
app.all('/*',(req,res)=>{
    res.send('Page Not Found')
})

app.listen(port,()=>{
console.log(`Server started at port ${port}`)
})
