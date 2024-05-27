export type DBType = {
    videos: any[]
}

export const db: DBType = {
    videos: [
        {
            "id": 1,
            "title": "string",
            "author": "string",
            "canBeDownloaded": true,
            "minAgeRestriction": null,
            "createdAt": "2024-05-25T06:53:17.302Z",
            "publicationDate": "2024-05-25T06:53:17.302Z",
            "availableResolutions": [
                "P144"
            ]
        }
    ]
}

export const setDB = (dataset?: Partial<DBType>) => {
    if(!dataset) {
        db.videos = []
        return
    }

    db.videos = dataset.videos || db.videos
}