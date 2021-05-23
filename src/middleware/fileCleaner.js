import { unlink } from "fs";

const fileCleaner = (err, { file }, res, next) => {
  if (!file) {
    next(err);
    return;
  }

  unlink(file.path, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("file removed");
  });
  next(err);
};

export { fileCleaner as default };
