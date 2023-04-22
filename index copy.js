let timerEvent;
let count = 0;
let numberText = '4123456';
let textA;
let output = '';

class Example extends Phaser.Scene {
  constructor() {
    super();
  }

  create() {
    // 設置顯示數字的 Text 對象
    textA = this.add.text(400, 300, '0', { fontSize: '32px', fill: '#fff' });
    textA.setOrigin(0.5);

    timerEvent = this.time.addEvent({
      delay: 1000,
      callback: onTimerTick,
      callbackScope: this,
      loop: true,
    });
  }
}

function onTimerTick() {


  if (count > 10 || textA.text === numberText) {
    timerEvent.destroy();
    return;
  }

  const lastDigit = numberText.charAt(numberText.length - 1);
  console.log('%c⧭', 'color: #00e600', lastDigit);

  if (count === Number(lastDigit)) {
    output = output + lastDigit;
    numberText = numberText.slice(0, -1);
    textA.setText(count.toString());
    return ;
  }

  count++;
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: Example,
};

const game = new Phaser.Game(config);