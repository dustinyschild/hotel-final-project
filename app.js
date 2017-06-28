'use strict';

function Room(roomId,roomType,roomRate,imgSrc,isVacant,allowedOccupancy,roomLayoutSrc,iceCreamBar,wetBar,hotTub,miniBar,fridge,microwave,kitchenette){
  this.roomId = roomId;
  this.roomType = roomType;
  this.roomRate = roomRate;
  this.imgSrc = imgSrc;
  this.isVacant = isVacant;
  this.allowedOccupancy = allowedOccupancy;
  this.roomLayoutSrc = roomLayoutSrc;
  this.iceCreamBar = iceCreamBar;
  this.wetBar = wetBar;
  this.hotTub = hotTub;
  this.miniBar = miniBar;
  this.fridge = fridge;
  this.microwave = microwave;
  this.kitchenette = kitchenette;
}

function Hotel(hotelName,hotelAddress,hotelImgSrc,hotelLayoutSrc, roomsList){
  this.hotelName = hotelName;
  this.hotelAddress = hotelAddress;
  this.hotelImgSrc = hotelImgSrc;
  this.hotelLayoutSrc = hotelLayoutSrc;
  this.hotelRooms = {};

  this.buildRooms(roomsList);
}

Hotel.prototype.buildRooms = function(roomsList){
  var roomsHere = {};
  roomsList.forEach(function(item){
    roomsHere[item.roomId] = item;
  });
  this.hotelRooms = roomsHere;
};

Hotel.prototype.displayRoom = function(e) {
  var targetRoom = e.path[1].getAttribute('id');
  var targetImage = getTargetHotelRommProperty(targetRoom, 'imgSrc', this);
  var targetRoomType = getTargetHotelRommProperty(targetRoom, 'roomType', this);
  var targetRoomRate = getTargetHotelRommProperty(targetRoom, 'roomRate', this);
  var targetRoomOccupancy = getTargetHotelRommProperty(targetRoom, 'allowedOccupancy', this);
  var oldRoom = document.getElementsByClassName('pop-up')[0];
  if(oldRoom){
    oldRoom.remove();
    console.log('deleted old');
  }
  var popUpContainer = document.getElementsByClassName('hotel-container')[0];
  var newPopUp = document.createElement('div');
  newPopUp.className = 'pop-up';
  popUpContainer.appendChild(newPopUp);
  var roomImage = document.createElement('img');
  roomImage.setAttribute('src', targetImage);
  newPopUp.appendChild(roomImage);
  var roomNumber = document.createElement('h3');
  roomNumber.innerText = 'Room ' + targetRoom;
  newPopUp.appendChild(roomNumber);
  var itemList = document.createElement('ul');
  newPopUp.appendChild(itemList);
  var roomType = document.createElement('li');
  roomType.innerText = targetRoomType;
  itemList.appendChild(roomType);
  var roomRate = document.createElement('li');
  roomRate.innerText = '$' + targetRoomRate + ' per Night';
  itemList.appendChild(roomRate);
  var roomOccupancy = document.createElement('li');
  roomOccupancy.innerText = 'Maximum of ' + targetRoomOccupancy + ' Occupants';
  itemList.appendChild(roomOccupancy);
  var amenitiesContainer = document.createElement('li');
  amenitiesContainer.innerText = 'Amenities:';
  itemList.appendChild(amenitiesContainer);
  var roomAmenitiesList = document.createElement('ul');
  amenitiesContainer.appendChild(roomAmenitiesList);
  buildTrueAmenitiesList(roomAmenitiesList, targetRoom, this);
};

function getTargetHotelRommProperty(targetRoom, propertyName, here) {
  for (var key in here.hotelRooms){
    if (key === targetRoom){
      var target = here.hotelRooms[key][propertyName];
    }
  }
  return target;
}

