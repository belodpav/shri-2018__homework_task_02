const MAN_IN_DOOR_RANGE = 80;
const SWIPE_D = 1;

function isSwipeToRight(dif) {
  if (dif.x > SWIPE_D && dif.y <= SWIPE_D && dif.y >= -SWIPE_D) {
    return true;
  }

  return false;
}

function isSwipeToLeft(dif) {
  if (dif.x < -SWIPE_D && dif.y <= SWIPE_D && dif.y >= -SWIPE_D) {
    return true;
  }

  return false;
}

function isSwipeToTop(dif) {
  if (dif.y < -SWIPE_D && dif.x <= SWIPE_D && dif.x >= -SWIPE_D) {
    return true;
  }
  
  return false;
}

function isSwipeToBottom(dif) {
  if (dif.y > SWIPE_D && dif.x <= SWIPE_D && dif.x >= -SWIPE_D) {
    return true;
  }

  return false;
}

function isManInDoor(man, door) {
  const dx = man._x - door._x;
  const dy = man._y - door._y;
  const d = Math.sqrt(dx*dx + dy*dy);
  
  if (d <= MAN_IN_DOOR_RANGE) {
    return true;
  }

  return false;
}