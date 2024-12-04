import Express from "express";
import cors from 'cors'
import { rotas_autenticacao } from "./routes/rotas_autenticacao.js";
import { rotas_usuario } from "./routes/rotas_usuario.js";
import { criarTabelas } from "./db.js";



const app = Express();
app.use(Express.json());
app.use(cors())
app.use('/autenticacao', rotas_autenticacao)
app.use('/usuario', rotas_usuario)

criarTabelas();
// const verificarTabelaUser = async () => {
//   try {
//     const result = await User.findOne();
//     if (result) {
//       console.log('Tabela "user" existe');
//       return true;
//     } else {
//       console.log('Tabela "user" não existe');
//       criarTabelas();
//       return false;
//     }
//   } catch (error) {
//     console.log('Erro ao verificar tabela "user"');
//     return false;
//   }
// };

//verificarTabelaUser()


app.listen(8000);
