// /* eslint-disable no-undef */
// 'use strict';

// let arrOfObj=[];
// let arrOfKeyword=[];

// const pageOne = '../data/page-1.json';
// const pageTwo = '../data/page-2.json';

// const ajaxSettings = {
//   method: 'get',
//   dataType: 'json',
// };

// $.ajax('./data/page-1.json', ajaxSettings).then((arr) => {
//   arr.forEach((horn) => {
//     let newObj=new NewHorn(horn).render();


//   });


  checkkeywords();


//   checkkeywords();

// });





function NewHorn (horn){
  this.image_url=horn.image_url;
  this.title=horn.title;
  this.description=horn.description;
  this.keyword=horn.keyword;
  this.hornsNum=horn.horns;
  arrOfObj.push(this);


// // function NewHorn (horn){
// //   this.image_url=horn.image_url;
// //   this.title=horn.title;
// //   this.description=horn.description;
// //   this.keyword=horn.keyword;
// //   this.hornsNum=horn.horns;
// //   arrOfObj.push(this);

// // }


// function NewHorn(horn) {
//   for(let key in horn){
//     this[key] = horn[key];
//   }
// }


// NewHorn.prototype.render = function () {
//   // let option = $('option').clone();
//   let $divClone = $('#template').clone();
//   $('main').append($divClone);
//   $divClone.find('h2').text(this.title);
//   $divClone.find('img').attr('src', this.image_url);
//   $divClone.find('p').text(`${this.description} , the horns no. is ${this.horns}`);
//   $divClone.removeClass('#template');
//   $divClone.attr('class', this.keyword);
//   $('main').append($divClone);


// };



// function checkkeywords(){
//   arrOfObj.forEach(element=>{
//     if(!(arrOfKeyword.includes(element.keyword))){
//       arrOfKeyword.push(element.keyword);
//       $('select').append(`<option>${element.keyword}</option>`);
//     }
//   });
// }
// console.log(arrOfKeyword);


// $('select').on('change', filter);

// function filter (event){
//   event.preventDefault();
//   $('div').hide();
//   arrOfObj.forEach ( element => {
//     if(element.keyword === $(this).val()){


//       let pickedOne =  $(this).val();
//       $(`.${pickedOne}`).show();
//     }

//   }
//   );

// }




'use strict';

//global variables
const pageOne = './data/page-1.json';
const pageTwo = './data/page-2.json';



let arrOfObj = [];


function NewHorn(obj) {
  for(let key in obj){
    this[key] = obj[key];
  }
}

NewHorn.prototype.toHtml = function() {
  let template = $('#img-template').html();
  let html = mustache.render(template,this);
  return html;
};

NewHorn.prototype.toDropdown = function() {
  let template = $('#keywordList').html();
  let html = mustache.render(template,this);
  return html;
};
// read json
const readJson = (pageNumber) => {

  arrOfObj = [];
  $.get(pageNumber)
    .then(animalData => {
      animalData.forEach(animal => {
        arrOfObj.push(new NewHorn(animal));
      });
    })
    .then(titleSort);
};

//read global array activate render
const loadAnimals = () => {
  arrOfObj.forEach(animal => {

    $('main').append(animal.toHtml());
  });
  dropDrown();
};


//function to build and display dropdown menu
const dropDrown = () => {
  arrOfObj.forEach(animal => {
    let exists = false;
    $('#dropDown option').each(function(){
      if(this.value === animal.keyword){
        exists = true;
      }
    });
    if(exists === false){
      //add element to parent
      $('select').append(animal.toDropdown());


    }
  });
};

//Event handler function
let animalSelector = (event) => {
  $('div').hide();
  let img = $(`img[value="${event.target.value}"]`).parent();
  $(img).show();
};

//Drop-down list event handler
$('#dropDown').on('change', animalSelector);

// Json page selector functions
let pageOneSelector = () => {
  // Animal.holdingArray = [];
  $('div').remove();
  readJson(pageOne);
};
let pageTwoSelector = () => {
  // Animal.holdingArray = [];
  $('div').remove();
  readJson(pageTwo);
};

//Sort functions
let titleSort = () => {
  arrOfObj.forEach( (element) => {
    arrOfObj.sort( (a,b) => {
      if(a.title < b.title){
        return -1;
      }
      if(a.title > b.title){
        return 1;
      }
      return 0;
    });
    return arrOfObj;
  });
  $('div').remove();
  loadAnimals();
};

// function filter (event){
//   event.preventDefault();
//   $('div').hide();
//   arrOfObj.forEach ( element => {
//     if(element.keyword === $(this).val()){


//       let pickedOne =  $(this).val();
//       $(`.${pickedOne}`).show();
//     }

//   }
//   );


let hornSort = () => {
  arrOfObj.forEach( (element) => {
    arrOfObj.sort( (a,b) => {
      return a.horns - b.horns;
    });
    return arrOfObj;
  });
  $('div').remove();
  loadAnimals();
};

//Button event handlers to switch pages
$('#pageOne').on('click', pageOneSelector);
$('#pageTwo').on('click', pageTwoSelector);

//Button event handlers to sort
$('#title').on('click', titleSort);
$('#hornsNum').on('click', hornSort);
//start it off
$(() => readJson(pageOne));
