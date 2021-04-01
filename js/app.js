
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
    arrOfObj.push(this);
  }
}
// console.log(arrOfObj);

NewHorn.prototype.rendertoHtml = function() {
  let template = $('#img-template').html();
  let html = Mustache.render(template,this);
  // return html;
  $('#img-template').append(html);
};

NewHorn.prototype.toDropdown = function() {
  let template = $('#keywordList').html();
  let html = Mustache.render(template,this);
  return html;

};


let keywordOne=[];
function getJsonData1 (data){
  $.ajax('data/page-1.json', ajaxSettings).then((data) => {
    data.forEach((horn) => {
      let hornObject = new NewHorn(horn);
      // render the create horn object
      page1Data.push(hornObject);
      // hornObject.renderWithMustache1();
      if(!keywordOne.includes(horn.keyword)){
        keywordOne.push(horn.keyword);}
      $('select').append('<option value ='+ horn.keyword + '>'+ horn.keyword +'</option>');

    });
    dropDrown1();
  });
}

let keywordTwo=[];
function getJsonData2 (data){
  $.ajax('data/page-2.json', ajaxSettings).then((data) => {
    data.forEach((horn) => {
      let hornObject = new NewHorn(horn);
      page2Data.push(hornObject);
      // hornObject.renderWithMustache1();
      if(!keywordTwo.includes(horn.keyword)){
        keywordTwo.push(horn.keyword);}
      $('select').append('<option value ='+ horn.keyword + '>'+ horn.keyword +'</option>');

    });
    dropDrown2();
  });
}


//this function to render the objects (horns)
const renderHorns = () => {
  arrOfObj.forEach(horn => {

    $('main').append(horn.toHtml());
  });
  dropDrown2();
};


//function to build and display dropdown menu
const dropDrown1 = () => {
  page1Data.forEach(horn => {
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

const dropDrown2 = () => {
  page2Data.forEach(horn => {
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



$('#dropDown').on('change', filter1);

$('#dropDown').on('change', filter2);

function pageOneSelector (pageNum) {

  $('div').remove();
  getJsonData1(pageOne);
  dropDrown1();
}

let pageTwoSelector = () => {

  $('div').remove();
  getJsonData2(pageTwo);
  dropDrown2();
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

function filter1 (event){
  event.preventDefault();
  $('div').hide();
  page1Data.forEach ( element => {
    if(element.keyword === $(this).val()){


      let pickedOne =  $(this).val();
      $(`.${pickedOne}`).show();
    }

  }
  );
}

function filter2 (event){
  event.preventDefault();
  $('div').hide();
  page2Data.forEach ( element => {
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
$(() => getJsonData1(pageOne));
