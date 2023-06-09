import { ID } from 'appwrite';
import express from 'express';

const router = express.Router();


router.get('/', async (req, res) => {
    const {config, databases} = req.app.locals;
    try {
        const documents = await databases.listDocuments(config.DATABASE_ID, config.COLLECTION_ID);
        res.json(documents)
    } catch (error) {
            res.status(500).json({
                message: "Error while fetching event",
                success: false,
            })
    }
})


router.delete('/CheckedIn', async (req, res) => {
    const { QrCode } = req.body;
   const [userId, eventId ]  = QrCode.split('🔴');
    const {config, databases} = req.app.locals;

    const eventData = await databases.getDocument(config.DATABASE_ID, config.COLLECTION_ID, eventId);
    console.log(eventData);
    const participants = eventData.participants.filter((id) => id !== userId);
    const data =  {
        participants: [... new Set(participants)]
    }
    try {
        const response = await databases.updateDocument(config.DATABASE_ID, config.COLLECTION_ID, eventId, JSON.stringify(data));
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error while checking in for event",
            success: false,
        })
    }
})


router.get('/fetchTheQR', async (req, res) => {

    const {config, databases ,  avatars} = req.app.locals;
    const {userID ,  eventID } = req.body
    const Code = userID + "🔴" + eventID
    const promise = avatars.getQR(Code);

    promise.then(function (response) {
        console.log(Code);
        const src = 'data:image/png;base64,' + Buffer.from(response).toString('base64');
        res.send(src)
    }, function (error) {
        res.status(500).json({
            message: "Error while getting the qr image",
            success: false,
        })
    })
})


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const {config, databases} = req.app.locals;
    try {
        const document = await databases.getDocument(config.DATABASE_ID, config.COLLECTION_ID, id);
        res.json(document)
    } catch (error) {
        if (error.code === 404) {
            res.status(404).json({
                message: "Event not found",
                success: false,
            })
        } else {
            res.status(500).json({
                message: "Error while fetching event",
                success: false,
            })
        }
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { config, databases } = req.app.locals;
    try {
        const document = await databases.deleteDocument(config.DATABASE_ID, config.COLLECTION_ID, id);
        res.json(document);
    } catch (error) {
        if (error.code === 404) {
            res.json({});
        } else {
            res.status(500).json({
                message: "Error while deleting event",
                success: false,
            });
        }
    }
    try {
        // const imageFile = await storage.
    } catch (error) {

    }
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
    const {config, databases , avatars} = req.app.locals;

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

router.post('/unregister', async (req, res) => {
    const { userId, eventId } = req.body;
    const {config, databases} = req.app.locals;

    const eventData = await databases.getDocument(config.DATABASE_ID, config.COLLECTION_ID, eventId);
    console.log(eventData);
    const participants = eventData.participants.filter((id) => id !== userId);
    const data =  {
        participants: [... new Set(participants)]
    }
    try {
        const response = await databases.updateDocument(config.DATABASE_ID, config.COLLECTION_ID, eventId, JSON.stringify(data));
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error while unregistering the event",
            success: false,
        })
    }
})

export default router;
