import { Router, Request, Response } from 'express';
import createNewUser from '../handlers/authentication/createUser';
import signin from '../handlers/authentication/signing';

const router = new Router();

router.post('/signup', createNewUser);
router.post('/signin', signin);

export default router;