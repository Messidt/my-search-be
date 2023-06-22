import { Router } from 'express';
import dictionariesController from '../controllers/dictionaries';

const router = Router();

router.get('/', dictionariesController.getCountries);

export default router;