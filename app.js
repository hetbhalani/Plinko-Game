
document.querySelector('.auto').addEventListener('click', function() {

        document.querySelector('.manual').style.backgroundColor = '#071d2a';
        document.querySelector('.auto').style.backgroundColor = '#2f4553';
});

document.querySelector('.manual').addEventListener('click', function() {

        document.querySelector('.manual').style.backgroundColor = '#2f4553';
        document.querySelector('.auto').style.backgroundColor = '#071d2a';
    
});

document.querySelector('.betinp').addEventListener('focus',function(){
    this.select();
});