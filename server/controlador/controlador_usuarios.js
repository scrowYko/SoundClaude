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
        return user
    } catch (error) {
        console.log(error)
    }
}

const updateImagem = async (req, res) => {
    try {
        const email = req.body.email; 
        const url = req.body.url; 
        if (!email || !url) {
            return res.status(400).send({ message: 'Email e URL da imagem são obrigatórios.' });
        }
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }
        user.imagem_perfil = url;
        await user.save(); // Salva as alterações no banco de dados
        res.status(200).send({ message: 'Imagem de perfil atualizada com sucesso.', user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Erro ao atualizar a imagem de perfil.' });
    }
}

export {get_user, updateImagem}