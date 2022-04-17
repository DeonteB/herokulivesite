import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import User from '../Models/user';
import {GenerateToken, UserDisplayName } from '../Util/index';

// display pages functions
export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
      return res.render('index', 
        { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }
    return res.redirect('/contact-list');
}
// display pages functions

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user){
        return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req) });
       }
      return res.redirect('/contact-list');
}
///////////////////////////////
export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void
{
    passport.authenticate('local', function(err, user,info)
    {
     // are there sever errors
     if(err){
       console.error(err);
       res.end(err);
 
     }
     if(!user)
     {
       req.flash('loginMessage', 'Authentication Error');
       return res.redirect('/login');
     }
     req.login(user, function(err)
     {
       if(err){
         console.error(err);
         res.end(err);
       }
       const authToken = GenerateToken(user);
       return res.redirect('/contact-list');
     });
    })(req, res, next);
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    let newUser = new User 
    ({
        username: req.body.username,
        Emailaddress: req.body.emailAddress,
        DisplayName: req.body.firstname + "" + req.body.lastName
    })
  
    User.register(newUser, req.body.password, function(err)
    {
      if(err)
      {
        if(err.name == "UserExistsError")
        {
          console.error('error: User Already Exists!');
          req.flash('registerMessage', 'Registration Error');
        }
        console.error(err.name); // other error
        req.flash('registerMessage', 'Server Error');
        return res.redirect('/register');
      }
  
      return passport.authenticate('local')(req,res,function()
      {
        return res.redirect('/contact-list');
      })
    })
}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
  req.logOut();

  res.redirect('/login');
}