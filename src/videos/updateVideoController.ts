import { Request, Response } from "express";
import { db } from "../db/db";
import { OutputErrorsType } from "../input-output-types/output-errors-type"
import { UpdateVideoType, Resolutions } from "../input-output-types/video-types"
import { ParamType } from "./some";

const inputValidation = (video: UpdateVideoType) => {

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

    if(!video.canBeDownloaded || typeof video.canBeDownloaded !== 'boolean') {
        errors.errorsMessages.push({
            message: 'error!!!',
            field: 'canBeDownloaded'
        })
    }

    if(!video.minAgeRestriction || (video.minAgeRestriction > 18 || video.minAgeRestriction < 1)) {
        errors.errorsMessages.push({
            message: 'error!!!',
            field: 'minAgeRestriction'
        })
    }
    
    const isDateISOstring = () => {
        return video.publicationDate === new Date(Date.parse(video.publicationDate)).toISOString()
    }
    if (!isDateISOstring()) {
        errors.errorsMessages.push({
            message: 'error!!!',
            field: 'publicationDate'
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

export const updateVideoController = (req: Request<ParamType>, res: Response) => {

    // res.send(req.body)
    // return
    let video = db.videos.find(video => video.id === +req.params.id)
    console.log(+req.params.id);
    

    if(!video) {
        res.sendStatus(404)
    }

    const errors = inputValidation(req.body)
    
    if (errors.errorsMessages.length) {
        res.status(400).json(errors)
        return
    }

    
    // video.title = req.body.title
    // video.author = req.body.author
    // video.availableResolutions = req.body.availableResolutions
    // video.canBeDownloaded = req.body.canBeDownloaded
    // video.minAgeRestriction = req.body.minAgeRestriction
    // video.publicationDate = req.body.publicationDate

    // const upadtedVideo = {...video, ...req.body }
    // video = 
    // res.send(db.videos)
    // return

    video = Object.assign(video, req.body);

    res.sendStatus(204)
}