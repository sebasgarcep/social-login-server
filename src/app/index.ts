import express, { Express } from 'express';

import error from './error';
import middleware from './middleware';
import passport from './passport';
import routes from './routes';

export default function createApp(): Express {
    const app = express();

    middleware(app);
    passport(app);
    routes(app);
    error(app);

    return app;
}