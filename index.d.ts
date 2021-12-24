declare module "passport-google-id-token" {
    import { Strategy } from "passport";
    
    type GoogleTokenStrategyOptions = {
        clientID?: string,
    };

    type DoneFunction = (err: Error | null, user?: any) => any;

    type GoogleTokenStrategyCallback = (parsedToken: any, googleId: string, done: DoneFunction) => any;

    export default class GoogleTokenStrategy extends Strategy {
        constructor(options: GoogleTokenStrategyOptions, callback: GoogleTokenStrategyCallback);
    }
}