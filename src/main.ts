let today = new Date();
let year:number = today.getFullYear();
let month:number = today.getMonth() + 1;

let yearSpan = document.querySelector('.year');
let monthSpan = document.querySelector('.month');
let table = document.querySelector('.date');
let toLastMonth = document.querySelector('.moveto.lastmonth');
let toNextMonth = document.querySelector('.moveto.nextmonth');

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
                td.setAttribute('id', `d${year}-${month}-${week[i]}`);
                if(i==0) td.style.color = 'red';
            } else{
                td.style.pointerEvents = 'none';
            }
            tr.append(td);
        }
        table.append(tr);
    });

    let now: HTMLElement = document.querySelector(`#d${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);
    now.style.backgroundColor = '#c3cfdb';
    now.style.borderRadius = '50%';
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
    let date: Array<string> = target.id.substring(1).split('-');
    console.log(date);
});