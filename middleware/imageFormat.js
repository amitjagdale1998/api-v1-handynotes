const multer=require('multer');


const imageFormat = ( req,res) => {
    // Check if the file is an image and has a valid extension
   const file1=req.file;
   console.log(req.file);
    const allowedExtensions = ['.jpeg', '.jpg', '.webp', '.png'];
    const fileExtension = req.file.originalname.toLowerCase().substring(req.file.originalname.lastIndexOf('.'));

    if (allowedExtensions.includes(fileExtension)) {
      res.json("valid"); // Accept the file
    } else {
    //   cb(new Error('Only JPEG, JPG, WEBP, and PNG image files are allowed!'), false); // Reject the file
    res.status(400).json({error:"Only JPEG, JPG, WEBP, and PNG image files are allowed!"});
    }
  };
  module.exports=imageFormat