import Phaser from 'phaser';
import LocalStorageHelper from './localStorageHelpers';
import LanguageHelper from './languageHelpers';

export default  class SFXHelpers {
  private static status: Record<string, boolean> = {};
  private static sounds: Record<string, Phaser.Sound.BaseSound> = {};
  private static music: Phaser.Sound.BaseSound | null = null;

  static manage(
    type: 'sound' | 'music',
    mode: 'init' | 'on' | 'off' | 'switch',
    game: Phaser.Scene,
    button?: Phaser.GameObjects.Image,
    label?: Phaser.GameObjects.Text
  ): void {
    switch (mode) {
      case 'init': {
        LocalStorageHelper.initUnset(`APT-${type}`, true);
        this.status[type] = LocalStorageHelper.get(`APT-${type}`) as boolean;

        game.sound.pauseOnBlur = true;

        if (type === 'sound') {
          this.sounds['click'] = game.sound.add('sound-click');
        } else if (!this.music || !this.music.isPlaying) {
          this.music = game.sound.add('music-theme', { volume: 0.5 });
        }
        break;
      }
      case 'on': {
        this.status[type] = true;
        break;
      }
      case 'off': {
        this.status[type] = false;
        break;
      }
      case 'switch': {
        this.status[type] = !this.status[type];
        break;
      }
    }

    this.update(type, button, label);

    if (type === 'music' && this.music) {
      if (this.status['music']) {
        if (!this.music.isPlaying) {
          this.music.play({ loop: true });
        }
      } else {
        this.music.stop();
      }
    }

    LocalStorageHelper.set(`APT-${type}`, this.status[type]);
  };

  static play(audio: string): void {
    if (audio === 'music') {
      if (this.status['music'] && this.music && !this.music.isPlaying) {
        this.music.play({ loop: true });
      }
    } else if (this.status['sound'] && this.sounds[audio]) {
      this.sounds[audio].play();
    }
  };

  static update(
    type: 'sound' | 'music',
    button?: Phaser.GameObjects.Image,
    label?: Phaser.GameObjects.Text
  ): void {
    if (button) {
      const texture = this.status[type] ? `button-${type}-on` : `button-${type}-off`;
      button.setTexture(texture);
    }
    if (label) {
      const textKey = this.status[type] ? `${type}-on` : `${type}-off`;
      label.setText(LanguageHelper.getText(textKey));
    }
  };
}