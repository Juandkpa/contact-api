import multer from 'multer';
import path from 'path';
import {  MediaTypeError } from './errorHandler';


const storage = multer.diskStorage({
  destination: 'public/images/',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const baseName = file.originalname.replace(extension, '');
    cb(null, `${baseName}-${uniqueSuffix}${extension}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, { mimetype, fieldname }, cb) => {
    const isValidImage = mimetype.includes('image/');
    if (!isValidImage) {
      return cb(new MediaTypeError([{ field: fieldname, msg: 'You must upload an image' }]));
    }
    cb(null, isValidImage);
  },
});

export { upload as default };
