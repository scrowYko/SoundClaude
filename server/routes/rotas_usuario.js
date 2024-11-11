import express from "express";
import { get_user } from "../controlador/controlador_usuarios.js";

const rotas_usuario = express.Router()

rotas_usuario.get('/:id', get_user)

export {rotas_usuario}