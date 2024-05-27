import { Request, Response } from "express"
import { db } from "../db/db"
import { OutputErrorsType } from "../input-output-types/output-errors-type"
import { InputVideoType, Resolutions } from "../input-output-types/video-types"

const inputValidation = (video: InputVideoType) => {

    const errors: OutputErrorsType = {
        errorsMessages: []
    }

    if(!video.title) {
        errors.errorsMessages.push({
            message: 'error!!!',
            field: 'title'
        })
    }

    if(video.title && video.title.length > 40) {
        errors.errorsMessages.push({
            message: 'error!!! title must be no more than 40 characters',
            field: 'title'
        })
    }

    if(!video.author) {
        errors.errorsMessages.push({
            message: 'error!!!',
            field: 'author'
        })
    }

    if(video.author && video.author.length > 20) {
        errors.errorsMessages.push({
            message: 'error!!! author must be no more than 20 characters',
            field: 'author'
        })
    }

    const notValidAvailableResolution = !!video.availableResolutions.find(r => !Resolutions[r])

    if(!Array.isArray(video.availableResolutions) || notValidAvailableResolution) {
        errors.errorsMessages.push({
            message: 'error!!!',
            field: 'availableResolutions'
        })
    }

    return errors;
}

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<any /*OutputVideoType*/ | OutputErrorsType>) => {

    // res.send(!!req.body.availableResolutions.find(r => !Resolutions[r]))
    // return
    const errors = inputValidation(req.body)
    
    if (errors.errorsMessages.length) {
        res.status(400).json(errors)
        return
    }

    const date = new Date();
    const pubDate = new Date();
    pubDate.setDate(date.getDate() + 1);

    const newVideo = {
        ...req.body,
        id: Date.now() + Math.random(),
        // author: 'a' + Date.now() + Math.random(),
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: date.toISOString(),
        publicationDate: pubDate.toISOString(),
    };

    db.videos = [...db.videos, newVideo]

    res.status(201).json(newVideo)
}