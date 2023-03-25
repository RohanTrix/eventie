import { ID } from 'appwrite';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
})

router.post('/create', async (req, res) => {
    const { imgUrl, title, datetime, details } = req.body;
    const {config, databases} = req.app.locals;
    const documentId = ID.unique();
    const data = {
        name: title,
        imageUrl: imgUrl,
        datetime,
        details,
    }
    const document = await databases.createDocument(config.DATABASE_ID, config.COLLECTION_ID, documentId, JSON.stringify(data));
    res.send(document)

})

export default router;
