import { Router } from "express";
import * as Controller from "./contact.controller";
import multer from "multer";
import path from "path";
import { catchErrors, ValidationError } from "../../utils/errorHandler";
import { createValidations, updateValidations } from "./contact.validation";

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
  fileFilter: (req, { mimetype, fieldname }, cb) => {
    const isValidImage = mimetype.includes("image/");
    if (!isValidImage) {
      return cb(
        new ValidationError([
          { field: fieldname, msg: "You must upload an image" },
        ])
      );
    }
    cb(null, isValidImage);
  },
});

const router = Router();

router.get("/:id", catchErrors(Controller.get));
router.post(
  "/",
  upload.single("profile_image"),
  createValidations,
  catchErrors(Controller.save)
);
router.put(
  "/:id",
  upload.single("profile_image"),
  updateValidations,
  catchErrors(Controller.update)
);
router.delete("/:id", catchErrors(Controller.remove));
router.get("/", catchErrors(Controller.getByQuery));

export { router as default };
