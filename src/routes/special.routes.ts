import { Router } from 'express';
import passport from 'passport';
const router = Router();

router.get(
    '/special',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json('You are logged in');
    }
);
export default router;
