const express=require("express");
const updatePass=express.Router();
const Signup=require("../model/signupSchema");
const bcrypt = require("bcryptjs");  

updatePass.put("/updatepassword",async(req,res)=>
{
    const {password,cpassword,email}=req.body;
    

 try{
    let regex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*(_|[^\w])).{8,20}$/;
    ;
    const valid = regex.test(password);
    if (!valid ) {
      res.status(400).json({ error: `*Password contains at least 8 characters and at most 20 characters.

*It contains at least one digit.

*It contains at least one upper case alphabet.

*It contains at least one lower case *alphabet.

*It contains at least one special character which includes !@#$%&*()-+=^.

*It doesn’t contain any white space.
 used this pattern`});
    }


    if (!email || !password || !cpassword) {
        res.status(400).json({ error: "All field Mandatory" });
    }
    if (password !== cpassword) {
        res.status(400).json({ error: "Password Mismatch" });
    } else
    {
        const salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(password,salt);
        const seccPass=await bcrypt.hash(cpassword,salt)
        const updatePassword= await Signup.findOneAndUpdate(

            email,
            {
                $set:
                {
                    password: secPass,
                    cpassword: seccPass,
                }
            },
            { new: true }
        )
        console.log(updatePassword)
        if(updatePassword)
            {
                success="true",
                res.status(200).json({success,message:"password Update Successfully!"})

            }else
            {
                res.status(401).json({message:"Invalid email ID"});
            }
    }
   
        
    
           
                
                
        

 }catch(error)
 {
    console.log(error)
 }

})
module.exports=updatePass;