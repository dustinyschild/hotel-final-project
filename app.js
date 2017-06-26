'use strict';

function Rooms(roomId,roomType,imgSrc,isVacant,allowedOccupancy,roomLayoutSrc,iceCreamBar,wetBar,poolSide,hotTub,miniBar,fridge,microwave,kitchenette){
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

Rooms.prototype.displayRoom = function(){
  //build display of room information to show when li is selected
};

function Hotels(hotelImgSrc,hotelLayoutSrc, rooms){
  this.hotelImgSrc = hotelImgSrc;
  this.hotelLayoutSrc = hotelLayoutSrc;
  this.rooms = rooms || [];
}
