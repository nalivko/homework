import { Request, Response } from "express";
import { db } from "../db/db";
import { ParamType } from "./some";

export const deleteVideoController = (req: Request<ParamType>, res: Response) => {

    if(!db.videos.find(video => video.id === +req.params.id)) {
        res.sendStatus(404)
    }

    db.videos = db.videos.filter(video => video.id !== +req.params.id)

    res.sendStatus(204)
}