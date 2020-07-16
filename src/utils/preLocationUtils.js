/* eslint-disable */
function setPreLocation(preLocation) {
  let loc = preLocation;
  if (!loc) {
    loc = window.location.pathname;
  }
  if (!window.mj_pre_location && loc !== '/' && !loc.includes('login')) {
    window.mj_pre_location = loc;
  }
}

function getPreLocation() {
  return window.mj_pre_location;
}

function clearPreLocation() {
  window.mj_pre_location = undefined;
}

export { setPreLocation, getPreLocation, clearPreLocation };
