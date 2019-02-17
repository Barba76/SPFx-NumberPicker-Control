# SPFx-NumberPicker-Control
This is a NumberPicker custom control to be used at the PropertyPane

Usage:
1. Install dependencies with the command **_npm install_**
2. import the numberPicker.ts file on your SPFx project
3. create a new Instance of the numberPicker on the PropertyPaneConfiguration:

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

Perform changes:
a) After a .scss change, compile the .css with the command **_npm run scss_**
b) After a .ts cange, compile with the command **_tsc_**

## Picker Configuration Parameters ##

| Parameter        | Description           | Required  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

