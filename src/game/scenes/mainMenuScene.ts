import Phaser from 'phaser';
import GameParameters from  '../Shared/gameParameters';
import Button from '../components/UI/button';
import GameHelpers from '../Shared/gameHelpers';
import LocalStorageHelpers from '../Shared/localStorageHelpers';
import LanguageHelpers from '../Shared/languageHelpers';
import SFXHelpers from '../Shared/sFXHelpers';

export default class MainMenuScene extends Phaser.Scene {

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private buttonSettings!: Button;
    private buttonStart!: Button;
    private buttonAdrenaline!: Button;

    constructor() {
        super('MainMenu');
    };

    create() {
         SFXHelpers.manage('music', 'init', this);
         SFXHelpers.manage('sound', 'init', this);

        this.cursors = this.input.keyboard!.createCursorKeys();   
        this.input.keyboard!.on('keydown', this.handleKeyBoard, this);

        this.add.sprite(0, 0, 'background').setOrigin(0,0);

        this.buttonSettings = new Button(this, 20, 20, 'button-settings', this.clickSettings);
        this.buttonSettings.setOrigin(0, 0);

        this.buttonStart = new Button(this, GameParameters.worldParameters.width-20, GameParameters.worldParameters.height-20, 'button-start', this.clickStart);
        this.buttonStart.setOrigin(1, 1);

        this.buttonAdrenaline = new Button(this, 20, GameParameters.worldParameters.height-40, 'logo', this.clickAdrenaline).setScale(0.5, 0.5);
        this.buttonAdrenaline.setOrigin(0, 1);

		LocalStorageHelpers.initUnset('APT-highscore', 0);
		let highscore : string  = LocalStorageHelpers.get('APT-highscore') ?? "0";

        var title = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY-50, 'title');
        title.setOrigin(0.5);       
        
        this.tweens.add({targets: title, angle: title.angle-12, duration: 600, ease: 'Sine.inOut' });
        this.tweens.add({targets: title, angle: title.angle+14, duration: 1200, ease: 'Sine.inOut', yoyo: true, repeat: -1, delay: 600 });

		var fontHighscore = { font: '38px '+LanguageHelpers.getText('FONT'), fill: '#D63384', stroke: '#000', strokeThickness: 5 };
		var textHighscore = this.add.text(GameParameters.worldParameters.width-30, 60, LanguageHelpers.getText('menu-highscore')+highscore, fontHighscore);
		textHighscore.setOrigin(1, 0);

		this.buttonStart.x = GameParameters.worldParameters.width+this.buttonStart.width+20;
        this.tweens.add({targets: this.buttonStart, x: GameParameters.worldParameters.width-20, duration: 500, ease: 'Back'});

		this.buttonAdrenaline.x = -this.buttonAdrenaline.width-20;
        this.tweens.add({targets: this.buttonAdrenaline, x: 20, duration: 500, ease: 'Back'});

         this.buttonSettings.y = -this.buttonSettings.height-20;
         this.tweens.add({targets: this.buttonSettings, y: 20, duration: 500, ease: 'Back'});

        textHighscore.y = -textHighscore.height-30;
        this.tweens.add({targets: textHighscore, y: 40, duration: 500, delay: 100, ease: 'Back'});

        //this.cameras.main.fadeIn(250);
    };   

    handleKeyBoard(e: KeyboardEvent) {
        switch(e.code) {
            case 'KeyS': {
                this.clickSettings();
                break;
            }
            case 'Enter': {
                this.clickStart();
                break;
            }
            default: {}
        }
    };

    clickAdrenaline() {
        SFXHelpers.play('click');
        GameHelpers.redirectToExternalSite('https://adr-enaline.com');
    };

    clickSettings() {
        SFXHelpers.play('click');
        GameHelpers.fadeOutScene('Settings', this);        
    };

    clickStart() {
        SFXHelpers.play('click');
        GameHelpers.fadeOutScene('HowTo', this);    
    };
}