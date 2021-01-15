let today = new Date();
let year:number = today.getFullYear();
let month:number = today.getMonth() + 1;

let deleteBtn = document.querySelector('.btn--delete');
let saveBtn = document.querySelector('.btn--save');
let query: Array<string> = window.location.search.substring(1).split('&');
let data: Array<string> = [];

query.forEach(item => {
    data[item.split('=')[0]] = item.split('=')[1];
});

deleteBtn.addEventListener('click', ()=>{
    let date:string = data['date'];
    let no:string = data['no'];
    window.location.href="/delete?date="+date+"&no="+no;
});

saveBtn.addEventListener('click', ()=>{
    let title:string = (document.querySelector('.input--title') as HTMLInputElement).value;
    let content:string = (document.querySelector('.content') as HTMLInputElement).value;
    window.location.href=`/save?date=${data['date']}&no=${data['no']}&title=${title}&content=${content}`;
});