/* eslint-disable no-undef */
'use strict';

let arrOfObj=[];
let arrOfKeyword=[];


const ajaxSettings = {
  method: 'get',
  dataType: 'json',
};

$.ajax('./data/page-1.json', ajaxSettings).then((arr) => {
  arr.forEach((horn) => {
    let newObj=new NewHorn(horn).render();

  });
  checkkeywords();

});




function NewHorn (horn){
  this.image_url=horn.image_url;
  this.title=horn.title;
  this.description=horn.description;
  this.keyword=horn.keyword;
  this.hornsNum=horn.horns;
  arrOfObj.push(this);

}


NewHorn.prototype.render = function () {
let option = $('option').clone();
  let $divClone = $('#template').clone();
  $('main').append($divClone);
  $divClone.find('h2').text(this.title);
  $divClone.find('img').attr('src', this.image_url);
  $divClone.find('p').text(`${this.description} , the horns no. is ${this.horns}`);
  $divClone.removeClass('#template');
  $divClone.attr('class', this.keyword);
  $('main').append($divClone);


};



function checkkeywords(arr){
  arrOfObj.forEach(element=>{
    if(!arrOfKeyword.includes(element.keyword)){
      arrOfKeyword.push(element.keyword);
      $('select').append('<option value ='+ element.keyword + '>'+ element.keyword +'</option>');
    }
  });
}
console.log(arrOfKeyword);


$('select').on('change', filter);

function filter (event){
  event.preventDefault();
  $('section').hide();
  let filterArr=[];
  let selectedImg = $('option:selected').val();
  arrOfObj.forEach(element => {
    if (selectedImg === element.keyword){
      console.log(selectedImg);
      filterArr.push(element);
      console.log(filterArr);
      $('.'+selectedImg).show();

    }
  }
  );

}
