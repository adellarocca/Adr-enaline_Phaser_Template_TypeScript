import GameParameters from  '../Shared/gameParameters';
import Button from '../components/UI/button';
import LanguageHelpers from '../Shared/languageHelpers';
import GameHelpers from '../Shared/gameHelpers';
import SFXHelpers from '../Shared/sFXHelpers';

export default class HowToScene extends Phaser.Scene {

    private buttonBack!: Button;
    private buttonContinue!: Button;

    constructor() {
        super('HowTo');
    };
	
    create() {
		this.add.sprite(0, 0, 'background').setOrigin(0,0);

		var fontStory = { font: '48px '+ LanguageHelpers.getText('FONT'), fill: '#D63384', stroke: '#000', strokeThickness: 7, align: 'center' };
		var textStory = this.add.text(GameParameters.worldParameters.centerX, 200, LanguageHelpers.getText('screen-story-howto'), fontStory);
		textStory.setOrigin(0.5,0);

        this.buttonBack = new Button(this, 20, 20, 'button-back', () =>{this.clickBack('');});
        this.buttonBack.setOrigin(0, 0);
        this.buttonBack.y = -this.buttonBack.height-20;
        this.tweens.add({targets: this.buttonBack, y: 20, duration: 500, ease: 'Back'});

		this.buttonContinue = new Button(this, GameParameters.worldParameters.width-20, GameParameters.worldParameters.height-20, 'button-continue', this.clickContinue);
		this.buttonContinue.setOrigin(1,1);

		this.buttonContinue.x = GameParameters.worldParameters.width + this.buttonContinue.width+20;
		this.tweens.add({targets: this.buttonContinue, x: GameParameters.worldParameters.width-20, duration: 500, ease: 'Back'});

        //this.cursors = this.input.keyboard!.createCursorKeys();   
        this.input.keyboard!.on('keydown', this.clickContinue, this);

		this.cameras.main.fadeIn(250, 0, 0, 0);
	};

	clickContinue() {
		SFXHelpers.play('click');
		GameHelpers.fadeOutScene('Game', this);
	};

	clickBack(name: string) {
		SFXHelpers.play('click');
		GameHelpers.fadeOutScene('MainMenu', this);
	};   
};