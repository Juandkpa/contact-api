import { Router } from 'express';
import * as Controller from './contact.controller';
import upload from '../../utils/multerConfig';
import { catchErrors } from '../../utils/errorHandler';
import { createValidations, updateValidations } from './contact.validation';

const router = Router();

router.get('/:id', catchErrors(Controller.get));
router.post('/', upload.single('profile_image'), createValidations, catchErrors(Controller.save));
router.put('/:id', upload.single('profile_image'), updateValidations, catchErrors(Controller.update));
router.delete('/:id', catchErrors(Controller.remove));
router.get('/', catchErrors(Controller.getByQuery));

export { router as default };
