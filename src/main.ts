let today = new Date();
let year:number = today.getFullYear();
let month:number = today.getMonth() + 1;

let yearSpan = document.querySelector('.year');
let monthSpan = document.querySelector('.month');
let table = document.querySelector('.date');
let toLastMonth = document.querySelector('.moveto.lastmonth');
let toNextMonth = document.querySelector('.moveto.nextmonth');
let addDiaryBtn = document.querySelector('.add-diary');
let editBtn = document.querySelector('.btn--edit');
let deleteBtn = document.querySelector('.btn--delete');
let saveBtn = document.querySelector('.btn--save');
let maindata:HTMLElement = document.querySelector('.main--data');
let diaryList:HTMLElement = document.querySelector('.diarys');
let query: Array<string> = window.location.search.substring(1).split('&');
let data: Array<string> = [];

query.forEach(item => {
    data[item.split('=')[0]] = item.split('=')[1];
});

setCalendar(year, month);

function setCalendar(year: number, month: number): void{
    yearSpan.textContent = String(year) + "년"
    monthSpan.textContent = String(month) + "월"
    table.innerHTML="<tr><td style='color: red;'>일</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td></tr>";

    let firstDay = new Date(year, month-1, 1).getDay();
    let lastDate = new Date(year, month, 0).getDate();
    
    // get date
    let day:number = firstDay, week:number = 0;
    let calendar:Array<Array<number|undefined>> = new Array();
    calendar[0] = new Array(7);
    for(let i=1;i<=lastDate;i++){
        calendar[week][day++] = i;
        if(day > 6){
            day=0;week++;
            calendar[week] = new Array(7);
        }
    }

    //set html
    calendar.forEach(function(week: Array<number|undefined>){
        let tr = document.createElement('tr');
        for(let i=0;i<7;i++){
            let td: HTMLElement = document.createElement('td');
            if(typeof(week[i])=='number') {
                td.textContent = String(week[i]);
                td.setAttribute('id', `date${year}-${month}-${week[i]}`);
                if(i==0) td.style.color = 'red';
            } else{
                td.style.pointerEvents = 'none';
            }
            tr.append(td);
        }
        table.append(tr);
    });

    let todayDate: HTMLElement = document.querySelector(`#date${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);
    if(todayDate) todayDate.classList.add('today');
    let nowDate: HTMLElement = document.querySelector('#date'+data['date']);
    if(nowDate) nowDate.classList.add('now');
    
    
}

toLastMonth.addEventListener('click', ()=>{
    month--;
    if(month < 1){
        month=12; year--;
    }
    setCalendar(year, month);
});

toNextMonth.addEventListener('click', ()=>{
    month++;
    if(month > 12){
        month = 1; year ++;
    }
    setCalendar(year, month);
});

table.addEventListener('click', (event)=>{
    let target:HTMLElement = event.target as HTMLElement;
    if(!target.id) return;
    let date: string = target.id.substring(4);
    window.location.href="/?date="+date;
});

addDiaryBtn.addEventListener('click', ()=>{
    let date:string = document.querySelector('.date td.today').id.substring(4);
    let no: number = document.querySelectorAll('.diarys li').length;
    window.location.href="/writeDiary?date="+date+"&no="+no;
});

editBtn.addEventListener('click', ()=>{
    let date:string = maindata.dataset.date;
    let no:string = maindata.dataset.no;
    window.location.href="/writeDiary?date="+date+"&no="+no;
});

deleteBtn.addEventListener('click', ()=>{
    let date:string = maindata.dataset.date;
    let no:string = maindata.dataset.no;
    window.location.href="/delete?date="+date+"&no="+no;
});

diaryList.addEventListener('click', (event)=>{
    let target:HTMLElement = event.target as HTMLElement;
    if(!target.classList.contains('delete-diary')) return;
    let date:string = target.parentElement.dataset.date;
    let no:string = target.parentElement.dataset.no;
    window.location.href="/delete?date="+date+"&no="+no;
});