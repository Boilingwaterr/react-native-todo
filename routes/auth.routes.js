const {Router}  = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');    
const {check, validationResult} = require('express-validator');
const config = require('config');
const router = Router();

router.post('/register',[
    check('email', 'Email incorrect.').isEmail(),
    check('password', 'Password length should be 6 characters or more.').isLength({min: 6}),
    check('firstName', 'Enter your first name.').exists(),
    check('lastName', 'Enter your last name.').exists()
 ], async(req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: 'Data is incorrect.'});
        }

        const {email, password, firstName, lastName} = req.body;
        
        const candidate = await User.findOne({email});
        if (!!candidate) {
            return res.status(400).json({message: "User already exist."});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword, firstName, lastName });

        await user.save();

        res.status(201).json({message: "User has been created."})
    } catch (e) {
        res.status(500).json({message: "Oops, Something went wrong."});
    }
});

router.post('/login', [
    check('email', 'Pass correct email.').normalizeEmail().isEmail(),
    check('password', 'Enter password.').exists()
], async(req, res) => {
    try {
        const errors = validationResult(req);    
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: 'Data is incorrect.'});
        }

        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: "This combination of password and email is not registered in the system."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "This combination of password and email is not registered in the system."});
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '24h'}  
        );

        res.json({
            token,
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        });
    } catch (e) {
        res.status(500).json({message: "Oops, Something went wrong."});
    }
});

module.exports = router;