'use strict';

function Rooms(roomId,roomType,extras,imgSrc,isVacant,allowedOccupancy,roomLayoutSrc){
  this.roomId = roomId;
  this.roomType = roomType;
  this.extras = extras;
  this.imgSrc = imgSrc;
  this.isVacant = isVacant;
  this.allowedOccupancy = allowedOccupancy;
  this.roomLayoutSrc = roomLayoutSrc;

}

Rooms.prototype.displayRoom = function(){
  //build display of room information to show when li is selected
};

function Hotels(){
  //build a hotel
}
