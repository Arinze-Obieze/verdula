import multer from 'multer'
import multerS3 from 'multer-s3'
import AWS from './aws-config'


const s3 = new AWS.S3()

const upload = multer({
    storage:multerS3({
        s3:s3,
        bucket:  'verdula',
        key: function (req,file,cb){
            cb(null, 'images/'+ Date.now().toString()+'-'+file.originalname)
        }
    })
})

export default upload;
