import Phaser from 'phaser';
import GameParameters from  '../Shared/gameParameters';
import GameHelpers from '../Shared/gameHelpers';


export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }; 
    
    preload() {
        this.load.baseURL = process.env.APP_ASSETS_BASE_URL as string;

		this.add.sprite(0, 0, 'background').setOrigin(0, 0);
        var logoAdrenaline = this.add.sprite(GameParameters.worldParameters.centerX, GameParameters.worldParameters.centerY-100, 'logo');
        logoAdrenaline.setOrigin(0.5, 0.5);
		var loadingBg = this.add.sprite(GameParameters.worldParameters.centerX, GameParameters.worldParameters.centerY+100, 'loading-background');
		loadingBg.setOrigin(0.5, 0.5);

		var progress = this.add.graphics();
		this.load.on('progress', function (value : number) {
			progress.clear();
			progress.fillStyle(0xD63384, 1);
			progress.fillRect(loadingBg.x-(loadingBg.width*0.5)+20, loadingBg.y-(loadingBg.height*0.5)+10, 540 * value, 25);
		});

        this.load.image('title', 'ui/title.png');
        this.load.image('overlay', 'ui/overlay.png');

        this.load.image('clickme', 'game/target_colored_outline.png');
        this.load.image('particle', 'game/particle.png');

        this.load.spritesheet('button-mainmenu', 'ui/button-mainmenu.png', {
            frameWidth: 180,
            frameHeight: 180
        });             
        this.load.spritesheet('button-start', 'ui/button-start.png', {
            frameWidth: 180,
            frameHeight: 180
        });
        this.load.spritesheet('button-restart', 'ui/button-restart.png', {
            frameWidth: 180,
            frameHeight: 180
        });             
        this.load.spritesheet('button-continue', 'ui/button-continue.png', {
            frameWidth: 180,
            frameHeight: 180
        });
        this.load.spritesheet('button-pause', 'ui/button-pause.png', {
            frameWidth: 80,
            frameHeight: 80
        });                
        this.load.spritesheet('button-settings', 'ui/button-settings.png', {
            frameWidth: 80,
            frameHeight: 80
        });
        this.load.spritesheet('button-back', 'ui/button-back.png', {
            frameWidth: 70,
            frameHeight: 70
        });
        this.load.spritesheet('button-sound-on', 'ui/button-sound-on.png', {
            frameWidth: 80,
            frameHeight: 80
        });
        this.load.spritesheet('button-sound-off', 'ui/button-sound-off.png', {
            frameWidth: 80,
            frameHeight: 80
        });
        this.load.spritesheet('button-music-on', 'ui/button-music-on.png', {
            frameWidth: 80,
            frameHeight: 80
        });
        this.load.spritesheet('button-music-off', 'ui/button-music-off.png', {
            frameWidth: 80,
            frameHeight: 80
        });                                
        this.load.spritesheet('button-credits', 'ui/button-credits.png', {
            frameWidth: 80,
            frameHeight: 80
        });                                

        this.load.spritesheet('loader', 'ui/loader.png', {
            frameWidth: 45,
            frameHeight: 45
        });

        //this.load.bitmapFont('berlinFont', 'fonts/berlin.png', 'fonts/berlin.fnt');

        this.load.audio('sound-click', ['sfx/select_001.ogg','sfx/select_001.mp3']);
        this.load.audio('music-theme', ['sfx/Italian_Mom.ogg', 'sfx/Italian_Mom.mp3']);

        // dummy loading
        // for (let i = 0; i < 500; i++) {
        //     this.load.image('logo'+i, 'ui/dummy.png');
        // }
    };
    
    create() {
		GameHelpers.fadeOutScene('MainMenu', this);        
	};   
}