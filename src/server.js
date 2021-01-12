const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

app.use(express.static(path.normalize(__dirname+'/..')));

app.get('/', (request, response) => {
    let now = new Date();
    fs.readFile(path.normalize(__dirname+'/../index.ejs'), 'utf8', function(error, data){
        response.send(ejs.render(data, {
            year: now.getFullYear(),
            month: now.getMonth(),
            date: now.getDate()
        }));
    });
    console.log('ejs');
});

app.get('/writeDiary', (request, response)=> {
    response.sendFile(path.normalize(__dirname+'/../writeDiary.html'));
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