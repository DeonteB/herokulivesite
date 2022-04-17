import express, {Request, Response, NextFunction }  from "express";
import jwt from 'jsonwebtoken';
import * as DBConfig from '../Config/db';
//convenice 
export function UserDisplayName(req: Request): string
{
    if(req.user)
    {
        let user = req.user as UserDocument;
        return user.DisplayName.toString();
    }
    return '';

}

export function AuthGuard(req: Request, res: Response, next: NextFunction): void
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

export function GenerateToken(user: UserDocument): string
{
    const payload =
    {
        id: user._id,
        DisplayName: user.DisplayName,
        username: user.username,
        EmailAddress: user.EmailAddress
    }

    const jwtOptions =
    {
        expiresIn: 604800 // 1 week
    }
    return jwt.sign(payload, DBConfig.SessionSecret, jwtOptions);
}