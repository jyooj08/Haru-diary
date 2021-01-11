var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var yearSpan = document.querySelector('.year');
var monthSpan = document.querySelector('.month');
var table = document.querySelector('.date');
var toLastMonth = document.querySelector('.moveto.lastmonth');
var toNextMonth = document.querySelector('.moveto.nextmonth');
setCalendar(year, month);
function setCalendar(year, month) {
    yearSpan.textContent = String(year) + "년";
    monthSpan.textContent = String(month) + "월";
    table.innerHTML = "<tr><td style='color: red;'>일</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td></tr>";
    var firstDay = new Date(year, month - 1, 1).getDay();
    var lastDate = new Date(year, month, 0).getDate();
    // get date
    var day = firstDay, week = 0;
    var calendar = new Array();
    calendar[0] = new Array(7);
    for (var i = 1; i <= lastDate; i++) {
        calendar[week][day++] = i;
        if (day > 6) {
            day = 0;
            week++;
            calendar[week] = new Array(7);
        }
    }
    //set html
    calendar.forEach(function (week) {
        var tr = document.createElement('tr');
        for (var i = 0; i < 7; i++) {
            var td = document.createElement('td');
            if (typeof (week[i]) == 'number') {
                td.textContent = String(week[i]);
                td.setAttribute('id', "d" + year + "-" + month + "-" + week[i]);
                if (i == 0)
                    td.style.color = 'red';
            }
            else {
                td.style.pointerEvents = 'none';
            }
            tr.append(td);
        }
        table.append(tr);
    });
    var now = document.querySelector("#d" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate());
    now.style.backgroundColor = '#c3cfdb';
    now.style.borderRadius = '50%';
}
toLastMonth.addEventListener('click', function () {
    month--;
    if (month < 1) {
        month = 12;
        year--;
    }
    setCalendar(year, month);
});
toNextMonth.addEventListener('click', function () {
    month++;
    if (month > 12) {
        month = 1;
        year++;
    }
    setCalendar(year, month);
});
table.addEventListener('click', function (event) {
    var target = event.target;
    if (!target.id)
        return;
    var date = target.id.substring(1).split('-');
    console.log(date);
});