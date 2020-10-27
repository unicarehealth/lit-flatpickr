import { __decorate } from "tslib";
import { html, LitElement, property, internalProperty, customElement, css } from 'lit-element';
import 'flatpickr';
import StyleLoader from './StyleLoader';
let LitFlatpickr = class LitFlatpickr extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Exactly the same as date format, but for the altInput field
         * @prop
         * @type string
         **/
        this.altFormat = 'F j, Y';
        /**
         * Show the user a readable date (as per altFormat), but return something totally different to the server.
         * @prop
         * @type boolean
         * */
        this.altInput = false;
        /**
         * This class will be added to the input element created by the altInput option.
         * Note that altInput already inherits classes from the original input.
         * @prop
         * @type string
         * */
        this.altInputClass = '';
        /**
         * Allows the user to enter a date directly input the input field. By default, direct entry is disabled.
         * @prop
         * @type boolean
         **/
        this.allowInput = false;
        /**
         * Defines how the date will be formatted in the aria-label for calendar days, using the same tokens as dateFormat.
         * If you change this, you should choose a value that will make sense if a screen reader reads it out loud
         * @prop
         * @type string
         **/
        this.ariaDateFormat = 'F j, Y';
        /**
         * Whether clicking on the input should open the picker.
         * You could disable this if you wish to open the calendar manually with.open()
         * @prop
         * @type boolean
         * */
        this.clickOpens = true;
        /**
         * A string of characters which are used to define how the date will be displayed in the input box.
         * @prop
         * @type string
         * */
        this.dateFormat = 'Y-m-d';
        /**
         * Initial value of the hour element.
         * @prop
         * @type number
         * */
        this.defaultHour = 12;
        /**
         * Initial value of the minute element.
         * @prop
         * @type number
         * */
        this.defaultMinute = 0;
        /**
         * Dates selected to be unavailable for selection.
         * @prop
         * @type DateLimit<DateOption>[]
         * */
        this.disable = [];
        /**
         * Set disableMobile to true to always use the non-native picker.
         * By default, flatpickr utilizes native datetime widgets unless certain options (e.g. disable) are used.
         * @prop
         * @type boolean
         * */
        this.disableMobile = false;
        /**
         * Dates selected to be available for selection.
         * @prop
         * @type DateLimit<DateOption>[]
         * */
        this.enable = [];
        /**
         * Enables time picker
         * @prop
         * @type boolean
         * */
        this.enableTime = false;
        /**
         * Enables seconds in the time picker
         * @prop
         * @type boolean
         * */
        this.enableSeconds = false;
        /**
         * Adjusts the step for the hour input (incl. scrolling)
         * @prop
         * @type number
         * */
        this.hourIncrement = 1;
        /**
         * Adjusts the step for the minute input (incl. scrolling)
         * @prop
         * @type number
         * */
        this.minuteIncrement = 5;
        /**
         * Displays the calendar inline
         * @prop
         * @type boolean
         * */
        this.inline = false;
        /**
         * "single", "multiple", or "range"
         * @prop
         * @type {"single" | "multiple" | "range"}
         * */
        this.mode = 'single';
        /**
         * HTML for the arrow icon, used to switch months.
         * @prop
         * @type string
         * */
        this.nextArrow = '>';
        /**
         * HTML for the arrow icon, used to switch months.
         * @prop
         * @type string
         * */
        this.prevArrow = '<';
        /**
         * Hides the day selection in calendar.
         * Use it along with enableTime to create a time picker.
         * @prop
         * @type boolean
         * */
        this.noCalendar = false;
        /**
         * Where the calendar is rendered relative to the input
         * @prop
         * @type {"auto" | "above" | "below"}
         * */
        this.position = 'auto';
        /**
         * Show the month using the shorthand version (ie, Sep instead of September)
         * @prop
         * @type boolean
         * */
        this.shorthandCurrentMonth = false;
        /**
         * The number of months showed
         * @prop
         * @type number
         * */
        this.showMonths = 1;
        /**
         * Position the calendar inside the wrapper and next to the input element
         * @prop
         * @type boolean
         **/
        this.static = false;
        /**
         * Displays the time picker in 24 hour mode without AM/PM selection when enabled
         * @prop
         * @type boolean
         * */
        this.time_24hr = false;
        /**
         * Enabled display of week numbers in calendar
         * @prop
         * @type boolean
         * */
        this.weekNumbers = false;
        /**
         * flatpickr can parse an input group of textboxes and buttons, common in Bootstrap and other frameworks.
         * This permits additional markup, as well as custom elements to trigger the state of the calendar.
         * @prop
         * @type boolean
         * */
        this.wrap = false;
        /**
         * The set theme of flatpickr.
         * @prop
         * @type { "light" | "dark" | "material_blue" | "material_red" | "material_green" | "material_orange" | "airbnb" | "confetti" }
         * */
        this.theme = 'light';
        this._hasSlottedElement = false;
        this._styleInitialized = false;
    }
    static get styles() {
        return css `
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
    `;
    }
    firstUpdated() {
        this._hasSlottedElement = this.checkForSlottedElement();
    }
    async updated(changedProperties) {
        let refreshStyles = !this._styleInitialized; //Initialise styles at startup, then only if 'theme' property changes.
        let refreshInstance = this._instance === undefined; //Initialise flatpickr instance at startup, then only if we can't set the changed option on it.
        if (!refreshStyles) {
            changedProperties.forEach((oldValue, propName) => {
                var _a;
                if (!refreshStyles && propName === 'theme' && this.theme !== oldValue) {
                    refreshStyles = true;
                }
                if (!refreshInstance && propName === 'defaultDate' && this.defaultDate !== oldValue) {
                    (_a = this._instance) === null || _a === void 0 ? void 0 : _a.set('defaultDate', this.defaultDate);
                    refreshInstance = false;
                }
                // TODO: Continue to handle changed properties using set() so not initialised every time updated.
            });
        }
        if (refreshStyles) {
            const styleLoader = new StyleLoader(this.theme);
            await styleLoader.initStyles();
            this._styleInitialized = true;
        }
        if (refreshInstance) {
            await this.initializeComponent();
        }
    }
    checkForSlottedElement() {
        var _a;
        const slottedElem = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot');
        // We don't want to think that a whitespace / line break is a node
        const assignedNodes = slottedElem ? slottedElem.assignedNodes().filter(this.removeTextNodes) : [];
        return assignedNodes.length > 0;
    }
    getSlottedElement() {
        var _a;
        if (!this._hasSlottedElement) {
            return undefined;
        }
        const slottedElem = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('slot');
        const slottedElemNodes = slottedElem === null || slottedElem === void 0 ? void 0 : slottedElem.assignedNodes().filter(this.removeTextNodes);
        if (!slottedElemNodes || slottedElemNodes.length < 1) {
            return undefined;
        }
        return slottedElemNodes[0];
    }
    removeTextNodes(node) {
        return node.nodeName !== '#text';
    }
    getOptions() {
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
            onValueUpdate: (dates, currentDateString, instance, data) => this._dispatchHookAsEvent('onValueUpdate', dates, currentDateString, instance, data),
            onChange: (dates, currentDateString, instance, data) => this._dispatchHookAsEvent('onChange', dates, currentDateString, instance, data),
            onClose: (dates, currentDateString, instance, data) => this._dispatchHookAsEvent('onClose', dates, currentDateString, instance, data),
            onOpen: (dates, currentDateString, instance, data) => this._dispatchHookAsEvent('onOpen', dates, currentDateString, instance, data),
            onReady: (dates, currentDateString, instance, data) => this._dispatchHookAsEvent('onReady', dates, currentDateString, instance, data),
            onMonthChange: (dates, currentDateString, instance, data) => this._dispatchHookAsEvent('onMonthChange', dates, currentDateString, instance, data),
            onYearChange: (dates, currentDateString, instance, data) => this._dispatchHookAsEvent('onYearChange', dates, currentDateString, instance, data),
            /* eslint-enable @typescript-eslint/no-explicit-any */
            parseDate: this.parseDateFn,
            position: this.position,
            shorthandCurrentMonth: this.shorthandCurrentMonth,
            showMonths: this.showMonths,
            static: this.static,
            // eslint-disable-next-line @typescript-eslint/camelcase
            time_24hr: this.time_24hr,
            weekNumbers: this.weekNumbers,
            wrap: this.wrap,
        };
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    _dispatchHookAsEvent(evtName, selectedDates, currentDateString, instance, data) {
        /* eslint-enable @typescript-eslint/no-explicit-any */
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
    async initializeComponent() {
        if (this._instance) {
            if (Object.prototype.hasOwnProperty.call(this, 'destroy')) {
                this._instance.destroy();
            }
        }
        await this.updateComplete;
        const inputElement = this.findInputField();
        if (inputElement) {
            this._instance = flatpickr(inputElement, this.getOptions());
        }
    }
    /** If lit-flatpickr has a slotted element, it means that the user wants to use their custom input. */
    findInputField() {
        var _a;
        let inputElement = null;
        if (!this._hasSlottedElement) {
            return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input');
        }
        // First we check if the slotted element is just light dom HTML
        inputElement = this.querySelector('input');
        if (inputElement) {
            return inputElement;
        }
        // If not, we traverse down the slotted element's dom/shadow dom until we
        // find a dead-end or an input
        const slottedElement = this.getSlottedElement();
        if (typeof slottedElement !== undefined) {
            inputElement = this.searchWebComponentForInputElement(slottedElement);
        }
        return inputElement ? inputElement : null;
    }
    /**
     * Traverse the shadow dom tree and search for input from it
     * and it's children
     * */
    searchWebComponentForInputElement(element) {
        let inputElement = this.getInputFieldInElement(element);
        if (inputElement)
            return inputElement;
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
    getInputFieldInElement(element) {
        let inputElement = null;
        if (element.shadowRoot) {
            inputElement = element.shadowRoot.querySelector('input');
        }
        else {
            inputElement = element.querySelector('input');
        }
        return inputElement;
    }
    getWebComponentsInsideElement(element) {
        if (element.shadowRoot) {
            return [
                ...Array.from(element.querySelectorAll('*')),
                ...Array.from(element.shadowRoot.querySelectorAll('*')),
            ].filter((elem) => elem.shadowRoot);
        }
        else {
            return Array.from(element.querySelectorAll('*')).filter((elem) => elem.shadowRoot);
        }
    }
    changeMonth(monthNum, isOffset = true) {
        if (!this._instance)
            return;
        this._instance.changeMonth(monthNum, isOffset);
    }
    clear() {
        if (!this._instance)
            return;
        this._instance.clear();
    }
    close() {
        if (!this._instance)
            return;
        this._instance.close();
    }
    destroy() {
        if (!this._instance)
            return;
        this._instance.destroy();
    }
    formatDate(dateObj, formatStr) {
        if (!this._instance)
            return '';
        return this._instance.formatDate(dateObj, formatStr);
    }
    jumpToDate(date, triggerChange) {
        if (!this._instance)
            return;
        this._instance.jumpToDate(date, triggerChange);
    }
    open() {
        if (!this._instance)
            return;
        this._instance.open();
    }
    parseDate(dateStr, dateFormat) {
        if (!this._instance)
            return undefined;
        return this._instance.parseDate(dateStr, dateFormat);
    }
    redraw() {
        if (!this._instance)
            return;
        this._instance.redraw();
    }
    set(option, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value) {
        if (!this._instance)
            return;
        this._instance.set(option, value);
    }
    setDate(date, triggerChange, dateStrFormat) {
        if (!this._instance)
            return;
        //Handle second and third parameters as optional:
        if (dateStrFormat !== undefined) {
            this._instance.setDate(date, triggerChange, dateStrFormat);
        }
        else if (triggerChange !== undefined) {
            this._instance.setDate(date, triggerChange);
        }
        this._instance.setDate(date);
    }
    toggle() {
        if (!this._instance)
            return;
    }
    getSelectedDates() {
        if (!this._instance)
            return [];
        return this._instance.selectedDates;
    }
    getCurrentYear() {
        if (!this._instance)
            return -1;
        return this._instance.currentYear;
    }
    getCurrentMonth() {
        if (!this._instance)
            return -1;
        return this._instance.currentMonth;
    }
    getConfig() {
        if (!this._instance)
            return {};
        return this._instance.config;
    }
    getValue() {
        if (!this._instance)
            return ''; //Or we could check/use findInputField() instead of _instance.input.
        return this._instance.input.value;
    }
    render() {
        return html `
      ${this._hasSlottedElement ? html `` : html `<input class="lit-flatpickr flatpickr flatpickr-input" />`}
      <slot></slot>
    `;
    }
};
__decorate([
    property({ type: String })
], LitFlatpickr.prototype, "altFormat", void 0);
__decorate([
    property({ type: Boolean })
], LitFlatpickr.prototype, "altInput", void 0);
__decorate([
    property({ type: String })
], LitFlatpickr.prototype, "altInputClass", void 0);
__decorate([
    property({ type: Boolean })
], LitFlatpickr.prototype, "allowInput", void 0);
__decorate([
    property({ type: String })
], LitFlatpickr.prototype, "ariaDateFormat", void 0);
__decorate([
    property({ type: Boolean })
], LitFlatpickr.prototype, "clickOpens", void 0);
__decorate([
    property({ type: String })
], LitFlatpickr.prototype, "dateFormat", void 0);
__decorate([
    property({ type: String })
], LitFlatpickr.prototype, "defaultDate", void 0);
__decorate([
    property({ type: Number })
], LitFlatpickr.prototype, "defaultHour", void 0);
__decorate([
    property({ type: Number })
], LitFlatpickr.prototype, "defaultMinute", void 0);
__decorate([
    property({ type: Array })
], LitFlatpickr.prototype, "disable", void 0);
__decorate([
    property({ type: Boolean })
], LitFlatpickr.prototype, "disableMobile", void 0);
__decorate([
    property({ type: Array })
], LitFlatpickr.prototype, "enable", void 0);
__decorate([
    property({ type: Boolean })
], LitFlatpickr.prototype, "enableTime", void 0);
__decorate([
    property({ type: Boolean })
], LitFlatpickr.prototype, "enableSeconds", void 0);
__decorate([
    property({ attribute: false })
], LitFlatpickr.prototype, "formatDateFn", void 0);
__decorate([
    property({ type: Number })
], LitFlatpickr.prototype, "hourIncrement", void 0);
__decorate([
    property({ type: Number })
], LitFlatpickr.prototype, "minuteIncrement", void 0);
__decorate([
    property({ type: Boolean })
], LitFlatpickr.prototype, "inline", void 0);
__decorate([
    property({ type: String })
], LitFlatpickr.prototype, "maxDate", void 0);
__decorate([
    property({ type: String })
], LitFlatpickr.prototype, "minDate", void 0);
__decorate([
    property({ type: String })
], LitFlatpickr.prototype, "mode", void 0);
__decorate([
    property({ type: String })
], LitFlatpickr.prototype, "nextArrow", void 0);
__decorate([
    property({ type: String })
], LitFlatpickr.prototype, "prevArrow", void 0);
__decorate([
    property({ type: Boolean })
], LitFlatpickr.prototype, "noCalendar", void 0);
__decorate([
    property({ type: Object })
], LitFlatpickr.prototype, "parseDateFn", void 0);
__decorate([
    property({ type: String })
], LitFlatpickr.prototype, "position", void 0);
__decorate([
    property({ type: Boolean })
], LitFlatpickr.prototype, "shorthandCurrentMonth", void 0);
__decorate([
    property({ type: Number })
], LitFlatpickr.prototype, "showMonths", void 0);
__decorate([
    property({ type: Boolean })
], LitFlatpickr.prototype, "static", void 0);
__decorate([
    property({ type: Boolean })
], LitFlatpickr.prototype, "time_24hr", void 0);
__decorate([
    property({ type: Boolean })
], LitFlatpickr.prototype, "weekNumbers", void 0);
__decorate([
    property({ type: Boolean })
], LitFlatpickr.prototype, "wrap", void 0);
__decorate([
    property({ type: String })
], LitFlatpickr.prototype, "theme", void 0);
__decorate([
    internalProperty()
], LitFlatpickr.prototype, "_hasSlottedElement", void 0);
LitFlatpickr = __decorate([
    customElement('lit-flatpickr')
], LitFlatpickr);
export { LitFlatpickr };
//# sourceMappingURL=LitFlatpickr.js.map