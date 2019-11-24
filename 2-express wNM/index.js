express = require('express')
metrics = require('./metrics')
app = express()

app.set('port', 1337)
app.set('views', __dirname + "/view")
app.set('view engine', 'ejs');

app.get(
    '/hello', 
    (req, res) => res.render('hello.ejs')
  )

app.get(
  '/',
  (req, res) => res.render('home.ejs')
)

app.get('/metrics.json', (req, res) => {
  metrics.get((err, data) => {
    if(err) throw err
    res.status(200).json(data)
  })
})

path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)