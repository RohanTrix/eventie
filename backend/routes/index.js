import express from 'express';
import eventsRoute from './events/index.js';
import usersRoute from './users/index.js';

const router = express.Router();

router.use('/events', eventsRoute);
router.use('/users', usersRoute);
router.get('/', (req, res) => {
    res.json({
        message: 'Hello World!',
        success: true,
    })
})

export default router;
