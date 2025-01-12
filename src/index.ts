import { Game, Types } from 'phaser';
import { GameOptions } from './game/Constants/gameOptions';
import BootScene from './game/scenes/bootScene';
import PreloaderScene from './game/scenes/preloaderScene';
import MainMenuScene from './game/scenes/mainMenuScene';
import SettingsScene from './game/scenes/settingsScene'
import HowToScene from './game/scenes/howToScene';
import GameScene from './game/scenes/gameScene';
import { registerServiceWorker } from './Services/serviceWorkerRegistration';

class DynamicGame extends Phaser.Game {
  constructor() {   
    const config:Types.Core.GameConfig  = {
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GameOptions.gameSize.width,
        height: GameOptions.gameSize.height  
      },
      type: Phaser.AUTO,
      parent: 'gameContainer',
      scene : [BootScene, PreloaderScene, MainMenuScene, SettingsScene, HowToScene, GameScene],   
      physics : {
        default: 'arcade',
        arcade : {
          debug : GameOptions.debugMode
        }
      }
    };

    // Call the parent class constructor
    super(config);      
  }
}

const game = new DynamicGame();

if(GameOptions.enablePWA) {
  registerServiceWorker(); 
}
// Create an instance of the custom DynamicGame class
export default game;
