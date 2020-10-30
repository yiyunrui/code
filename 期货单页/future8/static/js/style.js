let btn = document.querySelector('.btn');
let tan = document.querySelector('.tan');
let close = document.querySelector('.close');
let zhezhao = document.querySelector('.zhezhao');
btn.addEventListener('click', function () {
    tan.style.display = 'block';
    zhezhao.style.display = 'block';
})
close.addEventListener('click', function () {
    tan.style.display = 'none';
    zhezhao.style.display = 'none';

})

