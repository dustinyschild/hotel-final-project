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
  this.randomOccupancy();
}

Hotel.prototype.buildRooms = function(roomsList){
  var roomsHere = {};
  roomsList.forEach(function(item){
    roomsHere[item.roomId] = item;
  });
  this.hotelRooms = roomsHere;
};

var roomClick1A = document.getElementById('1A');
roomClick1A.addEventListener('click', displayRoom);

function displayRoom() {
//var testImage = '';

  if(document.getElementsByClassName('pop-up')) {
    var oldRoom = document.getElementsByClassName('pop-up')[0];
    oldRoom.remove();
    console.log('deleted old');
  }
  var popUpContainer = document.getElementsByClassName('hotel-container')[0];
  var newPopUp = document.createElement('div');
  newPopUp.className = 'pop-up';
  popUpContainer.appendChild(newPopUp);
  var roomImage = document.createElement('img');
  roomImage.setAttribute('src', 'Pictures/testimage.png');
  newPopUp.appendChild(roomImage);
  var roomNumber = document.createElement('h3');
  roomNumber.innerText = 'some text here';
  newPopUp.appendChild(roomNumber);
  var itemList = document.createElement('ul');
  newPopUp.appendChild(itemList);
  var roomType = document.createElement('li');
  roomType.innerText = 'room type here';
  itemList.appendChild(roomType);
  var roomAmenities = document.createElement('li');
  roomAmenities.innerText = 'Amenities listed here';
  itemList.appendChild(roomAmenities);
  var roomRate = document.createElement('li');
  roomRate.innerText = 'price here';
  itemList.appendChild(roomRate);
  var roomOccupancy = document.createElement('li');
  roomOccupancy.innerText = 'max occupancy here';
  itemList.appendChild(roomOccupancy);
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
  //what it says on the tin.  Update occupancy in this.hotelRooms from local storage -- remember to not run randomOccupancy method automatically if there are values in local storage.
};

function writeVancanyToLocalStorage(){
  // use this to write our occupanies to local storage
}

var hotelRoomsA = [
  new Room('2A', 'Executive Suite','500.00','Pictures/execSuite.jpg',true,'10','placeholder2.svg',true,true,true,false,false,false,true)
  ,new Room('2B', 'Family Suite','300.00','Pictures/familySuite.jpg', true,'7','placeholder2.svg',true,false,true,false,false,false,true)
  ,new Room('1A', 'Basic Economy','50.00','placeholder.jpg', true,'4','placeholder2.svg',false,false,false,false,true,false,false)
  ,new Room('1B', 'Family Economy','80.00','placeholder.jpg', true,'5','placeholder2.svg',false,false,false,false,true,true,false)
  ,new Room('1C', 'Business Class','100.00','placeholder.jpg', true,'3','placeholder2.svg',false,false,true,true,false,true,false)
  ,new Room('2C', 'Business Class','100.00','placeholder.jpg', true,'3','placeholder2.svg',false,false,true,true,false,true,false)
  ,new Room('1D', 'Business Class','100.00','placeholder.jpg', true,'3','placeholder2.svg',false,false,true,true,false,true,false)
  ,new Room('2D', 'Business Class','100.00','placeholder.jpg', true,'3','placeholder2.svg',false,false,true,true,false,true,false)
  ,new Room('1E', 'Business Class','100.00','placeholder.jpg', true,'3','placeholder2.svg',false,false,true,true,false,true,false)
];

var hotelA = new Hotel('thisisahotel','itliveshere','hotelPlaceholder.jpg','hotelPlaceholder2.svg',hotelRoomsA);
console.log(hotelA);
