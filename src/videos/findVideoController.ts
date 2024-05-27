import { Request, Response } from "express"
import { db } from "../db/db"
import { ParamType } from "./some"

export const findVideoController = (req: Request<ParamType>, res: Response) => {

    const videoId = req.params.id

    const video = db.videos.find(video => video.id === +videoId)

    if(!video) {
        res.sendStatus(404)
        return
    }

    res.status(200).json(video)
}