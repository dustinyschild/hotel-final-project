'use strict';

var reserveButton;
var roomsAvailable = [];
var amenitiesAvailable = [];
var checkBoxesList = ['iceCreamBar','wetBar', 'hotTub', 'miniBar', 'fridge', 'microwave', 'kitchenette'];

function filterRooms(){
  var dropdownBox = document.getElementById('dropdown-box');
  var roomTypeSelected = dropdownBox.options[dropdownBox.selectedIndex].value;
  roomsAvailable = [];
  for (var key in hotelA.hotelRooms){
    if (roomTypeSelected === hotelA.hotelRooms[key].roomType && hotelA.hotelRooms[key].isVacant){
      roomsAvailable.push(key);
    }
  }
  colorRooms();
}

function colorRooms(){
  var grayAllRooms = hotelA.getValidRoomNumbers();
  grayAllRooms.forEach(function(item){
    var gray = document.getElementById(item);
    if(gray)
      gray.style.fill = '#919191';
  });
  roomsAvailable.forEach(function(item){
    var avail = document.getElementById(item);
    if(avail)
      avail.style.fill = '#1ea83c';
  });
}

function checkBoxFilter(roomsAvailable) {
  amenitiesAvailable = [];
  roomsAvailable.forEach(function(item){
    for (var property in hotelA.hotelRooms[item]){
      if (property === 'iceCreamBar' ||
      property === 'wetBar' ||
      property === 'hotTub' ||
      property === 'miniBar' ||
      property === 'fridge' ||
      property === 'microwave' ||
      property === 'kitchenette') {
        if (hotelA.hotelRooms[item][property] && amenitiesAvailable.indexOf(hotelA.hotelRooms[item][property]) < 0){
          amenitiesAvailable.push(property);
        }
      }
    }
  });
  updateCheckboxes();
}

function updateCheckboxes(){
  checkBoxesList.forEach(function(item){
    if (amenitiesAvailable.indexOf(item) < 0){
      var inputElement = document.getElementById(item);
      inputElement.disabled = true;
      var labelElement = inputElement.parentElement;
      labelElement.style.color = 'lightgray';
    }
    else {
      var inputElement = document.getElementById(item);
      inputElement.disabled = false;
      var labelElement = inputElement.parentElement;
      labelElement.style.color = 'black';
    }
  });
}

function roomsAvailableByAmenity(amenity){
  for(var i = roomsAvailable.length - 1; i > -1; i--){
    if(!hotelA.hotelRooms[roomsAvailable[i]][amenity]){
      roomsAvailable.splice(i, 1);
    }
  }
}

function onLoad(){
  if(!window.localStorage.roomVacancy){
    hotelA.randomOccupancy();
    hotelA.writeVancanyToLocalStorage();
  }
  else{
    hotelA.getOccupancyFromLocalStorage();
  }
}

function createReservButtonListener(){
  reserveButton = document.getElementsByClassName('btn')[0];
  reserveButton.addEventListener('click', function reserveButtonHandler(event){
    hotelA.updateOccupancy(event);
    hotelA.writeVancanyToLocalStorage();
    hotelA.displayReservationMessage();
    filterRooms();
  });
}

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
  var targetRoom = e.target.getAttribute('id');
  var targetImage = getTargetHotelRommProperty(targetRoom, 'imgSrc', this);
  var targetRoomType = getTargetHotelRommProperty(targetRoom, 'roomType', this);
  var targetRoomRate = getTargetHotelRommProperty(targetRoom, 'roomRate', this);
  var targetRoomOccupancy = getTargetHotelRommProperty(targetRoom, 'allowedOccupancy', this);
  var validTargets = this.getValidRoomNumbers();
  var oldRoom = document.getElementsByClassName('pop-up')[0];
  if(oldRoom){
    oldRoom.remove();
  }
  if(validTargets.indexOf(targetRoom) < 0){
    return;
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
  if(this.hotelRooms[targetRoom].isVacant){
    var newReserve = document.createElement('a');
    newReserve.setAttribute('class','btn');
    newReserve.setAttribute('name',targetRoom);
    newReserve.setAttribute('id', 'button');
    newReserve.innerText = 'Reserve This Room';
    newPopUp.appendChild(newReserve);
    createReservButtonListener();
  }
  else{
    var popUp = document.getElementsByClassName('pop-up')[0];
    var message = document.createElement('h4');
    message.innerText = 'Sorry, This Room is Unavailable.';
    popUp.appendChild(message);
  }
};

Hotel.prototype.randomOccupancy = function(){
  for (var key in this.hotelRooms) {
    if(Math.random() < 0.2){
      this.hotelRooms[key].isVacant = false;
    }
  }
};

Hotel.prototype.getOccupancyFromLocalStorage = function(){
  var vacancy = JSON.parse(window.localStorage.roomVacancy);
  for(var key in this.hotelRooms){
    this.hotelRooms[key].isVacant = vacancy[key];
  }
};

Hotel.prototype.writeVancanyToLocalStorage = function(){
  var vacancy = {};
  for (var key in this.hotelRooms){
    vacancy[key] = this.hotelRooms[key].isVacant;
  }
  window.localStorage.roomVacancy = JSON.stringify(vacancy);
};

Hotel.prototype.updateOccupancy = function(e){
  for (var key in this.hotelRooms){
    if(key === e.target.name){
      this.hotelRooms[key].isVacant = false;
    }
  }
};

Hotel.prototype.displayReservationMessage = function(){
  var button = document.getElementsByClassName('btn')[0];
  button.style.display = 'none';
  var popUp = document.getElementsByClassName('pop-up')[0];
  var message = document.createElement('h4');
  message.innerText = 'Your Room has been Reserved!';
  popUp.appendChild(message);
};

