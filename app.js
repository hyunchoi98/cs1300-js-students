var corsApiUrl = "https://cors-anywhere.herokuapp.com/";
// TODO: REPLACE YOUR TOKEN
var apiToken = "?token=09Rc-MndEISM8wpUoPlQfIDVFgUVUJyC_X-jjrsrOP4";

// CORS stands for "cross origin resource sharing" -- you'll be making http requests in order
// DON'T CHANGE THIS: fetches the data from the API endpoint
const doCORSRequest = (options) => {
  var x = new XMLHttpRequest();
  x.open("GET", corsApiUrl + options.url);
  x.send(options.data);
  return x;
};

// Example promise that executes the GET request above and waits for it to finish before resolving
const corsPromise = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants" + apiToken,
    });
    resolve(request);
  });

// THIS IS SOME SAMPLE CODE FOR HOW TO USE PROMISES -- feel free to adapt this into a function!
corsPromise().then(
  (request) =>
    (request.onload = request.onerror = function () {
      // TODO: ADD FUNCTION, ETC. FOR WHATEVER YOU WANT TO DO ONCE THE DATA IS RECEIVED
      const plantData = JSON.parse(request.response).data;
    })
);

//// TODO: ADD WHATEVER FUN CONTENT YOU WANT ////
const search = () =>
  new Promise((resolve, reject) => {
    const request = doCORSRequest({
      url: "https://trefle.io/api/v1/plants/search" + apiToken + "&q=" + document.getElementById('name').value,
    });
    resolve(request);
  });

const search2 = () => {
  search().then(
    (request) => 
    (request.onload = request.onerror = () => {
      const plantData = JSON.parse(request.response).data;
      const plantHTML = plantData.map(plant => plantDiv(plant));

      console.log(plantHTML);

      let results = document.getElementById('results');
      results.innerHTML = '';
      console.log(results.length);
      for (let i = 0; i < plantData.length; i++) {
        results.append(plantHTML[i]);
      }
      console.log(plantData);
    })
  )

};

const plantDiv = (plantJS) => {
  const newDiv = document.createElement("div"); 
  
  const name = document.createTextNode('Name: ' + plantJS['common_name']);
  const family = document.createTextNode('Family: ' + plantJS['family'] );
  const genus = document.createTextNode('Genus: ' + plantJS['genus']);
  var img = document.createElement('img');
  img.width = '200';
  img.src = plantJS['image_url'];
  
  // add the text node to the newly created div
  newDiv.appendChild(img);
  newDiv.appendChild(document.createElement('br'));
  newDiv.appendChild(name);
  newDiv.appendChild(document.createElement('br'));
  newDiv.appendChild(family);
  newDiv.appendChild(document.createElement('br'));
  newDiv.appendChild(genus);
  newDiv.appendChild(document.createElement('br'));

  newDiv.style.margin = "50px 10px"
  return newDiv;
}