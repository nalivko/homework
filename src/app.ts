import express from "express"
import cors from "cors"
import { deleteAllDataController } from "./videos/deleteAllDataController"
import { videoRouter } from "./routes/video-router"

export const app = express()
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.status(200).json({version: "1.0"})
})

app.delete('/api/testing/all-data', deleteAllDataController)

app.use('/api/videos', videoRouter)