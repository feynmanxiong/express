const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

let comments = []
app.locals.comments = comments

app.use(morgan('dev')) //请求日志
// app.use(express.static('public'))//访问public目录下的静态资源
app.use('/static', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/comments', (req, res) => {
    res.render('comments/index')
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new')
})

app.post('/comments/new', (req, res) => {
    if(!req.body.comment) {
        res.status(400).send('Do you have something to say?')
        return 
    }
    comments.push({
        comment: req.body.comment,
        created_at: new Date()
    })
    console.log('comments')
    res.redirect('/comments')
})










app.listen(3000, () => {
    console.log('Listen port: 3000')
})