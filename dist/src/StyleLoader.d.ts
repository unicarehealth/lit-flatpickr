import { FlatpickrTheme } from './styles/Themes';
export default class StyleLoader {
  theme: FlatpickrTheme;
  constructor(theme: FlatpickrTheme);
  initStyles(): Promise<void>;
  /**
   * We want to prevent the styles from flickering, so we halt the
   * initialization process until the styles have been loaded
   * */
  waitForStyleToLoad(checkFunction: () => boolean): Promise<void>;
  isThemeLoaded(): boolean;
  appendThemeStyles(themeUrl: string): void;
}
