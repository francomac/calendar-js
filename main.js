'use stric';

(() => {

    let calendarDate = document.querySelector('#calendarDate');
    let calendarDays = document.querySelector('#calendarDays');
    let calendarCountry = document.querySelector('#calendarCountry');
    let calendarContainer = document.querySelector("#calendarContainer");

    let calendar = document.createElement('div');
    calendar.id = 'calendar';
    let dayContainer = "";
    let dayData = "";

    document.querySelector("#getCalendar").addEventListener("click", function (event) {
        event.preventDefault();
        getCalendar();
    });

    // draw all days in calendar 
    function getCalendar() {

        let month = calendarDate.value.slice(5, 7); // get month selected in view
        month -= 1; // zero-based
        let year = calendarDate.value.slice(0, 4); // get year selected in view
        let startDay = calendarDate.value.slice(8, 10); // calendar start day
        let country = calendarCountry.value; // get country typed in view

        let drawed = false; // are invalid days drawed?
        let dayIndx = ''; // day index in week (0 -6)

        console.log('getMonth() : ' + (new Date().getMonth()));
        console.log('month : ' + month);
        console.log('year : ' + year);
        console.log('country : ' + country);

        let paras = document.getElementsByClassName('dayContainer');
        if (paras.length > 0) {
            calendar.remove();
        }

        calendarContainer.appendChild(calendar);

        getHolidays(month, year, country);
        drawWeekHeader();

        // zero-based
        // get number days in an specific month
        monthLength = (new Date(year, month, 0).getDate());
        console.log('monthLength ' + monthLength);
        
        console.log('startDay + calendarDays.value = ' + (Number(startDay) + Number(calendarDays.value) - 1));

        // compose calendar with valid/invalid days, holidays, weekends
        for (var dayNum = Number(startDay); dayNum <= (Number(startDay) + Number(calendarDays.value)) && dayNum <= 31 ; dayNum++) {

            // day index in week (0-6)
            dayIndx = dayIndxInWeek(month, year, dayNum);

            // insert FIRST invalid days in calendar 
            (function (dayIndx) {
                if (!drawed) {
                    // invalid days total is equal to dayIndx
                    for (let index = 0; index < dayIndx; index++) {
                        dayContainer = document.createElement('span');
                        dayContainer.className = 'dayContainer invalidDay';
                        dayData = document.createTextNode('');
                        dayContainer.appendChild(dayData);
                        calendar.appendChild(dayContainer);
                    }
                    drawed = true;
                }
            })(dayIndx);

            dayContainer = document.createElement('span');

            // is not sunday and not saturday
            if (dayIndx !== 0 && dayIndx !== 6) {
                dayContainer.className = 'dayContainer validDay';
            } else if (dayIndx == 0 || dayIndx == 6) {
                // is sunday or saturday
                dayContainer.className = 'dayContainer weekend';
            }

            // is this day today 
            if (isToday(dayNum)) {
                dayContainer.className = 'dayContainer today';
            }

            // insert day in calendar
            dayData = document.createTextNode(dayNum);
            dayContainer.appendChild(dayData);
            calendar.appendChild(dayContainer);

            // insert LAST invalid days in calendar 
            (function (monthLength) {
                for (let index = monthLength; index <= 36; index++) {
                    if (dayNum == monthLength) {
                        dayContainer = document.createElement('span');
                        dayContainer.className = 'dayContainer invalidDay';
                        dayData = document.createTextNode('');
                        dayContainer.appendChild(dayData);
                        calendar.appendChild(dayContainer);
                    }
                }
            })(monthLength);
        }
    }

    // get day index according to month day and year.
    function dayIndxInWeek(month, year, day) {
        // Sunday - Saturday : 0 - 1
        // Expected output: 0, 1, 2, 3, 4, 5, 6 
        let dayRef = new Date(Date.UTC(year, month, day, 0, 0, 0));

        dayRef = dayRef.toUTCString().slice(0, 3);
        switch (dayRef) {
            case 'Sun':
                return 0;
                break;
            case 'Mon':
                return 1;
                break;
            case 'Tue':
                return 2;
                break;
            case 'Wed':
                return 3;
                break;
            case 'Thu':
                return 4;
                break;
            case 'Fri':
                return 5;
                break;
            case 'Sat':
                return 6;
                break;
            default:
                break;
        }
    }

    // check if day is today
    function isToday(dayToCheck) {
        // is this day today?
        return dayToCheck == new Date().getDate();
    }

    // draw week header in calendar
    function drawWeekHeader() {
        for (let day = 0; day < 7; day++) {
            dayContainer = document.createElement('span');
            switch (day) {
                case 0:
                    dayData = document.createTextNode('Sun');
                    break;
                case 1:
                    dayData = document.createTextNode('Mon');
                    break;
                case 2:
                    dayData = document.createTextNode('Tue');
                    break;
                case 3:
                    dayData = document.createTextNode('Wed');
                    break;
                case 4:
                    dayData = document.createTextNode('Thu');
                    break;
                case 5:
                    dayData = document.createTextNode('Fri');
                    break;
                case 6:
                    dayData = document.createTextNode('Sat');
                    break;
                default:
                    break;
            }
            dayContainer.className = 'dayContainer';
            dayContainer.appendChild(dayData);
            calendar.appendChild(dayContainer);
        }
    }

    // get holidays according to inputs: month, year, country
    function getHolidays(month, year, country) {

        if (month < ((new Date().getMonth()) + 1)) {
            fetch(`https://holidayapi.com/v1/holidays?key=527663a9-2932-4246-b950-bdaad94c94af&country=${country}&year=${year}&month=${month}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    let holidays = (JSON.stringify(myJson));
                    console.log(holidays);
                    console.log(holidays);
                });
        } else {
            document.querySelector('#outputMsg').innerHTML += "<code>Sorry!&nbsp; Holiday Api free accounts are limited to historical data. A premium account access is required to current and upcoming holiday data.<br> Franco :)</code>";
        }
    }

})()