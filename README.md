# Data Graph Web

This project shows a graph of data that changes over time (per 30 minutes).

Use Chart JS Library

Documentation can be found at: https://www.chartjs.org/docs/latest/samples/information.html

[![Version](https://img.shields.io/badge/version-v.1.0-pink)]() [![Framework](https://img.shields.io/static/v1?label=Angular%20Framework&message=12.0.3&color=red)]() [![Node](https://img.shields.io/static/v1?label=Node&message=14.15.4&color=green)]() [![Chart JS](https://img.shields.io/static/v1?label=ChartJS&message=3.7.1&color=yellow)]()

## Requirements.

- [Node 14.15.4](https://nodejs.org/es/download/) for cross-platform runtime environment.
- [Angular 12.0.3]() for develop web apps.
- An IDE to support us with imports, functions of each object and control of some code errors.

# Resume

This project obtains data reading a .txt file parsing the data to JSON format to group it by time. 

```txt
Hora,Barra,CM_energia,CM_Congestion,CM_Total,Codigo
2022-05-24 01:00:00,SOCABAYA 220,151.406799,0,151.406799,200808
2022-05-24 00:30:00,SOCABAYA 220,151.406799,0,151.406799,200808

```
The X axis or well called Labels are built in the formation of a maximum of 96 schedules in a 24-hour format and for every half hour.

```JS
[00:30, 01:00, 01:30, 02:00..... 23:30, 23:59]
```
The times are grouped according to the current date up to the previous maximum date and the maximum time to be displayed is the current time.

```JS
let date = new Date(); // Today
let yesteday = ''; // ...
let beforeYesterday = ''; // ...

let hours = ['2022-05-04 10:30', '2022-05-04 11:00', ...];
```



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
