import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export default function auth(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).json({message: "Unauthorized"});
    }

    const key = authHeader.startsWith ("Bearer ") ? authHeader.slice(7) : authHeader;

    if(key === secretKey){
        next();
    }else{
        res.status(401).json({message: "Unauthorized"});
    }
}
