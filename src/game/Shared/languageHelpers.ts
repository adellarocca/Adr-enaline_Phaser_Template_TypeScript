import gameTexts from '../Constants/gameTexts.json';
class LanguageHelpers {
    public current: string;
    public options: string[];
    public text: Record<string, Record<string, string>>;
  
    constructor() {
      this.current = 'en';
      this.options = ['en', 'fr'];
      this.text = gameTexts;
    };
  
    parseQueryString(query: string): Record<string, string | string[]> {
      const vars = query.split('&');
      const queryString: Record<string, string | string[]> = {};
      for (const pair of vars) {
        const [key, value] = pair.split('=');
        const decodedValue = decodeURIComponent(value || '');
        if (!queryString[key]) {
          queryString[key] = decodedValue;
        } else if (typeof queryString[key] === 'string') {
          queryString[key] = [queryString[key] as string, decodedValue];
        } else {
          (queryString[key] as string[]).push(decodedValue);
        }
      }
      return queryString;
    };
  
    updateLanguage(lang?: string): void {
      const query = window.location.search.substring(1);
      const qs = this.parseQueryString(query);
  
      if (qs['lang']) {
        this.current = qs['lang'] as string;
      } else {
        this.current = lang || navigator.language;
      }
  
      if (!this.options.includes(this.current)) {
        this.current = 'en';
      }
    };
  
    getCurrentLanguage(): string {
      return this.current;
    };
  
    getText(key: string): string {
      return this.text[this.current]?.[key] || '';
    };
  };

  export default new LanguageHelpers;
  