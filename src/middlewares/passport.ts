import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import config from '../config';
import User from '../models/user';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
};
export default new Strategy(opts, (jwtPayload, done) => {
    try {
        const user = User.findById(jwtPayload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log(error);
        return done(error, false);
    }
});
