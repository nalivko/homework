import { Request, Response } from "express";

export type ParamType = {
    id: string
}

export type BodyType = {
    id: number,
    title: string,
    availableResolutions: string[]
}

export type QueryType = {
    search?: string
}

export type OutputType = void