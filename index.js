let timerEvent;
let count = 0;
let numberText = '4,123,456.12';
let lastDigit = numberText.charAt(numberText.length - 1);
let textA;
let outputValue = '';
let outputText;

class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    create() {
        // 設置顯示數字的 Text 對象
        var textWord = this.add.text(100, 100, numberText)
        outputText = this.add.text(200, 200, '0', { fontSize: '32px', fill: '#fff' });
        textA = this.add.text(400, 300, '0', { fontSize: '32px', fill: '#fff' });
        textA.setOrigin(0.5);

        timerEvent = this.time.addEvent({
            delay: 200,
            callback: onTimerTick,
            callbackScope: this,
            loop: true,
        });
    }
}

function onTimerTick() {
    // console.log('%c⧭', 'color: #00a3cc', numberText);
    
    if (count > 10) {
        timerEvent.destroy();
        return;
    }
    
    
    if (lastDigit === 0 || lastDigit === '.' || lastDigit === ',') {
        reset()
        return ;
    }
    
    else if (count === Number(lastDigit)) {
        reset()
        return ;
    }
    
    
    textA.setText(count.toString());
    count++;
    
    outputValue = `${count.toString()}${outputValue.slice(1)}`
    outputText.setText(outputValue)
}

function reset() {
    numberText = numberText.slice(0, -1);
    console.log('%c⧭', 'color: #aa00ff', numberText);
    lastDigit = numberText.charAt(numberText.length - 1);
    console.log('%c⧭', 'color: #e50000', lastDigit);

    if (numberText === '' || lastDigit === '') {
        timerEvent.destroy();
        return;
    }

    if (lastDigit === '.' || lastDigit === ',') {
        outputValue = lastDigit + outputValue
        outputText.setText(outputValue)
        return ;
    }

    outputValue = '0' + outputValue
    outputText.setText(outputValue)

    textA.setText(count.toString());
    count = 0;
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