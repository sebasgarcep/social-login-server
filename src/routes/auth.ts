import { User } from '@prisma/client';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import * as Session from '../controllers/session';
import { JWT_SECRET } from '../values';

const router = express.Router();

router.post('/google', passport.authenticate('google-id-token'), async (req, res) => {
    const session = await Session.getSessionByUser(req.user as User);
    const credentials = jwt.sign(session, JWT_SECRET);
    res.json({
        data: {
            scheme: 'Bearer',
            credentials,
            expiresAt: session.expiresAt,
        },
    });
});

export default router;
