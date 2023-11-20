import express from 'express' 
import dotenv from 'dotenv'
import ingRouter from  './routes/ing.routes.js'
import recRouter from  './routes/rec.routes.js'

dotenv.config()

const app = express()

app.use(express.json());

const port = process.env.port

app.listen(port, () =>{
    console.log(`Servidor Levantado en el Puerto ${port}`)

app.use('/ing', ingRouter)
app.use('/rec', recRouter)

})