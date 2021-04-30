const express = require ('express'); 
const bodyParser = require ('body-parser');
const cors = require ('cors');
// cria aplicativo express
const app = express ();
// Configurar porta do servidor 
const port = process.env.PORT || 5000;

const mysql = require ('mysql');

app.use (bodyParser.urlencoded ({extended: true}))

app.use (bodyParser.json ())

app.use (cors({origin:true}))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'oli'
})



app.get ('/', (req, res) => { 
    
    connection.query("SELECT * FROM clientes", (err, rows) => {
        if(!err){
            console.log('Resultado: ', rows);
        }else{
            console.log('Erro ao realizar a consulta');
        }
        res.json(rows);
    }) 
});


app.post('/novocliente', (req, res) => {            
        
        const  nome = req.body.nome;
        const   data_nascimento=req.body.data_nascimento;
        const  sexo = req.body.sexo;
        const    problema_saude= req.body.problema_saude;
        const   grau_problema= req.body.grau_problema;
              
         connection.query ("INSERT INTO `oli`.`clientes` (`nome`, `data_nascimento`, `sexo`, `problema_saude`, `grau_problema`) VALUES ('"+nome+"', '"+data_nascimento+"', '"+sexo+"', '"+problema_saude+"', '"+grau_problema+"' );",  function(err, rows)
         {
             if(err) throw err;
             
             res.send(
                 "Cliente Cadastrado! Confira em seu Banco de Dados e volte a página! "
                 
             );

             console.log ('Resultado: ', rows);
             res.json(rows);
                         });
            
          
});


app.post ('/atualizarcliente/:id', (req, res) => { 
    const  idclientes = req.params.idclientes;
    const  nome = req.body.nome;
    const   data_nascimento=req.body.data_nascimento;
    const  sexo = req.body.sexo;
    const    problema_saude= req.body.problema_saude;
    const   grau_problema= req.body.grau_problema;
    
    connection.query("UPDATE `oli`.`clientes` SET `nome` = '"+nome+"', `data_nascimento` = '"+data_nascimento+"', `sexo` = '"+sexo+"', `problema_saude` = '"+problema_saude+"', `grau_problema` = '"+grau_problema+"' WHERE (`idclientes` = '"+req.params.id+"');  "
    
    , function(err, rows)
    {
        if(err) throw err;
        
        res.send({
            nome,
            data_nascimento,
            sexo,
            problema_saude,
            grau_problema,
           Status: true
            
        });

        console.log ('Resultado: ', rows);
        res.json(rows);
                    });
          
    
});

app.get ('/pesquisacliente/:id', (req, res) => { 
    const  idclientes = req.params.idclientes;
    
    connection.query("SELECT * FROM clientes WHERE (`idclientes` = '"+req.params.id+"');   ", (err, rows) => {
        if(!err){
            console.log('Resultado: ', rows);
        }else{
            console.log('Erro ao realizar a consulta');
        }
        res.json(rows);
    }) 
});

app.get ('/clienterisco/:grau_problema', (req, res) => { 
    const  grau_problema = req.params.grau_problema;
    
    connection.query("SELECT * FROM clientes WHERE (grau_problema = '"+req.params.grau_problema+"');   ", (err, rows) => {
        if(!err){
            console.log('Resultado: ', rows);
        }else{
            console.log('Erro ao realizar a consulta');
        }
        res.json(rows);
    }) 
});


// porta
app.listen (port, () => { 
  console.log (`O servidor está rodando na porta $ {port}`); 
});