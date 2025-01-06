export default class LocalStorageHelpers {
    static availability(): boolean {
      try {
        if (typeof window.localStorage === 'undefined') {
          console.log('localStorage not available');
          return false;
        }
        return true;
      } catch {
        console.log('localStorage not available');
        return false;
      }
    };
  
    static get<T>(key: string): T | null {
      if (!this.availability()) return null;
      try {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch (e) {
        console.error('Error parsing localStorage item:', e);
        return window.localStorage.getItem(key) as unknown as T | null;
      }
    };
  
    static set(key: string, value: unknown): void {
      if (!this.availability()) return;
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          console.error('localStorage quota exceeded');
        } else {
          console.error('Error setting localStorage item:', e);
        }
      }
    };
  
    static initUnset(key: string, value: unknown): void {
      if (this.get(key) === null) {
        this.set(key, value);
      }
    };
  
    static getFloat(key: string): number {
      const value = this.get(key);
      return parseFloat(value as unknown as string);
    };
  
    static setHighscore(key: string, value: number): void {
      const currentHighscore = this.getFloat(key);
      if (value > currentHighscore) {
        this.set(key, value);
      }
    };
  
    static remove(key: string): void {
      if (!this.availability()) return;
      window.localStorage.removeItem(key);
    };
  
    static clear(): void {
      if (!this.availability()) return;
      window.localStorage.clear();
    };
  }
  