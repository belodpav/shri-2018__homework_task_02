// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function(b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия второй двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    var door = new WorldDoor(200, 180, 180, 180);
    var guys = [new Man(40, 400), new Man(160, 400)];    
    

    this.popup.querySelector('.door-riddle').appendChild(door._node);
    door.update();
    for (var i = 0; i < guys.length; i++) {      
      this.popup.querySelector('.door-riddle').appendChild(guys[i]._node);
      guys[i].update();
    }


    this.popup.addEventListener('pointermove', _onDocMove.bind(this));

    function _onDocMove(e) {
      door._count = 0;

      guys.forEach(function(guy) {
        if (isManInDoor(guy, door)) {
          door.incCount();
        }

      })
      
      if (door._count === guys.length) {
        this.unlock();
      }
    }

    // ==== END Напишите свой код для открытия второй двери здесь ====
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия третей двери здесь ====
    // Для примера дверь откроется просто по клику на неё
    var ladder = this.popup.querySelector('.ladder');
    var door = new WorldDoor(document.body.clientWidth / 2, 100, 180, 180);
    var man = new Man(document.body.clientWidth / 2, 500, 'up');  
    
    this.popup.querySelector('.door-riddle').appendChild(door._node);
    this.popup.querySelector('.door-riddle').appendChild(man._node);
    door.update();  
    man.update();

    this.popup.addEventListener('pointermove', _onDocMove.bind(this));

    function _onDocMove(e) {
      door._count = 0;

      if (isManInDoor(man, door)) {
        door.incCount();
      }
      
      if (door._count === 1) {
        this.unlock();
      }
    }

    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия сундука здесь ====
    // Для примера сундук откроется просто по клику на него
    var ladder = this.popup.querySelector('.ladder');
    var door = new WorldDoor(document.body.clientWidth / 2, 300, 180, 180);
    
    var guys = [
      new Man(document.body.clientWidth / 2, 50, 'up'),
      new Man(document.body.clientWidth / 2, 500, 'up') 
    ];
    
    
    
    this.popup.querySelector('.door-riddle').appendChild(door._node);
    door.update();  
    for (var i = 0; i < guys.length; i++) {      
      this.popup.querySelector('.door-riddle').appendChild(guys[i]._node);
      guys[i].update();
    }
      

    this.popup.addEventListener('pointermove', _onDocMove.bind(this));

    function _onDocMove(e) {
      door._count = 0;

      guys.forEach(function(guy) {
        if (isManInDoor(guy, door)) {
          door.incCount();
        }

      })
      
      if (door._count === guys.length) {
        this.unlock();
      }
      
    }
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
