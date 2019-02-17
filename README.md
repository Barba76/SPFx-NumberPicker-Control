# SPFx-NumberPicker-Control
This is a NumberPicker custom control to be used at the PropertyPane

Usage:
1. Install dependencies with the command **_npm install_**
2. import the numberPicker.ts file on your SPFx project
3. create a new Instance of the numberPicker on the PropertyPaneConfiguration:

e.g:
new NumberPicker("picker", {
                  applyOnClick: false,
                  deferredValidationTime: 0,
                  label: "Picker A",
                  description: "This is the number picker control",
                  max:100,
                  min:1,
                  properties: this.properties
                }),
