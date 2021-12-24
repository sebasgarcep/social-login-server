import createDebug from 'debug';
import { ErrorRequestHandler, Express } from 'express';
import createError from 'http-errors';

const debug = createDebug('social-login-server:error');

export default function(app: Express) {
    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(createError(404));
    });
    
    // error handler
    app.use(((err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
        // render the error page
        res.sendStatus(err.status || 500);
    
        debug(err);
    }) as ErrorRequestHandler);
}