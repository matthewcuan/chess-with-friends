import dotenv from 'dotenv'
import app from "./server.js"
import mongodb from "mongodb"
import UsersDAO from "./dao/usersDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient
const chess_username = process.env.CHESS_ID
const chess_password = process.env.CHESS_KEY
const uri = `mongodb+srv://${chess_username}:${chess_password}@cluster0.mqza9mv.mongodb.net/?retryWrites=true&w=majority`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await UsersDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})

