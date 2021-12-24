import createDebug from 'debug';
import { Express } from 'express';
import passport, { Strategy } from 'passport';
import GoogleTokenStrategy from 'passport-google-id-token';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import * as User from '../controllers/user';
import { Session } from '../types';
import { GOOGLE_CLIENT_ID, JWT_SECRET } from '../values';

const debug = createDebug('social-login-server:app:passport');

function getGoogleTokenStrategy(): Strategy {
    return new GoogleTokenStrategy({
        clientID: GOOGLE_CLIENT_ID,
    }, (parsedToken, googleId, done) => {
        debug(`Parsed Token: ${JSON.stringify(parsedToken, null, 4)}`);
        debug(`Google ID: ${googleId}`);
        User.getOrCreateUserByGoogleId(googleId)
            .then(user => done(null, user))
            .catch(err => done(err));
    });
}

function getJWTStrategy(): Strategy {
    return new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
    }, (payload: Session, done) => {
        debug(`JWT Payload: ${JSON.stringify(payload, null, 4)}`);

        if (Date.now() >= payload.expiresAt) {
            done(new Error());
            return;
        }

        done(null, payload);
    });
}

export default function(app: Express) {
    app.use(passport.initialize());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.use(getGoogleTokenStrategy());
    passport.use(getJWTStrategy());
}