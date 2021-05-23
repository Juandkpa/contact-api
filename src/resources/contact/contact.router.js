import { Router } from "express";
import * as Controller from "./contact.controller";
import multer from "multer";
import path from "path";
import { catchErrors } from "../../utils/errorHandler";
import checkValidations from "./contact.validation";

const storage = multer.diskStorage({
  destination: "public/images/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const baseName = file.originalname.replace(extension, "");
    cb(null, `${baseName}-${uniqueSuffix}${extension}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, file.mimetype.includes("image/"));
  },
});

const router = Router();

router.get("/:id", Controller.get);

router.post(
  "/",
  upload.single("profile_image"),
  checkValidations,
  catchErrors(Controller.save)
);
router.put("/:id", Controller.update);
router.delete("/", Controller.remove);

export { router as default };
