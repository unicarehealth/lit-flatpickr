import { getStyleRepository } from './styles/Themes';
const themeUrlPrefix = 'https://npmcdn.com/flatpickr@4.6.9/dist/themes';
export default class StyleLoader {
    constructor(theme) {
        this.theme = theme;
        this.theme = theme;
    }
    async initStyles() {
        const themeUrl = getStyleRepository(this.theme);
        const themeIsLoaded = this.isThemeLoaded();
        if (!themeIsLoaded) {
            this.appendThemeStyles(themeUrl);
            await this.waitForStyleToLoad(() => this.isThemeLoaded());
        }
    }
    /**
     * We want to prevent the styles from flickering, so we halt the
     * initialization process until the styles have been loaded
     * */
    waitForStyleToLoad(checkFunction) {
        return new Promise((resolve, reject) => {
            const checkIfStylesHaveLoaded = (iteration = 0) => {
                if (checkFunction())
                    return resolve();
                if (iteration > 10) {
                    throw Error('Styles took too long to load, or were not able to be loaded');
                    reject();
                }
                setTimeout(() => checkIfStylesHaveLoaded(iteration++), 100);
            };
            checkIfStylesHaveLoaded();
        });
    }
    isThemeLoaded() {
        const styleSheetSources = Array.from(document.styleSheets).map(ss => ss.href);
        return styleSheetSources.some(sss => sss != null && new RegExp(themeUrlPrefix).test(sss));
    }
    appendThemeStyles(themeUrl) {
        const styleElem = document.createElement('link');
        styleElem.rel = 'stylesheet';
        styleElem.type = 'text/css';
        styleElem.href = themeUrl;
        document.head.append(styleElem);
    }
}
//# sourceMappingURL=StyleLoader.js.map