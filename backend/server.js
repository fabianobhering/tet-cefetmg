const express = require('express');
const app = express();
const port = 3000; //porta padrão
const mysql = require('mysql2');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: 'false'}));
app.use(bodyParser.json());
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));




var cors = require('cors');
app.use(express.static("public"));
app.use(cors());

app.use(express.json());	
app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

const jwt = require("jsonwebtoken"); 
const privateKey = "xxxyyyzzz123";

const middlewareValidarJWT = (req, res, next) => {
    const jwtToken = req.headers["authorization"];
  
    jwt.verify(jwtToken, privateKey, (err, userInfo) => {
        if (err) {
            res.status(403).end();
            return;
        }

        req.userInfo = userInfo;
        next();
    });
};

const db ={
    host     : '54.173.126.116',
    port     : 3306,
    user     : '00000000000',
    password : '00000000000',
    database : '00000000000'
  }

const  execSQLQuery = (sqlQry, id, res) =>{
  const connection = mysql.createConnection(db);
  
  connection.query(sqlQry, id, (error, results, fields) => {
    
      if(error) 
        res.json(error);
      else
        res.json(results);
    
      connection.end();
      console.log('executou!');
  });
}


async function resultSQLQuery(sqlQry, id) {
  const connection = await mysql.createConnection(db);
  
  let [result] = await connection.promise().query(sqlQry, id);
  try {
    return result;
  } catch (error) {
    console.log("error"+error);
    throw error;
  }  
}



app.get('/usuarios', (req, res) => {
    console.log(req);
    const id = [];
    execSQLQuery('SELECT * FROM usuario', id, res);
})


app.get('/usuarios/:id', (req, res) => {
    const id = [req.params.id];
    execSQLQuery('SELECT * FROM usuario  WHERE usu_id=?',id, res);
})


app.delete('/usuarios/:id', (req, res) =>{
    const id = [req.params.id];
    execSQLQuery('DELETE FROM usuario WHERE usu_id=?',id, res);
})


app.post('/usuarios', (req, res) => {
    const data = req.body;
    const id = [data.nome, data.email, data.senha];
    execSQLQuery('INSERT INTO usuario(usu_nome, usu_email, usu_senha) VALUES(?,?,?)',id, res);
});


app.put('/usuarios/:id', (req, res) => {
  const data = req.body;
 
  const id = [data.nome, data.email, data.senha, req.params.id];
  execSQLQuery('UPDATE usuario SET usu_nome=?, usu_email=?, usu_senha=? WHERE usu_id=?',id, res);
});


app.get('/external', (req, res) => {
  
const response = fetch('https://dog.ceo/api/breeds/list/all',{
	method: 'get',
	//body: JSON.stringify(req.body),
	headers: {'Content-Type': 'application/json'}
})  .then(response => response.json()) 
    .then(json => res.json(json))   
    .catch(err => console.log('Erro de solicitação', err)); 

});




app.post('/login', async (req, res) => {
    const data = req.body;
    const id = [data.email, data.senha];
    console.log(data)
    var [result] = await resultSQLQuery('SELECT * FROM usuario WHERE usu_email=? and usu_senha=?',id);
   
    if(result){
     
      jwt.sign(req.body, privateKey, (err, token) => {
                if (err) {
                    res
                        .status(500)
                        .json({ mensagem: "Erro ao gerar o JWT" });

                    return;
                }
                res.set("x-access-token", token);
                res.json({"menssagem": "sucesso!"});
                res.end();
            });
    }
    else
      res.send({"menssagem": false})
   
});

//inicia o servidor
app.listen(port);
console.log('API funcionando!');