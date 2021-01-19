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
    let no = Number(request.query.no) || 0;
    let diarys, main_diary;
    if(!date){
        let today = new Date();
        let month = Number(today.getMonth()) + 1;
        if(month > 12) month = 1;
        date = today.getFullYear() + '-' + month + '-' + today.getDate();
    }
    console.log('query: ', request.query);

    connection.query(`select * from diary where date='${date}'`, function(error, results, fields){
        if(error) console.log('ERROR', error);
        diarys = results;
        connection.query(`select * from diary where date='${date}' and no = ${no}`, function(error, results, fields){
            if(error) console.log('ERROR', error);
            main_diary = results[0] || diarys[0] || null;
        });
        fs.readFile(path.normalize(__dirname+'/html/index.ejs'), 'utf8', function(error, data){
            response.send(ejs.render(data, {Diarys: diarys, MainDiary: main_diary}));
            console.log('main diary',main_diary);
        });
    });
    
});

app.get('/writeDiary', (request, response)=> {
    let date = request.query.date || '';
    let no = request.query.no || '';
    connection.query(`select * from diary where date='${date}' and no=${no}`, function(error, results, fields){
        if(error) console.log('ERROR', error);
        if(!results[0]) results[0]={
            no: no,
            date: date,
            title: '',
            content: ''
        }
        fs.readFile(path.normalize(__dirname+'/html/writeDiary.ejs'), 'utf8', function(error, data){
            response.send(ejs.render(data, {diary: results[0]}));
        });
    });
});

app.get('/delete', (request, response)=>{
    console.log(request.query);
    connection.query(`delete from diary where date='${request.query.date}' and no=${request.query.no}`, function(error, results, fields){
        if(error) {
            response.status(404);
            return;
        }
        response.redirect('/?date='+request.query.date);      
    });
});

app.get('/save', (request, response)=>{
    console.log(request.query);
    let query = `insert into diary values (${request.query.no}, '${request.query.date}', '${request.query.title}', '${request.query.content}') 
    on duplicate key update title = '${request.query.title}', content='${request.query.content}'`;
    connection.query(query, function(error, results, fields){
        if(error) {
            response.status(404);
            return;
        }
        response.redirect('/?date='+request.query.date);
    });
});

app.listen(50000, () => {
    console.log('Server running in 50000 port');
});