import Express from "express";

const app = Express()
app.use(Express.json())

app.get('/pegar', function (req, res) {
    res.send('Enviar mensagem')
})

app.get('/pegar2', function (req, res) {
    res.send('Enviar outra mensagem')
})

app.post('/registro', function(req, res) {
    console.log(req.body)
    //get infos from body
    try {
        const { nome, sobrenome, dataNascimento, email, senha  } = req.body
    //verify if the fields are valid
        if(!nome || !sobrenome || !dataNascimento || !email || !senha){
            return res.status(406).send({ message: 'Preencha todos os campos' })
        }
        console.log('criar user');
        return res.status(201).send({message: 'Usuário criado'})
    } catch (error) {
        return res.status(error).send({message: 'Erro ao conectar com banco de dados'})
    }
    //encrypt  the password
    //create user in database   
    //response to client
})

// const server = createServer((req, res) => {
//   res.write("Hello world");

//   return res.end()
// });

app.listen(8000);
