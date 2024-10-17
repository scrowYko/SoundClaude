import { createServer } from "node:http";
import Express from "express";

const app = Express()

app.get('/pegar', function (req, res) {
    res.send('Enviar mensagem')
})

app.get('/pegar2', function (req, res) {
    res.send('Enviar outra mensagem')
})

// const server = createServer((req, res) => {
//   res.write("Hello world");

//   return res.end()
// });

app.listen(8000);
