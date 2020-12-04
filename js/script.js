// global variables
let employees=[]; //empty array that will hold values from the API
const urlAPI= `https://randomuser.me/api/?results=12&inc=name,picture,
email,location,phone,dob &noinfo &nat=US`; //string literal that stores the url of the API, complete with desired options
 const gridContainer=document.querySelector('.grid-container');//stores the DOM element that is the container for the employees
 const overlay=document.querySelector('.overlay');//stores the DOM element that acts as an overlay for the modal.
 const modalContainer=document.querySelector('.modal-content');//stores the DOM element that is the modal's close button
 const modalClose=document.querySelector('.modal-close');//stores the DOM element that is the modal's close button.

//fetch data from api
fetch(urlAPI) //pass the url information to fetch
.then(res=>res.json()) //format the response as JSON
.then(res=>res.results) //return the results of the response
.then(displayEmployees)//pass control to the displayEmployees function
.catch(err=>console.log(err))//to display the response and catch errors using Chrome dev tools


  function displayEmployees(employeeData){
    employees=employeeData; //by setting the employees variable equal to employeeData, it can be accessed outside of the function
  let employeeHTML=''; //this variable will contain the HTML markup for the employee elements.
  //loop through each employee and create HTML markup
employees.forEach((employee,index)=>{
  let name=employee.name;
  let email=employee.email;
  let city=employee.location.city;
  let picture = employee.picture;

  employeeHTML +=`
  <div class="card" data-index="${index}">
    <img class="avatar" src="${picture.large}"/>
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
    </div>
    </div>
  `;
}); // using template liretal, add each employee markup to the employeeHTML

gridContainer.innerHTML=employeeHTML;
}

function displayModal(index){ //function scoped variables for the information that needs to be displayed
  let {name,dob,phone, email,location:{city,street,state,postcode},picture}=employees[index]; //using the information from the employees array

  let date=new Date(dob.date); //variavle thatcreates a new Date Object based on the employee's date of birth

  const modalHTML=
  `<img class="avatar" src="${picture.large}"/>
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street}, ${state} ${postcode}</p>
    <p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
  }

  gridContainer.addEventListener('click', e => {
// make sure the click is not on the gridContainer itself
if (e.target !== gridContainer) {
// select the card element based on its proximity to actual element clicked;
const card = e.target.closest(".card");
const index = card.getAttribute('data-index');
displayModal(index);
}
});
modalClose.addEventListener('click', () => {
overlay.classList.add("hidden");
});
