import { html, LitElement, property, internalProperty, customElement, css, CSSResultArray } from 'lit-element';
import { TemplateResult } from 'lit-html';
import 'flatpickr';
import { FlatpickrTheme } from './styles/Themes';
import StyleLoader from './StyleLoader';
import { DateLimit, DateOption, Options, ParsedOptions } from 'flatpickr/dist/types/options';
import { Locale } from 'flatpickr/dist/types/locale';
import { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const flatpickr: any;

@customElement('lit-flatpickr')
export class LitFlatpickr extends LitElement {
  /**
   * Exactly the same as date format, but for the altInput field
   * @prop
   * @type string
   **/
  @property({ type: String })
  altFormat = 'F j, Y';
  /**
   * Show the user a readable date (as per altFormat), but return something totally different to the server.
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  altInput = false;
  /**
   * This class will be added to the input element created by the altInput option.
   * Note that altInput already inherits classes from the original input.
   * @prop
   * @type string
   * */
  @property({ type: String })
  altInputClass = '';
  /**
   * Allows the user to enter a date directly input the input field. By default, direct entry is disabled.
   * @prop
   * @type boolean
   **/
  @property({ type: Boolean })
  allowInput = false;
  /**
   * Defines how the date will be formatted in the aria-label for calendar days, using the same tokens as dateFormat.
   * If you change this, you should choose a value that will make sense if a screen reader reads it out loud
   * @prop
   * @type string
   **/
  @property({ type: String })
  ariaDateFormat = 'F j, Y';

  /**
   * Whether clicking on the input should open the picker.
   * You could disable this if you wish to open the calendar manually with.open()
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  clickOpens = true;

  /**
   * A string of characters which are used to define how the date will be displayed in the input box.
   * @prop
   * @type string
   * */
  @property({ type: String })
  dateFormat = 'Y-m-d';

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
  @property({ type: String })
  defaultDate?: DateOption | DateOption[];

  /**
   * Initial value of the hour element.
   * @prop
   * @type number
   * */
  @property({ type: Number })
  defaultHour = 12;

  /**
   * Initial value of the minute element.
   * @prop
   * @type number
   * */
  @property({ type: Number })
  defaultMinute = 0;

  /**
   * Dates selected to be unavailable for selection.
   * @prop
   * @type DateLimit<DateOption>[]
   * */
  @property({ type: Array })
  disable: DateLimit<DateOption>[] = [];

  /**
   * Set disableMobile to true to always use the non-native picker.
   * By default, flatpickr utilizes native datetime widgets unless certain options (e.g. disable) are used.
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  disableMobile = false;

  /**
   * Dates selected to be available for selection.
   * @prop
   * @type DateLimit<DateOption>[]
   * */
  @property({ type: Array })
  enable: DateLimit<DateOption>[] = [];

  /**
   * Enables time picker
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  enableTime = false;

  /**
   * Enables seconds in the time picker
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  enableSeconds = false;

  /**
   * Allows using a custom date formatting function instead of the built-in
   * handling for date formats using dateFormat, altFormat, etc.
   *
   * Function format: (date: Date, format: string, locale: Locale) => string
   *
   * @prop
   * @type Function
   * */
  @property({ attribute: false })
  formatDateFn?: (date: Date, format: string, locale: Locale) => string;

  /**
   * Adjusts the step for the hour input (incl. scrolling)
   * @prop
   * @type number
   * */
  @property({ type: Number })
  hourIncrement = 1;

  /**
   * Adjusts the step for the minute input (incl. scrolling)
   * @prop
   * @type number
   * */
  @property({ type: Number })
  minuteIncrement = 5;

  /**
   * Displays the calendar inline
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  inline = false;

  /**
   * The maximum date that a user can pick to (inclusive).
   * @prop
   * @type DateOption
   * */
  @property({ type: String })
  maxDate?: DateOption;

  /**
   * The minimum date that a user can pick to (inclusive).
   * @prop
   * @type DateOption
   * */
  @property({ type: String })
  minDate?: DateOption;

  /**
   * "single", "multiple", or "range"
   * @prop
   * @type {"single" | "multiple" | "range"}
   * */
  @property({ type: String })
  mode: 'single' | 'multiple' | 'range' | 'time' = 'single';

  /**
   * HTML for the arrow icon, used to switch months.
   * @prop
   * @type string
   * */
  @property({ type: String })
  nextArrow = '>';

  /**
   * HTML for the arrow icon, used to switch months.
   * @prop
   * @type string
   * */
  @property({ type: String })
  prevArrow = '<';

  /**
   * Hides the day selection in calendar.
   * Use it along with enableTime to create a time picker.
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  noCalendar = false;

  /**
   * Function that expects a date string and must return a Date object.
   *
   * Function format: (date: string, format: string) => string
   *
   * @prop
   * @type Function
   **/
  @property({ type: Object })
  parseDateFn?: (date: string, format: string) => Date;

  /**
   * Where the calendar is rendered relative to the input
   * @prop
   * @type {"auto" | "above" | "below"}
   * */
  @property({ type: String })
  position: 'auto' | 'above' | 'below' = 'auto';

  /**
   * Show the month using the shorthand version (ie, Sep instead of September)
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  shorthandCurrentMonth = false;

  /**
   * The number of months showed
   * @prop
   * @type number
   * */
  @property({ type: Number })
  showMonths = 1;

  /**
   * Position the calendar inside the wrapper and next to the input element
   * @prop
   * @type boolean
   **/
  @property({ type: Boolean })
  static = false;

  /**
   * Displays the time picker in 24 hour mode without AM/PM selection when enabled
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  time_24hr = false;

  /**
   * Enabled display of week numbers in calendar
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  weekNumbers = false;

  /**
   * flatpickr can parse an input group of textboxes and buttons, common in Bootstrap and other frameworks.
   * This permits additional markup, as well as custom elements to trigger the state of the calendar.
   * @prop
   * @type boolean
   * */
  @property({ type: Boolean })
  wrap = false;

  /**
   * The set theme of flatpickr.
   * @prop
   * @type { "light" | "dark" | "material_blue" | "material_red" | "material_green" | "material_orange" | "airbnb" | "confetti" }
   * */
  @property({ type: String })
  theme:
    | 'light'
    | 'dark'
    | 'material_blue'
    | 'material_red'
    | 'material_green'
    | 'material_orange'
    | 'airbnb'
    | 'confetti' = 'light';

  @internalProperty()
  _hasSlottedElement = false;

  _styleInitialized = false;

  _instance?: FlatpickrInstance;

  static get styles(): CSSResultArray {
    return [
      css`
        :host {
          width: fit-content;
          display: block;
          cursor: text;
          background: #fff;
          color: #000;
          overflow: hidden;
        }

        input {
          width: 100%;
          height: 100%;
          font-size: inherit;
          cursor: inherit;
          background: inherit;
          box-sizing: border-box;
          outline: none;
          color: inherit;
          border: none;
        }
      `,
    ];
  }

  async firstUpdated(): Promise<void> {
    this._hasSlottedElement = this.checkForSlottedElement();
  }

  async updated(changedProperties: Map<string | number | symbol, unknown>): Promise<void> {
    let refreshStyles = !this._styleInitialized; //Initialise styles at startup, then only if 'theme' property changes.
    let refreshInstance = this._instance === undefined; //Initialise flatpickr instance at startup, then only if we can't set the changed option on it.

    if (!refreshStyles) {
      changedProperties.forEach((oldValue, propName) => {
        if (!refreshStyles && propName === 'theme' && this.theme !== oldValue) {
          refreshStyles = true;
        }

        if (!refreshInstance && propName === 'defaultDate' && this.defaultDate !== oldValue) {
          this._instance?.set('defaultDate', this.defaultDate);
          refreshInstance = false;
        }
        // TODO: Continue to handle changed properties using set() so not initialised every time updated.
      });
    }

    if (refreshStyles) {
      const styleLoader = new StyleLoader(this.theme as FlatpickrTheme);
      await styleLoader.initStyles();
      this._styleInitialized = true;
    }

    if (refreshInstance) {
      await this.initializeComponent();
    }
  }

  checkForSlottedElement(): boolean {
    const slottedElem = this.shadowRoot?.querySelector('slot');
    // We don't want to think that a whitespace / line break is a node
    const assignedNodes = slottedElem ? slottedElem.assignedNodes().filter(this.removeTextNodes) : [];

    return assignedNodes.length > 0;
  }

  getSlottedElement(): Element | undefined {
    if (!this._hasSlottedElement) {
      return undefined;
    }
    const slottedElem = this.shadowRoot?.querySelector('slot');
    const slottedElemNodes: Array<Node> | undefined = slottedElem?.assignedNodes().filter(this.removeTextNodes);
    if (!slottedElemNodes || slottedElemNodes.length < 1) {
      return undefined;
    }
    return slottedElemNodes[0] as Element;
  }

  removeTextNodes(node: Node): boolean {
    return node.nodeName !== '#text';
  }

  getOptions(): Options {
    return {
      altFormat: this.altFormat,
      altInput: this.altInput,
      altInputClass: this.altInputClass,
      allowInput: this.allowInput,
      ariaDateFormat: this.ariaDateFormat,
      clickOpens: this.clickOpens,
      dateFormat: this.dateFormat,
      defaultDate: this.defaultDate,
      defaultHour: this.defaultHour,
      defaultMinute: this.defaultMinute,
      disable: this.disable,
      disableMobile: this.disableMobile,
      enable: this.enable,
      enableTime: this.enableTime,
      enableSeconds: this.enableSeconds,
      formatDate: this.formatDateFn,
      hourIncrement: this.hourIncrement,
      inline: this.inline,
      maxDate: this.maxDate,
      minDate: this.minDate,
      minuteIncrement: this.minuteIncrement,
      mode: this.mode,
      nextArrow: this.nextArrow,
      prevArrow: this.prevArrow,
      noCalendar: this.noCalendar,
      /* eslint-disable @typescript-eslint/no-explicit-any */
      onValueUpdate: (dates: Date[], currentDateString: string, instance: FlatpickrInstance, data?: any) =>
        this._dispatchHookAsEvent('onValueUpdate', dates, currentDateString, instance, data),
      onChange: (dates: Date[], currentDateString: string, instance: FlatpickrInstance, data?: any) =>
        this._dispatchHookAsEvent('onChange', dates, currentDateString, instance, data),
      onClose: (dates: Date[], currentDateString: string, instance: FlatpickrInstance, data?: any) =>
        this._dispatchHookAsEvent('onClose', dates, currentDateString, instance, data),
      onOpen: (dates: Date[], currentDateString: string, instance: FlatpickrInstance, data?: any) =>
        this._dispatchHookAsEvent('onOpen', dates, currentDateString, instance, data),
      onReady: (dates: Date[], currentDateString: string, instance: FlatpickrInstance, data?: any) =>
        this._dispatchHookAsEvent('onReady', dates, currentDateString, instance, data),
      onMonthChange: (dates: Date[], currentDateString: string, instance: FlatpickrInstance, data?: any) =>
        this._dispatchHookAsEvent('onMonthChange', dates, currentDateString, instance, data),
      onYearChange: (dates: Date[], currentDateString: string, instance: FlatpickrInstance, data?: any) =>
        this._dispatchHookAsEvent('onYearChange', dates, currentDateString, instance, data),
      /* eslint-enable @typescript-eslint/no-explicit-any */
      parseDate: this.parseDateFn,
      position: this.position,
      shorthandCurrentMonth: this.shorthandCurrentMonth,
      showMonths: this.showMonths,
      static: this.static,
      time_24hr: this.time_24hr,
      weekNumbers: this.weekNumbers,
      wrap: this.wrap,
    };
  }

  _dispatchHookAsEvent(
    evtName: string,
    selectedDates: Date[],
    currentDateString: string,
    instance: FlatpickrInstance,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    data?: any
  ): void {
    const evt = new CustomEvent(evtName, {
      detail: {
        selectedDates: selectedDates,
        currentDateString: currentDateString,
        instance: instance,
        data: data,
      },
    });

    this.dispatchEvent(evt);
  }

  async initializeComponent(): Promise<void> {
    if (Object.prototype.hasOwnProperty.call(this, 'destroy')) {
      this._instance?.destroy();
    }

    await this.updateComplete;

    const inputElement = this.findInputField();
    if (inputElement) {
      this._instance = flatpickr(inputElement, this.getOptions());
    }
  }

  /** If lit-flatpickr has a slotted element, it means that the user wants to use their custom input. */
  findInputField(): HTMLInputElement | null {
    let inputElement: HTMLInputElement | null = null;

    if (!this._hasSlottedElement) {
      return this.shadowRoot?.querySelector('input') as HTMLInputElement;
    }

    // First we check if the slotted element is just light dom HTML
    inputElement = this.querySelector('input');
    if (inputElement) {
      return inputElement as HTMLInputElement;
    }
    // If not, we traverse down the slotted element's dom/shadow dom until we
    // find a dead-end or an input
    const slottedElement: Element | undefined = this.getSlottedElement();
    if (typeof slottedElement !== undefined) {
      inputElement = this.searchWebComponentForInputElement(slottedElement as Element);
    }

    return inputElement ? (inputElement as HTMLInputElement) : null;
  }

  /**
   * Traverse the shadow dom tree and search for input from it
   * and it's children
   * */
  searchWebComponentForInputElement(element: Element): HTMLInputElement | null {
    let inputElement: HTMLInputElement | null = this.getInputFieldInElement(element);
    if (inputElement) return inputElement;

    const webComponentsInChildren = this.getWebComponentsInsideElement(element);
    for (let i = 0; i < webComponentsInChildren.length; i++) {
      inputElement = this.searchWebComponentForInputElement(webComponentsInChildren[i]);
      if (inputElement) {
        break;
      }
    }
    return inputElement;
  }

  /**
   * Check if said element's dom tree contains a input element
   * */
  getInputFieldInElement(element: Element): HTMLInputElement | null {
    let inputElement: HTMLInputElement | null = null;
    if (element.shadowRoot) {
      inputElement = element.shadowRoot.querySelector('input');
    } else {
      inputElement = element.querySelector('input');
    }
    return inputElement;
  }

  getWebComponentsInsideElement(element: Element): Array<Element> {
    if (element.shadowRoot) {
      return [
        ...Array.from(element.querySelectorAll('*')),
        ...Array.from(element.shadowRoot.querySelectorAll('*')),
      ].filter((elem: Element) => elem.shadowRoot);
    } else {
      return Array.from(element.querySelectorAll('*')).filter((elem: Element) => elem.shadowRoot);
    }
  }

  changeMonth(monthNum: number, isOffset = true): void {
    this._instance?.changeMonth(monthNum, isOffset);
  }

  clear(): void {
    this._instance?.clear();
  }

  close(): void {
    this._instance?.close();
  }

  destroy(): void {
    this._instance?.destroy();
  }

  formatDate(dateObj: Date, formatStr: string): string {
    return this._instance?.formatDate(dateObj, formatStr) ?? '';
  }

  jumpToDate(date: Date, triggerChange: boolean): void {
    this._instance?.jumpToDate(date, triggerChange);
  }

  open(): void {
    this._instance?.open();
  }

  parseDate(dateStr: string, dateFormat: string): Date | undefined {
    return this._instance?.parseDate(dateStr, dateFormat);
  }

  redraw(): void {
    this._instance?.redraw();
  }

  set(
    option:
      | keyof Options
      | {
          [k in keyof Options]?: Options[k];
        },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    value?: any
  ): void {
    this._instance?.set(option, value);
  }

  /** Second and third parameters are optional (as per flatpickr documentation). */
  setDate(date: DateOption | DateOption[], triggerChange?: boolean, dateStrFormat?: string): void {
    this._instance?.setDate(date, triggerChange, dateStrFormat);
  }

  toggle(): void {
    this._instance?.toggle();
  }

  getSelectedDates(): Array<Date> {
    return this._instance?.selectedDates ?? [];
  }

  getCurrentYear(): number {
    return this._instance?.currentYear ?? -1;
  }

  getCurrentMonth(): number {
    return this._instance?.currentMonth ?? -1;
  }

  getConfig(): ParsedOptions {
    return this._instance?.config ?? ({} as ParsedOptions);
  }

  getValue(): string {
    return this._instance?.input.value ?? ''; //Or we could check/use findInputField() instead of _instance.input.
  }

  render(): TemplateResult {
    return html`
      ${this._hasSlottedElement ? html`` : html`<input class="lit-flatpickr flatpickr flatpickr-input" />`}
      <slot></slot>
    `;
  }
}
