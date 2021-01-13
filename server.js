const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dailydiary'
});

app.use(express.static(path.normalize(__dirname)));
connection.connect();

app.get('/', (request, response) => {
    let date = request.query.date;
    let index = Number(request.query.index) || 0;
    if(!date){
        let today = new Date();
        let month = Number(today.getMonth()) + 1;
        if(month > 12) month = 1;
        date = today.getFullYear() + '-' + month + '-' + today.getDate();
    }
    console.log('query: ', date, index);

    connection.query(`select * from diary where date='${date}'`, function(error, results, fields){
        if(error) console.log('ERROR', error);
        console.log(results);
        fs.readFile(path.normalize(__dirname+'/html/index.ejs'), 'utf8', function(error, data){
            response.send(ejs.render(data, {diarys: results}));
        });
    })
    
});

app.get('/writeDiary', (request, response)=> {
    response.sendFile(path.normalize(__dirname+'/html/writeDiary.html'));
    console.log('write diary request');
})

app.get('/get', (request, response)=>{
    console.log(request.query);
    response.send('response of '+request.query.date);
})

app.listen(50000, () => {
    console.log('Server running in 50000 port');
    console.log(__dirname);
});