function buildTrueAmenitiesList(container, targetRoom, here) {
  for (var key in here.hotelRooms){
    if (key === targetRoom){
      var obj = here.hotelRooms[key];
      for (var property in obj) {
        if (property === 'iceCreamBar' ||
        property === 'wetBar' ||
        property === 'hotTub' ||
        property === 'miniBar' ||
        property === 'fridge' ||
        property === 'microwave' ||
        property === 'kitchenette'){
          if (obj[property]) {
            var roomAmenity = document.createElement('li');
            roomAmenity.innerText = obj[property];
            container.appendChild(roomAmenity);
          }
        }
      }
    }
  }
}
Hotel.prototype.randomOccupancy = function(){
  for (var key in this.hotelRooms) {
    var obj = this.hotelRooms[key];
    for (var property in obj) {
      if(property === 'isVacant'){
        if(Math.random() < 0.2){
          obj[property] = false;
        }
      }
    }
  }
};

Hotel.prototype.getOccupancyFromLocalStorage = function(){
  var vacancy = JSON.parse(window.localStorage.roomVacancy);
  for(var key in this.hotelRooms){
    var obj = this.hotelRooms[key];
    for (var property in obj) {
      if(property === 'isVacant'){
        obj[property] = vacancy[key];
      }
    }
  }
};

Hotel.prototype.writeVancanyToLocalStorage = function(){
  var vacancy = {};
  for (var key in this.hotelRooms){
    var obj = this.hotelRooms[key];
    for (var property in obj) {
      if(property === 'isVacant'){
        vacancy[key] = obj[property];
      }
    }
  }
  window.localStorage.roomVacancy = JSON.stringify(vacancy);
};

function onLoad(){
  if(!window.localStorage.roomVacancy){
    hotelA.randomOccupancy();
    hotelA.writeVancanyToLocalStorage();
  }
  else{
    hotelA.getOccupancyFromLocalStorage();
  }
}

var hotelRoomsA = [
  new Room('2A', 'Executive Suite','500.00','Pictures/execSuite.jpg',true,'10','placeholder2.svg','Ice Cream Bar','In Room Wet Bar','Hot Tub',false,false,false,'Full Feature Kitchenette')
  ,new Room('2B', 'Family Suite','300.00','Pictures/familySuite.jpg', true,'7','placeholder2.svg','Ice Cream Bar',false,'Hot Tub',false,false,false,'Full Feature Kitchenette')
  ,new Room('1A', 'Basic Economy','50.00','Pictures/execSuite.jpg', true,'4','placeholder2.svg',false,false,false,false,'Refrigerator',false,false)
  ,new Room('1B', 'Family Economy','80.00','placeholder.jpg', true,'5','placeholder2.svg',false,false,false,false,'Refrigerator','Microwave',false)
  ,new Room('1C', 'Business Class','100.00','placeholder.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('2C', 'Business Class','100.00','placeholder.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('1D', 'Business Class','100.00','placeholder.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('2D', 'Business Class','100.00','placeholder.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('1E', 'Business Class','100.00','placeholder.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
];

var hotelA = new Hotel('thisisahotel','itliveshere','hotelPlaceholder.jpg','hotelPlaceholder2.svg',hotelRoomsA);

console.log(hotelA);
window.addEventListener('load', onLoad);

var roomClick1A = document.getElementById('1A');
roomClick1A.addEventListener('click', function(event) {
  console.log(event);
  hotelA.displayRoom(event);
});
var roomClick1B = document.getElementById('1B');
roomClick1B.addEventListener('click', function(event) {
  hotelA.displayRoom(event);
});
var roomClick1C = document.getElementById('1C');
roomClick1C.addEventListener('click', function(event) {
  hotelA.displayRoom(event);
});
var roomClick1D = document.getElementById('1D');
roomClick1D.addEventListener('click', function(event) {
  hotelA.displayRoom(event);
});
var roomClick1E = document.getElementById('1E');
roomClick1E.addEventListener('click', function(event) {
  hotelA.displayRoom(event);
});
var roomClick2A = document.getElementById('2A');
roomClick2A.addEventListener('click', function(event) {
  hotelA.displayRoom(event);
});
var roomClick2B = document.getElementById('2B');
roomClick2B.addEventListener('click', function(event) {
  hotelA.displayRoom(event);
});
var roomClick2C = document.getElementById('2C');
roomClick2C.addEventListener('click', function(event) {
  hotelA.displayRoom(event);
});
var roomClick2D = document.getElementById('2D');
roomClick2D.addEventListener('click', function(event) {
  hotelA.displayRoom(event);
});
