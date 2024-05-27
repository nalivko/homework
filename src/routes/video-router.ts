import { Router } from "express";
import { getVideosController } from "../videos/getVideosController"
import { createVideoController } from "../videos/createVideoController"
import { findVideoController } from "../videos/findVideoController";
import { deleteVideoController } from "../videos/deleteVideoController";
import { updateVideoController } from "../videos/updateVideoController";

export const videoRouter = Router({})

videoRouter.get('/', getVideosController)
videoRouter.get('/:id', findVideoController)
videoRouter.post('/', createVideoController)
videoRouter.put('/:id', updateVideoController)
videoRouter.delete('/:id', deleteVideoController)