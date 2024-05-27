import {req} from './test-helpers'
import {SETTINGS} from '../src/settings'
import { db, setDB } from '../src/db/db'

import {dataset1} from './datasets'

describe('/videos', () => {

    // GET /videos
    it('should be not empty array', async () => {

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200, [db.videos[0]])

    })

    it('should be empty array', async () => {

        setDB()

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200, [])

        console.log(res.body);
        
    })

    // POST /videos
    it('should not create video with incorrect input data', async () => {
        const res = await req
            .post('/api/videos')
            .send({
                "title": "",
                "author": "",
                "availableResolutions": []
            })
            .expect(400, {
                "errorsMessages": [
                  {
                    "message": "error!!!",
                    "field": "title"
                  },
                  {
                    "message": "error!!!",
                    "field": "author"
                  }
                ]
              })
    })

    // it('should create video with correct input data', async () => {

    //     const data = {
    //         "title": "test title",
    //         "author": "test author",
    //         "availableResolutions": [
    //             "P144"
    //         ]
    //     }

    //     const res = await req
    //         .post('/api/videos')
    //         .send(data)
    //         .expect(201)

    //         expect(res.body).toEqual([])
    // })

    // GET /videos/:id
    // it('get product by id with correct id', async () => {
    //     // await req
    //     //     .get('')
    //     //     .expect('')
    // })

    // it('get product by id with incorrect id - 404', async () => {})

    // PUT /videos/:id
    // it('should not update video with incorrect id - 400', async () => {})

    // it('should not update video with correct id and incorrect input data', async () => {})

    // it('should update video with correct id and correct input data', async () => {})

    // DELETE /videos/:id
    // it('should not delete video with incorrect id', async () => {})

    // it('should delete video with correct id', async () => {})

})