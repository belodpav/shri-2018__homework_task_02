function Man(x, y, direction) {
  this._x = x;
  this._y = y;

  this._node = createGameObj('man');

  this._direction = direction || 'all';
  
  initManEvents.call(this);
}

function initManEvents() {
  const node = this._node;

  node.addEventListener('pointermove', _onManMove.bind(this));
  node.addEventListener('pointerup', _onManPointerUp.bind(this));
}

function _onManPointerUp() {
  this._node.className = 'man';
}

Man.prototype.update = function() {
  updateNodePos.call(this);
}

function _onManMove(e) {
  const newPos = {
    x: e.clientX,
    y: e.clientY
  };
  const dif = {
    x: newPos.x - this._x,
    y: newPos.y - this._y
  };

  if (this._direction === 'all') {
    if (isSwipeToTop(dif) || isSwipeToBottom(dif)) {
      this._node.classList.add('man_run_up');
    }

    if (isSwipeToRight(dif)) {
      this._node.classList.add('man_run_right');
    }

    if (isSwipeToLeft(dif)) {
      this._node.classList.add('man_run_left');
    
    }

    this._x = e.clientX + this._node.offsetWidth / 2 <= 0 ? 0 : e.clientX;
    this._y = e.clientY + this._node.offsetHeight / 2 <= 0 ? 0 : e.clientY;
  } 


  if (this._direction === 'up') {
    this._node.classList.add('man_run_up');

    this._y = e.clientY + this._node.offsetHeight / 2 <= 0 ? 0 : e.clientY;
  }
  

  updateNodePos.call(this);
}


function updateNodePos() {
  this._node.style.top = (this._y - this._node.offsetHeight / 2) + 'px';
  this._node.style.left = (this._x - this._node.offsetWidth / 2) + 'px';
  this._node.style.zIndex = Math.floor(this._y - this._node.offsetHeight / 2);
}


function createGameObj(name) {
  const node = document.createElement('div');
  node.className = name;

  return node;
}


function WorldDoor(x, y, width, height) {
  this._x = x;
  this._y = y;
  this._count = 0;


  this._node = createGameObj('world-door');
  updateNodePos.call(this);
  //initDoorEvents.call(this);
}

WorldDoor.prototype.update = function() {
  updateNodePos.call(this);
};

WorldDoor.prototype.incCount = function() {
  this._count++;
};