let halfval = document.querySelector('.half');
let dblval = document.querySelector('.dbl');

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

halfval.addEventListener('click', function() {
        let currentValue = parseFloat(document.querySelector('.betinp').value);
        let newValue = currentValue / 2;
        document.querySelector('.betinp').value = newValue.toFixed(6);
})

dblval.addEventListener('click', function() {
        let currentValue = parseFloat(document.querySelector('.betinp').value);
        let newValue = currentValue * 2;
        document.querySelector('.betinp').value = newValue.toFixed(6);
})