Hotel.prototype.getValidRoomNumbers = function(){
  var roomNumbers = [];
  for(var key in this.hotelRooms){
    roomNumbers.push(key);
  }
  return roomNumbers;
};

var hotelRoomsA = [
  new Room('A1', 'Family Suite','400.00','Pictures/Rooms/family-suite1.jpg',true,'10','placeholder2.svg','Ice Cream Bar','In Room Wet Bar','Hot Tub',false,false,false,'Full Feature Kitchenette')
  ,new Room('A2', 'Family Suite','300.00','Pictures/Rooms/family-suite1.jpg', true,'7','placeholder2.svg','Ice Cream Bar',false,'Hot Tub',false,false,false,'Full Feature Kitchenette')
  ,new Room('A3', 'Basic Economy','50.00','Pictures/Rooms/basic-economy1.jpg', true,'4','placeholder2.svg',false,false,false,false,'Refrigerator',false,false)
  ,new Room('A4', 'Family Economy','80.00','Pictures/Rooms/family-economy1.jpg', true,'5','placeholder2.svg',false,false,false,false,'Refrigerator','Microwave',false)
  ,new Room('A5', 'Business Class','100.00','Pictures/Rooms/business-class1.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('A6', 'Basic Economy','100.00','Pictures/Rooms/basic-economy2.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('A7', 'Basic Economy','100.00','Pictures/Rooms/basic-economy1.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('A8', 'Family Economy','100.00','Pictures/Rooms/family-economy1.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('A9', 'Family Economy','100.00','Pictures/Rooms/family-economy1.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('B1', 'Family Economy','500.00','Pictures/Rooms/family-economy1.jpg',true,'10','placeholder2.svg','Ice Cream Bar','In Room Wet Bar','Hot Tub',false,false,false,'Full Feature Kitchenette')
  ,new Room('B2', 'Basic Economy','300.00','Pictures/Rooms/basic-economy2.jpg', true,'7','placeholder2.svg','Ice Cream Bar',false,'Hot Tub',false,false,false,'Full Feature Kitchenette')
  ,new Room('B3', 'Basic Economy','50.00','Pictures/Rooms/basic-economy1.jpg', true,'4','placeholder2.svg',false,false,false,false,'Refrigerator',false,false)
  ,new Room('B4', 'Family Economy','80.00','Pictures/Rooms/family-economy1.jpg', true,'5','placeholder2.svg',false,false,false,false,'Refrigerator','Microwave',false)
  ,new Room('B5', 'Business Class','100.00','Pictures/Rooms/business-class2.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('B6', 'Business Class','100.00','Pictures/Rooms/business-class3.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('B7', 'Business Class','100.00','Pictures/Rooms/business-class4.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('B8', 'Family Suite','100.00','Pictures/Rooms/family-suite1.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('B9', 'Family Suite','900.00','Pictures/Rooms/bat-suite.jpg', true,'12','placeholder2.svg','Bat Ice Cream Bar','Bat Wet Bar',' Bat Hot Tub',false,false,false,'Bat Kitchenette')
  ,new Room('C1', 'Executive Suite','500.00','Pictures/Rooms/executive-suite1.jpg',true,'10','placeholder2.svg','Ice Cream Bar','In Room Wet Bar','Hot Tub',false,false,false,'Full Feature Kitchenette')
  ,new Room('C2', 'Executive Suite','300.00','Pictures/Rooms/executive-suite1.jpg', true,'7','placeholder2.svg','Ice Cream Bar',false,'Hot Tub',false,false,false,'Full Feature Kitchenette')
  ,new Room('C3', 'Executive Suite','50.00','Pictures/Rooms/executive-suite1.jpg', true,'4','placeholder2.svg',false,false,false,false,'Refrigerator',false,false)
  ,new Room('C4', 'Executive Suite','80.00','Pictures/Rooms/executive-suite1.jpg', true,'5','placeholder2.svg',false,false,false,false,'Refrigerator','Microwave',false)
  ,new Room('C5', 'Business Class','100.00','Pictures/Rooms/business-class5.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('C6', 'Business Class','100.00','Pictures/Rooms/business-class1.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('C7', 'Business Class','100.00','Pictures/Rooms/business-class2.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('C8', 'Business Class','100.00','Pictures/Rooms/business-class3.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
  ,new Room('C9', 'Business Class','100.00','Pictures/Rooms/business-class4.jpg', true,'3','placeholder2.svg',false,false,'Hot Tub','Mini-Bar',false,'Microwave',false)
];

var hotelA = new Hotel('thisisahotel','itliveshere','hotelPlaceholder.jpg','hotelPlaceholder2.svg',hotelRoomsA);

window.addEventListener('load', onLoad);

window.addEventListener('click', function(event){
  if(event.target.id === 'button'){
    return;
  }
  hotelA.displayRoom(event);
});

var dropdown = document.getElementById('dropdown-box');
dropdown.addEventListener('change', function(){
  filterRooms();
  checkBoxFilter(roomsAvailable);
});

var checkboxes = (document.querySelectorAll('.checkBox'));
checkboxes.forEach(function(item){
  item.addEventListener('change', function(event){
    if (document.getElementById(event.target.id).checked) {
      roomsAvailableByAmenity(event.target.id);
      checkBoxFilter(roomsAvailable);
      colorRooms();
    } else {
      checkboxes.forEach(function(item){
        item.checked = false;
      }); //uncheck all the boxes, this is a hack and bad user experience, find a way to fix properly if time allows
      filterRooms();
      checkBoxFilter(roomsAvailable);
    }
  });
});
