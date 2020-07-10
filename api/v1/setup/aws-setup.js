const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

/**
 * Setup for the AWS S3 Bucket (tech-corner)
 */
const setup = new aws.S3({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY,
    Bucket: process.env.AWS_BUCKET_NAME
})

/**
 * Setup Multer S3
 */
const storage = multerS3({
    s3: setup,
    bucket: 'tech-corner',
    acl: 'public-read',
    key: (req, file, cb) => {
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
});

/**
 * Check if the received file matches the right format of an image 
 */
const checkFileType = (file, cb) => {
    // Allowed file extention types
    const fileTypes = /jpeg|jpg|png/;

    // Check the extention of the received file
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    // Check mime type
    const mimetype = fileTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Submitted files are not images');
    }
}

/**
 * Upload multiple images at once 
 * This function is used in routes to upload images in formData with name 'itemImage'
*/

const uploadImages = multer({
    storage: storage,
    limits: { fileSize: 2000000 }, // 2 MB size limit for each file
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).array('itemImage', 4) // Maximum 4 images per post  

module.exports = { setup, uploadImages };

