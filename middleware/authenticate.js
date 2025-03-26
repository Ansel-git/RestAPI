import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export default function auth(req,res,next){
    const key = req.headers.authorization;
    if(!key){
        res.status(401).json({message: "Unauthorized"});
    }

    if(key === secretKey){
        next();
    }else{
        res.status(401).json({message: "Unauthorized"});
    }
}
