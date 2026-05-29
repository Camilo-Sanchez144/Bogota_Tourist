import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../User/User.entity'
class UserLogin{
    async userLogin(req:Request, res:Response){
        try{
            const { email, password } = req.body
            const user = await User.findOneBy({email})
            if(!user){
                return res.status(404).json({msg:`Usuario con el email ${email} no existe`})
            }
            const validPassword = await bcrypt.compare(password, user.password)
            if(!validPassword){
                return res.status(401).json({msg:`Contraseña no válida`})
            }
            const token = jwt.sign(
                {id:user.id},
                'secret',
                {expiresIn: '1h'}
            )
            res.json({ token });
        }catch(err:any){
            res.status(500).send(err.message)
        }
    }
}
export default new UserLogin();
