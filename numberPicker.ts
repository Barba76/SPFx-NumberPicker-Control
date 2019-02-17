
import { IPropertyPaneField, IPropertyPaneCustomFieldProps, PropertyPaneFieldType } from '@microsoft/sp-webpart-base';
require ('./css/numberPicker.css');

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
  properties:any;
  label:string;
  description?:string;
  min: number;
  max: number;
  applyOnClick?: boolean;
  deferredValidationTime? : number;
}

/**
 * The public NumberPicker Object
 */
export class NumberPicker implements IPropertyPaneField<IPropertyPaneCustomFieldProps>{

  type: any = PropertyPaneFieldType.Custom;
  targetProperty:string;
  properties: IPropertyPaneCustomFieldProps;
  shouldFocus:boolean;
  private config : NumberPickerFieldProps;
  private timeOut : any;

  constructor(targetProperty:string, config : NumberPickerFieldProps, context?:any, shouldFocus?:boolean){
    this.targetProperty = targetProperty;
    this.shouldFocus = shouldFocus;
    this.properties = {
      key: "myNumberPicker",
      context: context,
      onRender : this.render.bind(this),
      onDispose : this.dispose.bind(this)
    }
    this.config = config;
  }

  /**
   * Drawing of the control
   * @param element the element of the PropertyPane where this control will be drawn
   * @param context the webpart context (if we passe it to the NumberPicker Object)
   * @param changeCallback the callbakk to apply the property changes
   */
  private render(element:HTMLElement, context:any, changeCallback:(targetProperty:string, newValue:any)=>void){
    let currentValue = this.config.properties[this.targetProperty] || this.config.min;
    let html = 
    `<div class="number-picker"> 
      <label class="ms-Label">${this.config.label}</label>
      <div class="wrapper"> 
        <div class="picker">
          <input type="text" value="${currentValue}"></input>   
          <button type="button" class="up-arrow">
            <i class="ms-Icon ms-Icon--CaretSolidUp"></i>
          </button>
          <button type="button" class="down-arrow">
            <i class="ms-Icon ms-Icon--CaretSolidDown"></i>
          </button>    
        </div>
      `;
  if (this.config.applyOnClick) {
    html += `
        <div class="apply-wrapper">
          <button type="button" class="apply-btn">Apply</button>
        </div>`;
  }
  html +=`
      </div>
      <span class="error-msg"></span>
      <span class="description">${this.config.description||""}</span>
    </div>`;

    element.innerHTML = html;

    let arrowUpbutton : HTMLButtonElement = <HTMLButtonElement>element.getElementsByClassName('up-arrow')[0];
    let arrowDownbutton : HTMLButtonElement = <HTMLButtonElement>element.getElementsByClassName('down-arrow')[0];
    
    if (currentValue-1<this.config.min){
      arrowDownbutton.disabled = true;
    }

    if (currentValue+1>this.config.max){
      arrowUpbutton.disabled = true;
    }

    this.addEvents(element, changeCallback);
  }

  private addEvents(element:HTMLElement, callback:(targetProperty:string, newValue:any)=>void ){

    let inputTextElement : HTMLInputElement = element.getElementsByTagName('input')[0];
    let arrowUpbutton : HTMLButtonElement = <HTMLButtonElement>element.getElementsByClassName('up-arrow')[0];
    let arrowDownbutton : HTMLButtonElement = <HTMLButtonElement>element.getElementsByClassName('down-arrow')[0];
    let applyButton : HTMLButtonElement = <HTMLButtonElement>element.getElementsByClassName('apply-btn')[0];

    arrowUpbutton.onclick=()=>{
        let oldValue = parseInt(inputTextElement.value);
        if (isNaN(oldValue)) oldValue = this.config.min;
        
        if (oldValue+1 <= this.config.max){
          inputTextElement.value = "" + (oldValue + 1);
          arrowDownbutton.disabled = false;
          if (oldValue+1 == this.config.max) arrowUpbutton.disabled = true;
          if (!this.config.applyOnClick) this.applyChanges(element, inputTextElement, callback);
        }else{
          arrowUpbutton.disabled = true;
        }
    }

    arrowDownbutton.onclick=()=>{
        let oldValue = parseInt(inputTextElement.value);
        if (isNaN(oldValue)) oldValue = this.config.min + 1;
        
        if (oldValue-1 >= this.config.min){
          inputTextElement.value = "" + (oldValue - 1);
          arrowUpbutton.disabled = false;
          if (oldValue-1 == this.config.min) arrowDownbutton.disabled = true;
          if (!this.config.applyOnClick) this.applyChanges(element, inputTextElement, callback);
        }else{
          arrowDownbutton.disabled = true;
        }
        
    }


    if (this.config.applyOnClick){
      applyButton.onclick=()=>{
          this.applyChanges(element, inputTextElement, callback);
        }
    }else{
      inputTextElement.oninput=()=>{
        this.applyChanges(element, inputTextElement, callback);
      }
    }
  }

  private applyChanges(element: HTMLElement, inputTextElement : HTMLInputElement, callback:(targetProperty:string, newValue:any)=>void ){
    let newValue = parseInt(inputTextElement.value);
    if (!newValue || isNaN(newValue)) newValue = this.config.min;
    let errorSpan : HTMLSpanElement = <HTMLSpanElement> element.getElementsByClassName('error-msg')[0];

    let time = this.config.deferredValidationTime || 0;
    if (time < 0 || this.config.applyOnClick) time = 0;

    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(()=>{

      if (this.validateValue(newValue)) {
        errorSpan.style.display = 'none';
        callback(this.targetProperty, newValue);
      }else{
        this.renderValidationError(errorSpan);
      }

    }, time);
  }

  private validateValue(value:number){
    return value >= this.config.min && value <= this.config.max;
  }

  private renderValidationError(errorSpan : HTMLSpanElement){
    errorSpan.textContent = `Invalid number: min:${this.config.min}, max:${this.config.max}`;
    errorSpan.style.display = 'block';
  }

  private dispose(element:HTMLElement){
    element.innerHTML="";
  }
}