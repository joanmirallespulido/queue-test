import { Router } from 'express';
import { createQueue } from '../controllers/queue.controllers';

const router = Router();


router.get('/', createQueue);



export default router;