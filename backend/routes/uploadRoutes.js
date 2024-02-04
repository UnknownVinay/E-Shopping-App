import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); //null for error
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const fileType = /jpg|png|jpeg/;
  const extname = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileType.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Image Only");
  }
};

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({ message: "Image Uploaded", image: `${req.file.path}` });
});

export default router;
