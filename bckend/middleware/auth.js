const jwt =require("jsonwebtoken");

const authenticate = (req, res, next)=> {
  
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }
    jwt.verify(token, process.env.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
  
     
      req.user = decoded;
      next();
    });
  }

module.exports=authenticate