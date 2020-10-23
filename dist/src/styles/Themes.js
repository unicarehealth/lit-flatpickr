const styleRepository = 'https://npmcdn.com/flatpickr@4.6.6/dist/themes/';
export var FlatpickrTheme;
(function (FlatpickrTheme) {
    FlatpickrTheme["light"] = "light";
    FlatpickrTheme["dark"] = "dark";
    FlatpickrTheme["materialBlue"] = "material_blue";
    FlatpickrTheme["materialGreen"] = "material_green";
    FlatpickrTheme["materialOrange"] = "material_orange";
    FlatpickrTheme["materialRed"] = "material_red";
    FlatpickrTheme["airbnb"] = "airbnb";
    FlatpickrTheme["confetti"] = "confetti";
})(FlatpickrTheme || (FlatpickrTheme = {}));
export function getStyleRepository(theme) {
    return `${styleRepository}${theme}.css`;
}
//# sourceMappingURL=Themes.js.map