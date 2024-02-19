import express from 'express'
import cors from 'cors'
import { getPgVersion } from './db.js';
import taskfile from './routes/taskroutes.js'

getPgVersion()
const app = express();
const port = 5000
app.use(express.json())
app.use(cors())

//Routes
app.use("/api/tasks", taskfile)


app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`)
})