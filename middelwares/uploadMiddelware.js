const multer = require("multer");
const fs = require('fs');
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filepath =file.fieldname + "-" + uniqueSuffix+path.extname(file.originalname)
    req.profilepath = filepath;
    cb(null, filepath);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
