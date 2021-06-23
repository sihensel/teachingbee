# Teachingbee

__Teachingbee__  
Webapp für Studenten um Lernpartner zu finden.

## Features

Feature | Team
--- | ---
Sign Up | Lisa, Tim
Login | 
Logout | 
Create Profile | Kai, Tobi
Manage Profile | Jacky, Simon
Manage Person | Jacky, Simon
Matching | Simon
Request Contact | Simon
Chat | Kai, Tobi
Join Group | Lisa, Tim
Create Group | Lisa, Tim
Leave Group | Lisa, Tim
Delete Group | Lisa, Tim
Delete | Simon


## Set source directory for Python
In VSCode muss unter umständen die `root directory` für das Python backend gesetzt werden.  
Dazu die folgenden Zeilen in der `settings.json` einfügen.

```json
"terminal.integrated.env.osx": {
    "PYTHONPATH": "${workspaceFolder}/backend",
},
"terminal.integrated.env.linux": {
    "PYTHONPATH": "${workspaceFolder}/backend",
},
"terminal.integrated.env.windows": {
    "PYTHONPATH": "${workspaceFolder}/backend",
},
"python.envFile": "${workspaceFolder}/.env"
```

## Used Node Modules
Im Folgenden befinden sich alle genutzten Node Modules.
Sie können über `npm i <module>` installiert werden.

- @material-ui/core
- @material-ui/icons
- @material-ui/pickers
- @material-ui/lab
- @date-io/date-fns@1.x date-fns
- react-router-dom
- firebase