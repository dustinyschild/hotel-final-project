'use strict';

function Room(roomId,roomType,imgSrc,isVacant,allowedOccupancy,roomLayoutSrc,iceCreamBar,wetBar,hotTub,miniBar,fridge,microwave,kitchenette){
  this.roomId = roomId;
  this.roomType = roomType;
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

Room.prototype.displayRoom = function(){
  //build display of room information to show when li is selected
};

function Hotel(hotelImgSrc,hotelLayoutSrc, hotelRooms){
  this.hotelImgSrc = hotelImgSrc;
  this.hotelLayoutSrc = hotelLayoutSrc;
  this.hotelRooms = hotelRooms || [];
}

var hotelRoomsA = [
  new Room('2A', 'Executive Suite','placeholder.jpg',true,'10','placeholder2.svg',true,true,true,false,false,false,true)
  ,new Room('2B', 'Family Suite','placeholder.jpg', true,'7','placeholder2.svg',true,false,true,false,false,false,true)
  ,new Room('1A', 'Basic Economy','placeholder.jpg', true,'4','placeholder2.svg',false,false,false,false,true,false,false)
  ,new Room('1B', 'Family Economy','placeholder.jpg', true,'5','placeholder2.svg',false,false,false,false,true,true,false)
  ,new Room('1C', 'Business Class','placeholder.jpg', true,'3','placeholder2.svg',false,false,true,true,false,true,false)
];

var hotelA = new Hotel('hotelPlaceholder.jpg','hotelPlaceholder2.svg',hotelRoomsA);
