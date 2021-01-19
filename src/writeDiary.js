var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var deleteBtn = document.querySelector('.btn--delete');
var saveBtn = document.querySelector('.btn--save');
var query = window.location.search.substring(1).split('&');
var data = [];
query.forEach(function (item) {
    data[item.split('=')[0]] = item.split('=')[1];
});
deleteBtn.addEventListener('click', function () {
    var answer = confirm('삭제하시겠습니까?');
    if (!answer)
        return;
    var date = data['date'];
    var no = data['no'];
    window.location.href = "/delete?date=" + date + "&no=" + no;
});
saveBtn.addEventListener('click', function () {
    var answer = confirm('저장하시겠습니까?');
    if (!answer)
        return;
    var title = document.querySelector('.input--title').value;
    var content = document.querySelector('.content').value;
    window.location.href = "/save?date=" + data['date'] + "&no=" + data['no'] + "&title=" + title + "&content=" + content;
});
