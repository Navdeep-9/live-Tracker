  const socket = io();

  // Prompt the user for input
let userInput = prompt("Please enter something:");

// Display the user's input
alert("You entered: " + userInput);



  if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const { latitude,longitude} = position.coords;

        socket.emit('send-location',{latitude,longitude,userInput});
    },
    (error)=>{
        console.error(error);
    },{
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0,
    }
)
  }


  const map = L.map('map').setView([0,0],16);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map)

const markers = {}

socket.on('current-location', (newdata) => {
    const { id, latitude, longitude, userInput } = newdata;

    map.setView([latitude, longitude], 16);

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
        markers[id].bindPopup(userInput).openPopup(); // Update popup with userInput
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
        markers[id].bindPopup(userInput).openPopup(); // Add new marker with popup showing userInput
    }
});


  socket.on('user-disconnect',(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }

  })