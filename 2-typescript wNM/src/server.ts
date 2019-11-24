import express = require('express')

const app = express()
const port: string = process.env.PORT || '8080'

import { MetricsHandler } from './metrics'
app.get('/metrics.json', (req: any, res: any) => {
  MetricsHandler.get((err: Error | null, result?: any) => {
    if (err) {
      throw err
    }
    res.json(result)
  })
})

app.get('/', (req: any, res: any) => {
  res.write(
    '<div class="col-md-6 col-md-offset-3">' +
      '<h1>Home page</h1>' +
      '<div>' + 
        'Welcome to the home page of the second lab : express ! </br></br>' +
        'If you want to navigate to the page "hello.ejs", just add "/hello" inside the address :)' + 
      '</div>' +
    '</div>')
  res.end()
})

app.get('/hello', (req: any, res: any) => {
  res.write('<div class="col-md-6 col-md-offset-3">' +
  '<h1>Hello</h1>' +
  '<button class="btn btn-success" id="show-metrics">' +
    'Bring the metrics' +
  '</button>' +
  '<div id="metrics"></div>' +
'</div>' +
'<script>' +
  "$('#show-metrics').click((e) => {" +
    'e.preventDefault();' +
    '$.getJSON("/metrics.json", {}, (data) => {' +
      'const content = data.map(d => {' +
        "return 'timestamp: '+d.timestamp+', value: '+d.value+'';" +
      '})' +
      "$('#metrics').append(content.join('\n'));" +
    '});' +
  '})' +
'</script>')
  res.end()
})

app.listen(port, (err: Error) => {
  if (err) {
    throw err
  }
  console.log(`server is listening on port ${port}`)
})