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

router.post('/register', async (req, res) => {
    const { userId, eventId } = req.body;
    const {config, databases} = req.app.locals;

    const eventData = await databases.getDocument(config.DATABASE_ID, config.COLLECTION_ID, eventId);
    console.log(eventData);
    const participants = [...eventData.participants, userId];
    const data =  {
        participants: [... new Set(participants)]
    }
    try {
        const response = await databases.updateDocument(config.DATABASE_ID, config.COLLECTION_ID, eventId, JSON.stringify(data));
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error while registering for event",
            success: false,
        })
    }
})

export default router;
