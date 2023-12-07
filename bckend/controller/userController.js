const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const User=require("../models/userModel")

const signin= async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
   
      const token =await jwt.sign({ email: user.email }, process.env.secret);
  
      res.json({ message: 'Sign-in successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Sign-in failed.',error });
    }
  }


  const signup = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
      
     const userExists =await User.findOne({email})
     if(userExists){
      return res.status(400).json({ error: 'user already exists' });
     }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Password and confirm password do not match.' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword,confirmPassword:hashedPassword });
        await newUser.save();

        res.json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user.' });
    }
};


module.exports={
    signin,
    signup
}