import express from 'express';
import passport from 'passport';

import * as Message from '../controllers/message';

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', async (req, res) => {
    const message = await Message.getRandomMessage();
    res.json({
        data: { message },
    });
});

export default router;
