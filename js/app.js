
'use strict';


const pageOne = './data/page-1.json';
const pageTwo = './data/page-2.json';

const ajaxSettings = {
  method: 'get',
  dataType: 'json',
};


let arrOfObj = [];
let page1Data=[];
let page2Data=[];

function NewHorn(obj) {
  for(let key in obj){
    this[key] = obj[key];

  }
}
// console.log(arrOfObj);

NewHorn.prototype.toHtml = function() {
  let template = $('#img-template').html();
  let html = Mustache.render(template,this);
  return html;
};

NewHorn.prototype.toDropdown = function() {
  let template = $('#keywordList').html();
  let html = Mustache.render(template,this);
  return html;
};
// read json


function getJsonData (pageNumber) {

  arrOfObj = [];
  $.get(pageNumber)
    .then(hornData => {
      hornData.forEach(horn => {
        arrOfObj.push(new NewHorn(horn));
      });
    })
    .then(titleSort);
}

//this function to render the objects (horns)
const renderHorns = () => {
  arrOfObj.forEach(horn => {

    $('main').append(horn.toHtml());
  });
  dropDrown();
};


//function to build and display dropdown menu
const dropDrown = () => {
  arrOfObj.forEach(horn => {
    let exists = false;
    $('#dropDown option').each(function(){
      if(this.value === horn.keyword){
        exists = true;
      }
    });
    if(exists === false){

      $('select').append(horn.toDropdown());
    }
  });
};


// let filter= (event) => {
//   $('div').hide();
//   let img = $(`img[value="${event.target.value}"]`).parent();
//   $(img).show();
// };


$('#dropDown').on('change', filter);


function pageOneSelector (pageNum) {

  $('div').remove();
  getJsonData(pageOne);

}

let pageTwoSelector = () => {

  $('div').remove();
  getJsonData(pageTwo);
};


let titleSort = () => {
  arrOfObj.forEach( (horn) => {
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
  renderHorns();
};

function filter (event){
  event.preventDefault();
  $('div').hide();
  arrOfObj.forEach ( element => {
    if(element.keyword === $(this).val()){


      let pickedOne =  $(this).val();
      $(`.${pickedOne}`).show();
    }

  }
  );
}


let hornSort = () => {
  arrOfObj.forEach( (horn) => {
    arrOfObj.sort( (a,b) => {
      return a.horns - b.horns;
    });
    return arrOfObj;
  });
  $('div').remove();
  renderHorns();
};


$('#pageOne').on('click', pageOneSelector);
$('#pageTwo').on('click', pageTwoSelector);


$('#title').on('click', titleSort);
$('#hornsNum').on('click', hornSort);

//default page if no selection
$(() => getJsonData(pageOne));
