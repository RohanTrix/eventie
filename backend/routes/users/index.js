import express from 'express';
import { Account, ID } from 'appwrite';
import { Query } from 'node-appwrite';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/me', async (req, res) => {
    try {
        const response = await req.app.locals.account.get();
        res.send(response);
    } catch (error) {
        if (error.code === 401) {
            res.status(401).json( {
                message: 'Unauthorized',
                success: false,
            })
        } else {
            console.error(error);
            res.status(500).json({
                message: 'Something went wrong',
                success: false,
            });
        }
    }
})

router.get('/events', async (req, res) => {
    const {config, databases} = req.app.locals;
    const { user } = req.query;
    console.log('user', user)
    try {
        const {documents: allDocuments} = await databases.listDocuments(
            config.DATABASE_ID,
            config.COLLECTION_ID,
        )
        const documents = allDocuments.filter(event => {
            return event.participants.includes(user)
        })
        res.json(documents)
    } catch (error) {
            console.error(error)
            res.status(500).json({
                message: "Error while fetching event",
                success: false,
            })
    }
})

router.post('/create', async (req, res) => {
    const id = ID.unique();
    const {email, password} = req.body;
    const userName = req.body.userName || email;
    const response = await req.app.locals.account.create(id, email, password, userName);
    res.send(response);
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const account = req.app.locals.account;
    try {
        const response = await account.createEmailSession(email, password)
        console.log(response)
        res.json(response);
    } catch (error) {
        if (error.code === 401) {
            res.status(401).json( {
                message: 'Incorrect email or password',
                success: false,
            })
        } else {
            console.error(error);
            res.status(500).json({
                message: 'Something went wrong',
                success: false,
            });
        }
    }
})

export default router;
