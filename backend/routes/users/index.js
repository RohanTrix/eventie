import express from 'express';
import { Account, ID } from 'appwrite';

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
