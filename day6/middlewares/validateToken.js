export default (req,res,next) => {
    const token = req.headers.token;
    if(token && token === "abc"){
        console.log("validated");
        next();
    }else{
        console.log("could not validate");
        res.status(403).send({success:false, message: "invalid API token"});
    }
};
