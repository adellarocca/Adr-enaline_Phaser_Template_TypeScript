import Phaser from 'phaser';
import GameParameters from  '../Shared/gameParameters';
import Button from '../components/UI/button';
import GameHelpers from '../Shared/gameHelpers';
import LocalStorageHelpers from '../Shared/localStorageHelpers';
import LanguageHelpers from '../Shared/languageHelpers';
import SFXHelpers from '../Shared/sFXHelpers';

export default class SettingsScene extends Phaser.Scene {
	
	private screenName: string = 'settings';
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	private buttonBack!: Button;
	private buttonSound!: Button;
	private buttonCredits!: Button;
	private buttonMusic!: Button;

	private containerCredits!: Phaser.GameObjects.Container;
	private containerKeyboard!: Phaser.GameObjects.Container;
	private textSound!: any;
	private textMusic!: any;
	private textCredits!: any;
	private helpText!: any;

    constructor() {
        super('Settings');	
    }

    create() {




		this.add.sprite(0, 0, 'background').setOrigin(0, 0);
		
		this.cursors = this.input.keyboard!.createCursorKeys();   
		this.input.keyboard!.on('keydown', this.handleKeyBoard, this);		

		this.buttonBack = new Button(this, 20, 20, 'button-back', () =>{this.clickBack('');});
		this.buttonBack.setOrigin(0, 0);
		this.buttonBack.y = -this.buttonBack.height-20;
		this.tweens.add({targets: this.buttonBack, y: 20, duration: 500, ease: 'Back'});

		var fontTitle = { font: '46px ' + LanguageHelpers.getText('FONT'), fill: '#D63384', stroke: '#000', strokeThickness: 7, align: 'center' };
		var fontSubtitle = { font: '38px '+LanguageHelpers.getText('FONT'), fill: '#D63384', stroke: '#000', strokeThickness: 5, align: 'center' };
		var fontSmall = { font: '28px '+LanguageHelpers.getText('FONT'), fill: '#D63384', stroke: '#000', strokeThickness: 4, align: 'center' };
		var titleSettings = this.add.text(GameParameters.worldParameters.centerX, 60, LanguageHelpers.getText('settings'), fontTitle);
		titleSettings.setOrigin(0.5, 0.5);
		var offsetLeft = 130;
		
		this.buttonSound = new Button(this, offsetLeft+40, 250, 'button-sound-on', this.clickSound);
		this.buttonSound.setOrigin(0.5, 0.5);
		this.textSound = this.add.text(offsetLeft+30+this.buttonSound.width, 250, LanguageHelpers.getText('sound-on'), fontSubtitle);
		this.textSound.setOrigin(0, 0.5);
		this.buttonMusic = new Button(this, offsetLeft+40, 375, 'button-music-on', this.clickMusic,);
		this.buttonMusic.setOrigin(0.5, 0.5);
		this.textMusic = this.add.text(offsetLeft+30+this.buttonMusic.width, 375, LanguageHelpers.getText('music-on'), fontSubtitle);
		this.textMusic.setOrigin(0, 0.5);
		this.buttonCredits = new Button(this, offsetLeft+40, 500, 'button-credits', this.clickCredits);
		this.buttonCredits.setOrigin(0.5, 0.5);
		this.textCredits = this.add.text(offsetLeft+30+this.buttonCredits.width, 500, LanguageHelpers.getText('credits'), fontSubtitle);
		this.textCredits.setOrigin(0, 0.5);

		SFXHelpers.update('sound', this.buttonSound, this.textSound);
		SFXHelpers.update('music', this.buttonMusic, this.textMusic);

		this.buttonSound.setScale(0.5);
		this.tweens.add({targets: this.buttonSound, scaleX: 1, scaleY: 1, duration: 500, delay: 0, ease: 'Cubic.easeOut' });
		this.textSound.setScale(0.5);
		this.tweens.add({targets: this.textSound, scaleX: 1, scaleY: 1, duration: 500, delay: 0, ease: 'Cubic.easeOut' });
		this.buttonMusic.setScale(0.5);
		this.tweens.add({targets: this.buttonMusic, scaleX: 1, scaleY: 1, duration: 500, delay: 250, ease: 'Cubic.easeOut' });
		this.textMusic.setScale(0.5);
		this.tweens.add({targets: this.textMusic, scaleX: 1, scaleY: 1, duration: 500, delay: 250, ease: 'Cubic.easeOut' });
		this.buttonCredits.setScale(0.5);
		this.tweens.add({targets: this.buttonCredits, scaleX: 1, scaleY: 1, duration: 500, delay: 500, ease: 'Cubic.easeOut' });
		this.textCredits.setScale(0.5);
		this.tweens.add({targets: this.textCredits, scaleX: 1, scaleY: 1, duration: 500, delay: 500, ease: 'Cubic.easeOut' });

		if(this.sys.game.device.os.desktop) {
			this.helpText = this.add.text(GameParameters.worldParameters.centerX, GameParameters.worldParameters.height-250, LanguageHelpers.getText('keyboard-info'), fontSmall);
			this.helpText.setOrigin(0.5,1);
			this.helpText.setScale(0.5);
			this.tweens.add({targets: this.helpText, scaleX: 1, scaleY: 1, duration: 500, delay: 750, ease: 'Cubic.easeOut' });
		}

		var offsetTopCredits = 20;
		var offsetTopCrew = 550;
		this.containerCredits = this.add.container(0, GameParameters.worldParameters.height);
		var creditsBg = this.add.sprite(0, 0, 'background');
		creditsBg.setOrigin(0, 0);
		var creditsBack = new Button(this, 20, 20, 'button-back', () =>{this.clickBack('credits');});
		creditsBack.setOrigin(0, 0);

		var titleCredits = this.add.text(GameParameters.worldParameters.centerX, offsetTopCredits+40, LanguageHelpers.getText('credits'), fontTitle);
		titleCredits.setOrigin(0.5);
		var titleCreditsText = this.add.text(GameParameters.worldParameters.centerX, offsetTopCredits+170, LanguageHelpers.getText('madeby'), fontSubtitle);
		titleCreditsText.setOrigin(0.5,0);
		var titleCreditsLogo = new Button(this, GameParameters.worldParameters.centerX, offsetTopCredits+270, 'logo', this.clickAdrenaline).setScale(0.5, 0.5);;
		titleCreditsLogo.setOrigin(0.5,0);
		var titleCreditsUrl = this.add.text(GameParameters.worldParameters.centerX, offsetTopCredits+400, 'adr-enaline.com', fontSubtitle);
		titleCreditsUrl.setOrigin(0.5,0);
		titleCreditsUrl.setInteractive({ useHandCursor: true });
		titleCreditsUrl.on('pointerdown', () => { this.clickAdrenaline(); }, this);

		var titleCrew = this.add.text(GameParameters.worldParameters.centerX, offsetTopCrew, LanguageHelpers.getText('team'), fontSubtitle);
		titleCrew.setOrigin(0.5,0);
		var titleCrewAndrzej = this.add.text(GameParameters.worldParameters.centerX, offsetTopCrew+80, 'T0dl4b4l - '+LanguageHelpers.getText('coding'), fontSubtitle);
		titleCrewAndrzej.setOrigin(0.5,0);
		var titleCreditsMusic = this.add.text(GameParameters.worldParameters.centerX, offsetTopCrew+320, LanguageHelpers.getText('musicby')+' Kenney', fontSubtitle);
		titleCreditsMusic.setOrigin(0.5,0);

		this.containerCredits.add([creditsBg,creditsBack,titleCredits,titleCreditsText,titleCreditsLogo,titleCreditsUrl]);
		this.containerCredits.add([titleCrew,titleCrewAndrzej,titleCreditsMusic]);

		this.containerKeyboard = this.add.container();
		this.containerKeyboard.y = GameParameters.worldParameters.height;
		
		var offsetTopKeyboard = 20;
		var keyboardBg = this.add.sprite(0, 0, 'background');
		keyboardBg.setOrigin(0,0);
		var titleKeyboard = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+40, LanguageHelpers.getText('key-title'), fontTitle);
		titleKeyboard.setOrigin(0.5);
		var titleKeySettingsTitle = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+90, LanguageHelpers.getText('key-settings-title'), fontSubtitle);
		titleKeySettingsTitle.setOrigin(0.5,0);
		var titleKeySettings = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+140, LanguageHelpers.getText('key-settings-onoff'), fontSmall);
		titleKeySettings.setOrigin(0.5,0);
		var titleKeyAudio = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+180, LanguageHelpers.getText('key-audio'), fontSmall);
		titleKeyAudio.setOrigin(0.5,0);
		var titleKeyMusic = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+220, LanguageHelpers.getText('key-music'), fontSmall);
		titleKeyMusic.setOrigin(0.5,0);
		var titleKeyCredits = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+260, LanguageHelpers.getText('key-credits'), fontSmall);
		titleKeyCredits.setOrigin(0.5,0);
		var titleKeyKeyboard = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+300, LanguageHelpers.getText('key-shortcuts'), fontSmall);
		titleKeyKeyboard.setOrigin(0.5,0);

		var titleKeyMenuTitle = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+350, LanguageHelpers.getText('key-menu'), fontSubtitle);
		titleKeyMenuTitle.setOrigin(0.5,0);
		var titleKeySettings2 = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+400, LanguageHelpers.getText('key-settings-onoff'), fontSmall);
		titleKeySettings2.setOrigin(0.5,0);
		var titleKeyStart = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+440, LanguageHelpers.getText('key-start'), fontSmall);
		titleKeyStart.setOrigin(0.5,0);

		var titleKeyGameTitle = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+490, LanguageHelpers.getText('key-gameplay'), fontSubtitle);
		titleKeyGameTitle.setOrigin(0.5,0);
		var titleKeyButton = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+540, LanguageHelpers.getText('key-button'), fontSmall);
		titleKeyButton.setOrigin(0.5,0);
		var titleKeyPause = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+580, LanguageHelpers.getText('key-pause'), fontSmall);
		titleKeyPause.setOrigin(0.5,0);

		var titleKeyPauseTitle = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+630, LanguageHelpers.getText('key-pause-title'), fontSubtitle);
		titleKeyPauseTitle.setOrigin(0.5,0);
		var titleKeyBack = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+680, LanguageHelpers.getText('key-back'), fontSmall);
		titleKeyBack.setOrigin(0.5,0);
		var titleKeyRestart = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+720, LanguageHelpers.getText('key-return'), fontSmall);
		titleKeyRestart.setOrigin(0.5,0);

		var titleKeyOverTitle = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+770, LanguageHelpers.getText('key-gameover'), fontSubtitle);
		titleKeyOverTitle.setOrigin(0.5,0);
		var titleKeyBack2 = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+820, LanguageHelpers.getText('key-back'), fontSmall);
		titleKeyBack2.setOrigin(0.5,0);
		var titleKeyRestart2 = this.add.text(GameParameters.worldParameters.centerX, offsetTopKeyboard+860, LanguageHelpers.getText('key-try'), fontSmall);
		titleKeyRestart2.setOrigin(0.5,0);

		this.containerKeyboard.add([keyboardBg,titleKeyboard,titleKeySettingsTitle,titleKeySettings]);
		this.containerKeyboard.add([titleKeyAudio,titleKeyMusic,titleKeyCredits,titleKeyKeyboard]);
		this.containerKeyboard.add([titleKeyMenuTitle,titleKeySettings2,titleKeyStart,titleKeyGameTitle]);
		this.containerKeyboard.add([titleKeyButton,titleKeyPause,titleKeyPauseTitle,titleKeyBack]);
		this.containerKeyboard.add([titleKeyRestart,titleKeyOverTitle,titleKeyBack2,titleKeyRestart2]);

		this.cameras.main.fadeIn(250);
	};

    handleKeyBoard(e: KeyboardEvent) {
        switch(e.code) {
			case 'KeyA': {
				this.clickSound();
				break;
			}
			case 'KeyM': {
				this.clickMusic();
				break;
			}
			case 'KeyC': {
				if(this.screenName == 'settings') {
					this.clickCredits();
				}
				else { // this.screenName == 'credits'
					this.clickBack('credits');
				}
				break;
			}
            case 'KeyS': {
                this.clickBack("");
				break;
			}
            case 'KeyK': {
				if(this.screenName == 'settings') {
					this.clickKeyboard();
				}
				else { // this.screenName == 'keyboard'
					this.clickBack('keyboard');
				}
				break;
			}
			default: {}
        }
    };

	clickSound() {
		SFXHelpers.play('click');
		SFXHelpers.manage('sound', 'switch', this, this.buttonSound, this.textSound);
	};

	clickMusic() {
		SFXHelpers.play('click');
		SFXHelpers.manage('music', 'switch', this, this.buttonMusic, this.textMusic);
	};

	clickCredits() {
		SFXHelpers.play('click');
		this.tweens.add({targets: this.containerCredits, y: 0, duration: 750, ease: 'Cubic.easeOut' });

		this.buttonBack.input!.enabled = false;
		this.buttonSound.input!.enabled = false;
		this.buttonMusic.input!.enabled = false;
		this.buttonCredits.input!.enabled = false;
		this.screenName = 'credits';
	};

	clickKeyboard() {
		SFXHelpers.play('click');
		this.tweens.add({targets: this.containerKeyboard, y: 0, duration: 750, ease: 'Cubic.easeOut' });

		this.buttonBack.input!.enabled = false;
		this.buttonSound.input!.enabled = false;
		this.buttonMusic.input!.enabled = false;
		this.buttonCredits.input!.enabled = false;
		this.screenName = 'keyboard';
	}

	clickBack(name: string) {
		SFXHelpers.play('click');
		if(name) {
			this.buttonBack.input!.enabled = true;
			this.buttonSound.input!.enabled = true;
			this.buttonMusic.input!.enabled = true;
			this.buttonCredits.input!.enabled = true;
			if(name == 'credits') {
				this.tweens.add({targets: this.containerCredits, y: GameParameters.worldParameters.height, duration: 750, ease: 'Cubic.easeIn' });
			}
			else if(name == 'keyboard') {
				this.tweens.add({targets: this.containerKeyboard, y: GameParameters.worldParameters.height, duration: 750, ease: 'Cubic.easeIn' });
			}
			this.screenName = 'settings';
		}
		else {
			GameHelpers.fadeOutScene('MainMenu', this);
		}
	};

	clickAdrenaline() {
		SFXHelpers.play('click');
		GameHelpers.redirectToExternalSite('https://adr-enaline.com');
	};
};