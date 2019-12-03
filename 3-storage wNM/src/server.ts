    import express = require('express')
    import { MetricsHandler } from './metrics'
    import path = require('path')
    import bodyparser = require('body-parser')

    const app = express()
    const port: string = process.env.PORT || '8082'
    const dbMet: MetricsHandler = new MetricsHandler('./db/metrics')

    app.use(express.static(path.join(__dirname, '/../public')))

    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded())

    app.set('views', __dirname + "/../views")
    app.set('view engine', 'ejs');

    app.get('/', (req: any, res: any) => {
    res.write('Hello world')
    res.end()
    })

    app.get('/hello/:name', (req: any, res: any) => {
    res.render('hello.ejs', {name: req.params.name})
    })

    app.get('/metrics.json', (req: any, res: any) => {
    MetricsHandler.get((err: Error | null, result?: any) => {
        if (err) {
        throw err
        }
        res.json(result)
    })
    })

    app.listen(port, (err: Error) => {
    if (err) {
        throw err
    }
    console.log(`Server is running on http://localhost:${port}`)
    })

    app.post('/metrics/:id', (req: any, res: any) => {
    dbMet.save(req.params.id, req.body, (err: Error | null) => {
        if (err) throw err
        res.status(200).send()
    })
    })

    app.get('/metrics/', (req: any, res: any) => {
    dbMet.getAll( (err: Error | null, result: any) => {
        if (err) throw err
        res.json(result)
    })
    res.end;
    })

    app.delete('/metrics/:id', (req: any, res: any) => {
        dbMet.deleteOne( (err: Error | null, result: any) => {
            if (err) throw err
            res.json(result)
        })
        res.end;
    })
