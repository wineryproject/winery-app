// @ts-check

export function initialize(application ) {
  if (typeof FastBoot === 'undefined') {
  // application.inject('route', 'foo', 'service:foo');
  let {geolocation} = navigator;
  //application.deferReadiness();
  // console.log("hi! geoloc");
  // geolocation.getCurrentPosition((pos)=>{
  // let {
  //   coords: {latitude, longitude} 
  // }= pos;
  // displayIt(latitude, longitude);
  // application.register("data:location", {lat: latitude, long: longitude}, {instantiate : false});
//})
  } else {
    application.register('data:location', {latitude: -1, longitude : -1}, {instantiate :false})
  }
}

export default {
  name: 'geolocation',
  initialize
};



function displayIt(latitude, longitude) {
  console.log("latitude = "+latitude);
}
