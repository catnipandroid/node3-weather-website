const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = `Loading...`;
    messageTwo.textContent = ``;
    fetch(`http://localhost:3000/weather?address=${location}`).then( (res) => {
    res.json().then( (data) => {
       if(data.error) {
            messageOne.textContent = `${data.error}`;
       } else {
           messageOne.textContent = `검색한 위치는 : ${data.location}`;
           messageTwo.textContent = `검색한 위치의 날씨는 : ${data.forecast}`;
       }
    })
});
});
