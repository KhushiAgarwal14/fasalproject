const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport=require('passport')
// const {isLoggedin}=require('../middleware.js')
// router.get('/home',(req,res)=>{
//     res.render('home');
// })
router.get('/signup' , (req,res)=>{
    res.render('auth/signup');
})

router.post('/signup',async(req,res)=>{
    let{username,email,password}=req.body;
    const user=new User({username,email});
    const newuser=await User.register(user,password)
    // res.redirect('/login');
    req.login(newuser,function(err){
if(err){return next(err)}
return res.redirect('/home')
    })
})


router.get('/login',(req,res)=>{
    res.render('auth/login');
})


router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true
}), (req, res, next) => {
    res.redirect('/home');
});
router.get('/logout',(req,res)=>{
    ()=>{
        req.logout();
    }
    res.redirect('/login');
})


// router.post('/login',(req,res)=>{
// passport.authenticate('local',{
//     successRedirect:'/home',
//     failureRedirect:'/login',
//     failureMessage:true,
// }),
// function(req,res){
//     res.redirect('/home')
// }
// })






module.exports = router;