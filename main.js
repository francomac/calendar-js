"use stric";

(() => {
  drawSupportedCountryList();

  let calendarDate = document.querySelector("#calendarDate");
  let calendarDays = document.querySelector("#calendarDays");
  let calendarCountry = document.querySelector("#calendarCountry");
  let calendarContainer = document.querySelector("#calendarContainer");

  let calendar = document.createElement("div");
  calendar.id = "calendar";
  let dayContainer = "";
  let dayData = "";

  let holidayDates = [];

  document
    .querySelector("#getCalendar")
    .addEventListener("click", function(event) {
      event.preventDefault();
      getCalendar();
    });

  // draw all days in calendar
  function getCalendar() {
    let month = calendarDate.value.slice(5, 7); // get month selected in view
    
    //month -= 1; // zero-based
    
    let year = calendarDate.value.slice(0, 4); // get year selected in view
    let startDay = calendarDate.value.slice(8, 10); // calendar start day
    let country = calendarCountry.value; // get country typed in view

    let drawed = false; // are invalid days drawed?
    let dayIndx = ""; // day index in week (0 -6)

    console.log("getMonth() : " + new Date().getMonth());
    console.log("month : " + month);
    console.log("year : " + year);
    console.log("country : " + country);

    // clean up old calendar to draw a new one.
    while (calendar.firstChild) {
      calendar.removeChild(calendar.firstChild);
    }
    calendarContainer.appendChild(calendar);

    drawWeekHeader();

    // zero-based
    // get number days in an specific month
    console.log(month);
    monthLength = new Date(year, (month), 0).getDate();
    console.log("monthLength " + monthLength);

    console.log(
      "startDay + calendarDays.value = " +
        (Number(startDay) + Number(calendarDays.value) - 1)
    );

    // compose calendar with valid/invalid days, holidays, weekends
    for (
      let dayNum = Number(startDay);
      dayNum <= Number(startDay) + Number(calendarDays.value) && dayNum <= 31;
      dayNum++
    ) {
      // day index in week (0-6)
      dayIndx = dayIndxInWeek(month, year, dayNum);

      // insert FIRST invalid days in calendar
      (function(dayIndx) {
        if (!drawed) {
          // invalid days total is equal to dayIndx
          for (let index = 0; index < dayIndx; index++) {
            dayContainer = document.createElement("span");
            dayContainer.className = "dayContainer invalidDay";
            dayData = document.createTextNode("");
            dayContainer.appendChild(dayData);
            calendar.appendChild(dayContainer);
          }
          drawed = true;
        }
      })(dayIndx);

      dayContainer = document.createElement("span");

      // is not sunday and not saturday
      if (dayIndx !== 0 && dayIndx !== 6) {
        dayContainer.className = "dayContainer validDay";
      }

      // is sunday or saturday
      if (dayIndx == 0 || dayIndx == 6) {
        dayContainer.className = "dayContainer weekend";
      }

      // is this day today
      if (isToday(dayNum)) {
        dayContainer.className = "dayContainer today";
      }

    //   holidayDates = getHolidays(month, year, country);

    //   if (holidayDates != undefined && holidayDates.includes(dayNum)) {
    //     dayContainer.className = "dayContainer holiday";
    //   }

      // insert day in calendar
      dayData = document.createTextNode(dayNum);
      dayContainer.appendChild(dayData);
      calendar.appendChild(dayContainer);

      // insert LAST invalid days in calendar
      (function(monthLength) {
        for (let index = monthLength; index < 32; index++) {
          if (dayNum > monthLength) {
            dayContainer = document.createElement("span");
            dayContainer.className = "dayContainer invalidDay";
            dayData = document.createTextNode("");
            dayContainer.appendChild(dayData);
            calendar.appendChild(dayContainer);
          }
        }
      })(monthLength);
    }
  }

  // get day index according to month day and year.
  function dayIndxInWeek(month, year, day) {
    // Month zero-based
    // Sunday - Saturday : 0 - 1
    // Expected output: 0, 1, 2, 3, 4, 5, 6
    let dayRef = new Date(Date.UTC(year, (Number(month)-1), day, 0, 0, 0));

    dayRef = dayRef.toUTCString().slice(0, 3);
    switch (dayRef) {
      case "Sun":
        return 0;
        break;
      case "Mon":
        return 1;
        break;
      case "Tue":
        return 2;
        break;
      case "Wed":
        return 3;
        break;
      case "Thu":
        return 4;
        break;
      case "Fri":
        return 5;
        break;
      case "Sat":
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

  // List of Supported Country List according holidayapi.com (8/30/2018)
  function drawSupportedCountryList() {
    //Create array of options to be added
    let array = [
      "AO-Angola",
      "AT-Austria",
      "AU-Australia",
      "AW-Aruba",
      "AX-Åland Islands",
      "BA-Bosnia and Herzegovina",
      "BE-Belgium",
      "BG-Bulgaria",
      "BO-Bolivia",
      "BR-Brazil",
      "BS-The Bahamas",
      "CA-Canada",
      "CH-Switzerland",
      "CN-China",
      "CO-Colombia",
      "CR-Costa Rica",
      "CU-Cuba",
      "CZ-Czech Republic",
      "DE-Germany",
      "DK-Denmark",
      "DO-Dominican Republic",
      "EC-Ecuador",
      "ES-Spain",
      "FI-Finland",
      "FR-France",
      "FR-A Alsace",
      "GB-United Kingdom",
      "GB-ENG England",
      "GB-NIR Northern Ireland",
      "GB-SCT Scotland",
      "GB-WLS Wales",
      "GR-Greece",
      "GT-Guatemala",
      "HK-Hong Kong HN Honduras",
      "HR-Croatia",
      "HU-Hungary",
      "ID-Indonesia",
      "IE-Ireland",
      "IN-India",
      "IL-Israel",
      "IS-Iceland",
      "IT-Italy",
      "JP-Japan",
      "KZ-Kazakhstan",
      "LS-Lesotho",
      "LU-Luxembourg MG Madagascar",
      "MQ-Martinique",
      "MT-Malta",
      "MU-Mauritius",
      "MX-Mexico",
      "MZ-Mozambique",
      "NG-Nigeria",
      "NL-Netherlands",
      "NO-Norway",
      "PE-Peru",
      "PK-Pakistan",
      "PH-Philippines",
      "PL-Poland",
      "PR-Puerto Rico",
      "PT-Portugal",
      "PY-Paraguay",
      "RE-Réunion",
      "RO-Romania RU Russia",
      "SC-Seychelles",
      "SE-Sweden SG Singapore SI Slovenia",
      "ST-Sao Tome and Principe",
      "SK-Slovakia",
      "TN-Tunisia",
      "TR-Turkey UA Ukraine",
      "US-United States",
      "UY-Uruguay",
      "VE-Venezuela",
      "ZA-South Africa",
      "ZW-Zimbabw"
    ];
    let countryData = "";
    let countrySelectContainer = document.querySelector(
      "#calendarCountrySelect"
    );

    //Create and append select list
    let selectList = document.createElement("select");
    selectList.setAttribute("id", "calendarCountry");
    countrySelectContainer.appendChild(selectList);

    //Create and append the options
    for (let i = 0; i < array.length; i++) {
      countryData = array[i];
      countryData = countryData.split("-");

      let option = document.createElement("option");
      option.setAttribute("value", countryData[0]);
      option.text = countryData[1];
      selectList.appendChild(option);
    }
  }

  // draw week header in calendar
  function drawWeekHeader() {
    for (let day = 0; day < 7; day++) {
      dayContainer = document.createElement("span");
      switch (day) {
        case 0:
          dayData = document.createTextNode("Sun");
          break;
        case 1:
          dayData = document.createTextNode("Mon");
          break;
        case 2:
          dayData = document.createTextNode("Tue");
          break;
        case 3:
          dayData = document.createTextNode("Wed");
          break;
        case 4:
          dayData = document.createTextNode("Thu");
          break;
        case 5:
          dayData = document.createTextNode("Fri");
          break;
        case 6:
          dayData = document.createTextNode("Sat");
          break;
        default:
          break;
      }
      dayContainer.className = "dayContainer";
      dayContainer.appendChild(dayData);
      calendar.appendChild(dayContainer);
    }
  }

  // get holidays according to inputs: month, year, country
  function getHolidays(month, year, country) {
    let url = `https://holidayapi.com/holidayapi.com/v1/holidays?key=527663a9-2932-4246-b950-bdaad94c94af&country=${country}&year=${year}&month=${month}`;

    console.log("getMonth : " + (Number(new Date().getMonth()) + 1));
    console.log("month : " + month);

    month += 1; // month must be one-based

    console.log("month++ : " + month);

    if (month < Number(new Date().getMonth()) + 1) {
      fetch(url, {
        credentials: 'include',
        mode: 'cors',
        'Content-Type': 'application/json'
      })
        .then(function(myJson) {
          if (!myJson.ok) {
            throw Error(myJson.statusText);
          }
          console.log(myJson);
          let holidays = myJson["holidays"];
          console.log(holidays);
          if (holidays != undefined) {
            let holidaysDate = holidays.map(function(holiday) {
              return holiday.date;
            });
            holidaysDate.forEach(date => {
              console.log(date.slice(8, 10));
            });
            return holidaysDate;
          }
          return false;
        })
        .catch(() =>
          console.log("Can’t access " + url + " response. Blocked by browser?")
        );
    } else {
      document.querySelector("#outputMsg").innerHTML +=
        "<code>Sorry!&nbsp; Holiday Api free accounts are limited to historical data. A premium account access is required to current and upcoming holiday data.<br> Franco :)</code>";
    }
  }
})();
