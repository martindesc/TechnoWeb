    import {LevelDB} from './leveldb'
    import WriteStream from 'level-ws'

    export class Metric {
    public timestamp: string
    public value: number

    constructor(ts: string, v: number) {
        this.timestamp = ts
        this.value = v
    }
    }

    export class MetricsHandler {

    private db: any 

    constructor(dbPath: string) {
        this.db = LevelDB.open("./db/metrics")
    }

    public save(key: number, metrics: Metric[], callback: (error: Error | null) => void) {
        const stream = WriteStream(this.db)
        stream.on('error', callback)
        stream.on('close', callback)
        metrics.forEach((m: Metric) => {
        stream.write({ key: `metric:${key}:${m.value}`, value: m.value })
        })
        stream.end()
    }

    public getAll(callback: (error: Error | null, result:any) => void) {
        let metrics: Metric[] = []
        this.db.createReadStream()
            .on('data', function (data) {
                console.log(data.key.split(':'))
                const timestamp = data.key.split(':')[2]
                let metric: Metric = new Metric(timestamp, data.value) 
                metrics.push(metric)
            })
            .on('error', function (err) {
                console.log('error', err)
                callback(err, null)
            })
            .on('close', function () {
                console.log('Stream closed')
            })
            .on('end', function () {
                console.log('Stream ended')
                callback(null, metrics)
            })
    }

   public getOne(person, callback: (error: Error | null, result:any) => void) {
        let metrics: Metric[] = []
        const stream = this.db.createReadStream()
            .on('data', function (data) {
                if(person = data.key){
                    console.log('Get One')
                    console.log(data.key, '=', data.value)
                    metrics.push(data)
                    stream.end()
                }
            })
            .on('error', function (err) {
                console.log('error', err)
                callback(err, null)
            })
            .on('close', function () {
                console.log('Stream closed')
            })
            .on('end', function () {
                console.log('Stream ended')
                callback(null, metrics)
            })
    }

    public deleteOne(callback: (error: Error | null, result:any) => void) {
        let metrics: Metric[] = []
        this.db.createReadStream()
            .on('data', function (data) {
                console.log(data.key, '=', data.value)
                metrics.push(data)
            })
            .on('error', function (err) {
                console.log('error', err)
                callback(err, null)
            })
            .on('close', function () {
                console.log('Stream closed')
            })
            .on('end', function () {
                console.log('Stream ended')
                callback(null, metrics)
            })
    }

    static get(callback: (error: Error | null, result?: Metric[]) => void) {
        const result = [
        new Metric('2013-11-04 14:00 UTC', 12),
        new Metric('2013-11-04 14:30 UTC', 15)
        ]
        callback(null, result)
    }
    }
