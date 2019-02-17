import { IPropertyPaneField, IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';
/**
 * Public interface that exposes this control's custom properties
 * @property {object} properties              - The WebPart's properties Object (this.properties).
 * @property {string} label                   - A label for this control.
 * @property {string} [description]           - A description for this control.
 * @property {number} min                     - The minimum value this control allows.
 * @property {number} max                     - The maximum value this control allows.
 * @property {boolean} applyOnClick           - Validate and apply changes on a button click (only useful for ReactivePropertyChanges mode).
 * @property {number} deferredValidationTime  - TimeOut in milisseconds to validate and apply changes (only useful for ReactivePropertyChanges mode)
 */
export interface NumberPickerFieldProps {
    properties: any;
    label: string;
    description?: string;
    min: number;
    max: number;
    applyOnClick?: boolean;
    deferredValidationTime?: number;
}
/**
 * The public NumberPicker Object
 */
export declare class NumberPicker implements IPropertyPaneField<IPropertyPaneCustomFieldProps> {
    type: any;
    targetProperty: string;
    properties: IPropertyPaneCustomFieldProps;
    shouldFocus: boolean;
    private config;
    private timeOut;
    constructor(targetProperty: string, config: NumberPickerFieldProps, context?: any, shouldFocus?: boolean);
    /**
     * Drawing of the control
     * @param element the element of the PropertyPane where this control will be drawn
     * @param context the webpart context (if we passe it to the NumberPicker Object)
     * @param changeCallback the callbakk to apply the property changes
     */
    private render;
    private addEvents;
    private applyChanges;
    private validateValue;
    private renderValidationError;
    private dispose;
}
