//-----Slider
$(function(){
    $('.actors-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
      });
});

//-----Modal
let modal = document.querySelector('.modal');
let openModal = document.querySelector('.login-link');
let closeModal = document.querySelector('.close');
    openModal.addEventListener('click', ()=>{
        modal.classList.remove('hide');
        modal.classList.add('show');
    });

    function modalClose(){
        modal.classList.add('hide');
        modal.classList.remove('show');
    }

    closeModal.addEventListener('click', ()=>{
        modalClose();
    });

    document.addEventListener('keydown', (e)=>{
        if(e.code === 'Escape'){
            modalClose();
        }
    });


//-----Timer
function timer(){
    let dateNow = new Date();
    let date = new Date('Sep 1 2023');
    let restOfTime = date - dateNow;

    const days = Math.floor(restOfTime / 1000 / 60 / 60 / 24),
          hours = Math.floor((restOfTime / 1000 / 60 / 60) % 24),
          minutes = Math.floor((restOfTime / 1000 / 60) % 60),
          seconds = Math.floor((restOfTime / 1000) % 60);

    const daysValue = document.querySelector('.days'),
          hoursValue = document.querySelector('.hours'),
          minutesValue = document.querySelector('.minutes'),
          secondsValue = document.querySelector('.seconds');

    daysValue.innerHTML = days;
    if(days < 10){
        daysValue.innerHTML = `${0}${days}`;
    }
    hoursValue.innerHTML = hours;
    if(hours < 10){
        hoursValue.innerHTML = `${0}${hours}`;
    }
    minutesValue.innerHTML = minutes;
    if(minutes < 10){
        minutesValue.innerHTML = `${0}${minutes}`;
    }
    secondsValue.innerHTML = seconds;
    if(seconds < 10){
        secondsValue.innerHTML = `${0}${seconds}`;
    }

    if (restOfTime <= 0) {
        daysValue.innerHTML = '0';
        hoursValue.innerHTML = '0';
        minutesValue.innerHTML = '0';
        secondsValue.innerHTML = '0';
    }
}
timer();
setInterval(timer, 1000);


//-----Comments
let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function(){
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');

    let comment = {
        name : commentName.value,
        body : commentBody.value,
        time : Math.floor(Date.now() / 1000)
    }

    commentName.value = '';
    commentBody.value = '';

    comments.push(comment);
    saveComments();
    showComments();
}

function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments (){
    let commentField = document.getElementById('comments');
    let out = '';
    comments.forEach(function(item){
        out += `<div class="comment"><div class="comment__row"><p class="comment__name" role="alert">${item.name}</p>`;
        out += `<p class="comment__date"><em>${timeConverter(item.time)}</em></p></div>`;
        out += `<p class="comment__text" role="alert">${item.body}</p></div>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    if(date < 10){
        var date = `${0}${a.getDate()}`;
    }else{
        var date = a.getDate();
    }
    const time = date + '-' + month + '-' + year;
    return time;
  }