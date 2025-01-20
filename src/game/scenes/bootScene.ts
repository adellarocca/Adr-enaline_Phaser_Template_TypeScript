import Phaser from 'phaser';
import GameParameters from  '../Shared/gameParameters';
import LanguageHelpers from '../Shared/languageHelpers';

export default class BootScene extends Phaser.Scene {

    constructor() {
        super('Boot');

        // const WebFont = require('webfontloader');
        // WebFont.load({
        //     custom: {
        //         families: [ 'Freckle Face']
        //     }
        // });        
    };

    preload() {
        this.load.baseURL = process.env.APP_ASSETS_BASE_URL as string;
        this.load.image('background', 'background/background.png');
        this.load.image('logo', 'ui/adr-enaline_Logo.png');
        this.load.image('loading-background', 'ui/loading-background.png');
    };

    create() {
        GameParameters.worldParameters = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY            
        };

        LanguageHelpers.updateLanguage('en');        

        this.scene.start('Preloader');
    };
}