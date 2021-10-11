const axios = require('axios').default;
console.log('client javascript is running');
async function getdata()
{
try{
const response = await axios.get('http://localhost:3000/weather?address=!')

console.log(response.json());
}
catch(error)
{
    console.log(error);
}
}
getdata();
const weatherform = document.querySelector('form')

weatherform.addEventListener('submit',(e)=>
{
e.preventDefault();
console.log('testing!');

})

