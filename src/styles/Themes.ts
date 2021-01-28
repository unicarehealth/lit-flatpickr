const styleRepository = 'https://npmcdn.com/flatpickr@4.6.9/dist/themes/';

export type FlatpickrTheme =
  | 'light'
  | 'dark'
  | 'material_blue'
  | 'material_green'
  | 'material_orange'
  | 'material_red'
  | 'airbnb'
  | 'confetti';

export function getStyleRepository(theme: FlatpickrTheme): string {
  return `${styleRepository}${theme}.css`;
}
