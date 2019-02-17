# SPFx-NumberPicker-Control
This is a NumberPicker custom control to be used at the PropertyPane

![example](/picker.gif)

Usage:
1. Install dependencies with the command **_npm install_**
2. Import the numberPicker module on your SPFx project
e.g
``` javascript
import {NumberPicker} from '{path_to_numberPicker}/numberPicker';
```
3. Create a new NumberPicker Instance on the PropertyPaneConfiguration:

e.g.
```javascript
	new NumberPicker("picker", {
                  applyOnClick: false,
                  deferredValidationTime: 0,
                  label: "Picker",
                  description: "This is the number picker control",
                  max:100,
                  min:1,
                  properties: this.properties
                })
```

### Compile after perform any changes ###

a) After a .scss change, compile the .css with the command **_npm run scss_**

b) Recompile the module with the command **_tsc_** after any change

___

## Picker Configuration Parameters ##

| Parameter                  | type | Description                               | Default | Required  |
| -------------              |------|-------------------------------------------| ------- | --------- |
| applyOnClick               | boolean |Apply changes in a button click           | false   | No        |
| deferredValidationTime     | number | Delay (milliseconds) before trigger changes    | 0       | No        |
| label     | string | The label of the control    |       | Yes       |
| description  | string | A bottom description of the control   |       | No        |
| max | number | The maximum valid value |    | Yes |
| min | number | The minimum valid value |    | Yes |
| properties | any | The properties object |    | Yes |

___

GitHub: https://github.com/Barba76/SPFx-NumberPicker-Control

