import { Express } from 'express';

import authRouter from '../routes/auth';
import messageRouter from '../routes/message';

export default function(app: Express) {
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/message', messageRouter);
}