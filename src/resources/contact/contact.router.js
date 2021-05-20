import { Router } from "express";
import * as Controller from './contact.controller';
//import { catchErrors } from '../../utils/errorHandler';

const router = Router();

router.get("/:id", Controller.get);
router.post("/", Controller.save);
router.put("/:id", Controller.update);
router.delete("/", Controller.remove);

export { router as default };
