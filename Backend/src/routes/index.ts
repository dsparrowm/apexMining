import { Router } from 'express';
import dashboardRouter from "./dashboard"

const router = Router();

router.use(dashboardRouter);

export default router;