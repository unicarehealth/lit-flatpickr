import { LitElement } from 'lit-element';
import 'flatpickr';
import { DateLimit, DateOption, Hook, Options, ParsedOptions } from 'flatpickr/dist/types/options';
import { Locale } from 'flatpickr/dist/types/locale';
import { Instance } from 'flatpickr/dist/types/instance';
export declare class LitFlatpickr extends LitElement {
  /**
   * Exactly the same as date format, but for the altInput field
   * @prop
   * @type string
   **/
  altFormat: string;
  /**
   * Show the user a readable date (as per altFormat), but return something totally different to the server.
   * @prop
   * @type boolean
   * */
  altInput: boolean;
  /**
   * This class will be added to the input element created by the altInput option.
   * Note that altInput already inherits classes from the original input.
   * @prop
   * @type string
   * */
  altInputClass: string;
  /**
   * Allows the user to enter a date directly input the input field. By default, direct entry is disabled.
   * @prop
   * @type boolean
   **/
  allowInput: boolean;
  /**
   * Defines how the date will be formatted in the aria-label for calendar days, using the same tokens as dateFormat.
   * If you change this, you should choose a value that will make sense if a screen reader reads it out loud
   * @prop
   * @type string
   **/
  ariaDateFormat: string;
  /**
   * Whether clicking on the input should open the picker.
   * You could disable this if you wish to open the calendar manually with.open()
   * @prop
   * @type boolean
   * */
  clickOpens: boolean;
  /**
   * A string of characters which are used to define how the date will be displayed in the input box.
   * @prop
   * @type string
   * */
  dateFormat: string;
  /**
   * Sets the initial selected date(s).
   *
   * If you're using mode: "multiple" or a range calendar supply an Array of
   * Date objects or an Array of date strings which follow your dateFormat.
   *
   * Otherwise, you can supply a single Date object or a date string.
   * @prop
   * @type {DateOption|DateOption[]}
   * */
  defaultDate?: DateOption | DateOption[];
  /**
   * Initial value of the hour element.
   * @prop
   * @type number
   * */
  defaultHour: number;
  /**
   * Initial value of the minute element.
   * @prop
   * @type number
   * */
  defaultMinute: number;
  /**
   * Dates selected to be unavailable for selection.
   * @prop
   * @type DateLimit<DateOption>[]
   * */
  disable: DateLimit<DateOption>[];
  /**
   * Set disableMobile to true to always use the non-native picker.
   * By default, flatpickr utilizes native datetime widgets unless certain options (e.g. disable) are used.
   * @prop
   * @type boolean
   * */
  disableMobile: boolean;
  /**
   * Dates selected to be available for selection.
   * @prop
   * @type DateLimit<DateOption>[]
   * */
  enable: DateLimit<DateOption>[];
  /**
   * Enables time picker
   * @prop
   * @type boolean
   * */
  enableTime: boolean;
  /**
   * Enables seconds in the time picker
   * @prop
   * @type boolean
   * */
  enableSeconds: boolean;
  /**
   * Allows using a custom date formatting function instead of the built-in
   * handling for date formats using dateFormat, altFormat, etc.
   *
   * Function format: (date: Date, format: string, locale: Locale) => string
   *
   * @prop
   * @type Function
   * */
  formatDateFn?: (date: Date, format: string, locale: Locale) => string;
  /**
   * Adjusts the step for the hour input (incl. scrolling)
   * @prop
   * @type number
   * */
  hourIncrement: number;
  /**
   * Adjusts the step for the minute input (incl. scrolling)
   * @prop
   * @type number
   * */
  minuteIncrement: number;
  /**
   * Displays the calendar inline
   * @prop
   * @type boolean
   * */
  inline: boolean;
  /**
   * The maximum date that a user can pick to (inclusive).
   * @prop
   * @type DateOption
   * */
  maxDate?: DateOption;
  /**
   * The minimum date that a user can pick to (inclusive).
   * @prop
   * @type DateOption
   * */
  minDate?: DateOption;
  /**
   * "single", "multiple", or "range"
   * @prop
   * @type {"single" | "multiple" | "range"}
   * */
  mode: 'single' | 'multiple' | 'range' | 'time';
  /**
   * HTML for the arrow icon, used to switch months.
   * @prop
   * @type string
   * */
  nextArrow: string;
  /**
   * HTML for the arrow icon, used to switch months.
   * @prop
   * @type string
   * */
  prevArrow: string;
  /**
   * Hides the day selection in calendar.
   * Use it along with enableTime to create a time picker.
   * @prop
   * @type boolean
   * */
  noCalendar: boolean;
  /**
   * Function(s) to trigger on every date selection
   * @prop
   * @type Function
   * */
  onChange?: Hook;
  /**
   * Function(s) to trigger every time the calendar is closed
   * @prop
   * @type Function
   * */
  onClose?: Hook;
  /**
   * Function(s) to trigger every time the calendar is opened
   * @prop
   * @type Function
   * */
  onOpen?: Hook;
  /**
   * Function(s) to trigger when the calendar is ready
   * @prop
   * @type Function
   * */
  onReady?: Hook;
  /**
   * Function(s) to trigger every time the calendar month is changed by the user or programmatically
   * @prop
   * @type Function
   * */
  onMonthChange?: Hook;
  /**
   * Function(s) to trigger every time the calendar year is changed by the user or programmatically
   * @prop
   * @type Function
   * */
  onYearChange?: Hook;
  /**
   * Function(s) to trigger when the input value is updated with a new date string
   * @prop
   * @type Function
   * */
  onValueUpdate?: Hook;
  /**
   * Function that expects a date string and must return a Date object.
   *
   * Function format: (date: string, format: string) => string
   *
   * @prop
   * @type Function
   **/
  parseDateFn?: (date: string, format: string) => Date;
  /**
   * Where the calendar is rendered relative to the input
   * @prop
   * @type {"auto" | "above" | "below"}
   * */
  position: 'auto' | 'above' | 'below';
  /**
   * Show the month using the shorthand version (ie, Sep instead of September)
   * @prop
   * @type boolean
   * */
  shorthandCurrentMonth: boolean;
  /**
   * The number of months showed
   * @prop
   * @type number
   * */
  showMonths: number;
  /**
   * Position the calendar inside the wrapper and next to the input element
   * @prop
   * @type boolean
   **/
  static: boolean;
  /**
   * Displays the time picker in 24 hour mode without AM/PM selection when enabled
   * @prop
   * @type boolean
   * */
  time_24hr: boolean;
  /**
   * Enabled display of week numbers in calendar
   * @prop
   * @type boolean
   * */
  weekNumbers: boolean;
  /**
   * flatpickr can parse an input group of textboxes and buttons, common in Bootstrap and other frameworks.
   * This permits additional markup, as well as custom elements to trigger the state of the calendar.
   * @prop
   * @type boolean
   * */
  wrap: boolean;
  /**
   * The set theme of flatpickr.
   * @prop
   * @type { "light" | "dark" | "material_blue" | "material_red" | "material_green" | "material_orange" | "airbnb" | "confetti" }
   * */
  theme: string;
  _instance?: Instance;
  _inputElement?: HTMLInputElement;
  _hasSlottedElement: boolean;
  static get styles(): import('lit-element').CSSResult;
  firstUpdated(): void;
  updated(): void;
  checkForSlottedElement(): boolean;
  getSlottedElement(): Element | undefined;
  removeTextNodes(node: Node): boolean;
  init(): Promise<void>;
  getOptions(): Options;
  initializeComponent(): void;
  findInputField(): HTMLInputElement | null;
  /**
   * Traverse the shadow dom tree and search for input from it
   * and it's children
   * */
  searchWebComponentForInputElement(element: Element): HTMLInputElement | null;
  /**
   * Check if said element's dom tree contains a input element
   * */
  getInputFieldInElement(element: Element): HTMLInputElement | null;
  getWebComponentsInsideElement(element: Element): Array<Element>;
  changeMonth(monthNum: number, isOffset?: boolean): void;
  clear(): void;
  close(): void;
  destroy(): void;
  formatDate(dateObj: Date, formatStr: string): string;
  jumpToDate(date: Date, triggerChange: boolean): void;
  open(): void;
  parseDate(dateStr: string, dateFormat: string): Date | undefined;
  redraw(): void;
  set(
    option:
      | keyof Options
      | {
          [k in keyof Options]?: Options[k];
        },
    value?: any
  ): void;
  setDate(date: DateOption | DateOption[], triggerChange: boolean, dateStrFormat: string): void;
  toggle(): void;
  getSelectedDates(): Array<Date>;
  getCurrentYear(): number;
  getCurrentMonth(): number;
  getConfig(): ParsedOptions;
  getValue(): string;
  render(): import('lit-element').TemplateResult;
}
