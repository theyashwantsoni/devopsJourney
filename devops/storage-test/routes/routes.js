const router = require( 'express' ).Router();
var multer = require('multer');
const fs = require('fs');
// require('../lib/db-ops')();
var maxSize = 1 * 1000 * 1000;
var filearray = [];
var Timestamp;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Images');
    },
    filename: function (req, file, cb) {
        Timestamp = Date.now();
        filearray.push({filename: Timestamp +file.originalname.replace(/\s/g, "") });
        cb(null, Timestamp + file.originalname.replace(/\s/g, ""))
    }
})

const fileFilter = function (req, file, callback) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
var upload = multer({ storage: storage, fileFilter: fileFilter }).array('attachedimage',10)
router.post('/uploadimages', function(req, res, next) { 
    filearray = [];
    upload(req,res,function(err) {
        if(err) {
            return res.send({status : 403,message:"File type not acceptable."})
        }
        else{
            return res.send({status : 200,files:filearray});
        }
    });
});
router.get('/', function(req, res, next) { 
    return res.send({status : 200,body:{ping:'pong'}});
});
module.exports = router ;


