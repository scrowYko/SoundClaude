import Express from "express";
import { User, criarTabelas } from "../db.js";
import cors from 'cors'

const app = Express();
app.use(Express.json());
app.use(cors())

const get_user = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            console.log('Erro ao definir usuario')
        }
        const user = await User.findOne({ where: { id: id }})
        res.status(200).send({message: user})
        return true
    } catch (error) {
        console.log(error)
    }
}

export {get_user}