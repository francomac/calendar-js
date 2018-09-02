"use stric";

(() => {
  drawSupportedCountryList();

  let calendarDate = document.querySelector("#calendarDate");
  let calendarDays = document.querySelector("#calendarDays");
  let calendarCountry = document.querySelector("#calendarCountry");
  let calendarContainer = document.querySelector("#calendarContainer");

  let month = ""; // get month selected in view
  let year = ""; // get year selected in view
  let startDay = ""; // calendar start day
  let country = ""; // get country typed in view

  let calendar = document.createElement("div");
  calendar.id = "calendar";
  let dayContainer = "";
  let dayData = "";

  // getting country holidays for an specific month and year
  let calendarHolidayDates = [];

  // adding event onChagne for 'Calendar' input
  document
    .querySelector("#calendarDate")
    .addEventListener("change", function(event) {
      event.preventDefault();
      getBasicData();
      calendarHolidayDates = getHolidays(month, year, country);
      cleanCalendar();
    });

  // adding event click for 'Go' Button
  document
    .querySelector("#getCalendar")
    .addEventListener("click", function(event) {
      event.preventDefault();
      getCalendar();
    });

  // get basic data from inputs
  function getBasicData() {
    month = calendarDate.value.slice(5, 7); // get month selected in view
    year = calendarDate.value.slice(0, 4); // get year selected in view
    startDay = calendarDate.value.slice(8, 10); // calendar start day
    country = calendarCountry.value; // get country typed in view
  }

  //clean old calendar prepering to render new one.
  function cleanCalendar() {
    while (calendar.firstChild) {
      calendar.removeChild(calendar.firstChild);
    }
    calendarContainer.appendChild(calendar);
  }

  // draw all days in calendar
  function getCalendar() {
    getBasicData();

    let drawed = false; // are invalid days drawed?
    let dayIndx = ""; // day index in week (0 -6)

    cleanCalendar();

    drawWeekHeader();

    // zero-based
    // get number days in an specific month
    monthLength = new Date(year, month, 0).getDate();

    // compose calendar with valid/invalid days, holidays, weekends
    for (
      let dayNum = Number(startDay);
      dayNum < Number(startDay) + Number(calendarDays.value) && dayNum <= 31;
      dayNum++
    ) {
      // day index in week (0-6)
      dayIndx = dayIndxInWeek(month, year, dayNum);

      // insert FIRST INVALID days in calendar
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

      // is NOT sunday and not saturday? VALID day
      if (dayIndx !== 0 && dayIndx !== 6) {
        dayContainer.className = "dayContainer validDay";
      }

      // is sunday or saturday? WEEKEND day
      if (dayIndx == 0 || dayIndx == 6) {
        dayContainer.className = "dayContainer weekend";
      }

      // is this day today?
      if (isToday(dayNum)) {
        dayContainer.className = "dayContainer today";
      }

      if (calendarHolidayDates != undefined) {
        // calendarHolidayDates.includes(dayNum)) ;
        calendarHolidayDates.forEach(date => {
          if (dayNum == date.slice(8, 10)) {
            dayContainer.className = "dayContainer holiday";
          }
        });
      }

      // insert VALID days in calendar
      if (dayNum <= monthLength) {
        dayData = document.createTextNode(dayNum);
        dayContainer.appendChild(dayData);
        calendar.appendChild(dayContainer);
      }

      // insert LAST INVALID days in calendar
      if (dayNum > monthLength) {
        dayContainer = document.createElement("span");
        dayContainer.className = "dayContainer invalidDay";
        dayData = document.createTextNode("");
        dayContainer.appendChild(dayData);
        calendar.appendChild(dayContainer);
      }
    }
  }

  // get day index according to month day and year.
  function dayIndxInWeek(month, year, day) {
    // Month zero-based
    // Sunday - Saturday : 0 - 1
    // Expected output: 0, 1, 2, 3, 4, 5, 6
    let dayRef = new Date(Date.UTC(year, Number(month) - 1, day, 0, 0, 0));

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

    // adding event onChagne for 'Calendar' input
    selectList.addEventListener("change", function(event) {
      getBasicData();
      calendarHolidayDates = getHolidays(month, year, country);
      cleanCalendar();
    });

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

    if (month != "" && year != "" && country != "") {
      if (month < Number(new Date().getMonth()) + 1) {
        document.querySelector("#outputMsg").innerHTML = "";
        let getCorsRequest = makeCorsRequest(month, year, country);
  
        getCorsRequest.then(
          response => {
            let holidays = JSON.parse(response).holidays;
            if (holidays != undefined) {
              let holidaysDate = holidays.map(function(holiday) {
                return holiday.date;
              });
              // holidaysDate.forEach(date => {
              //   console.log(date.slice(8, 10));
              // });
              calendarHolidayDates = holidaysDate;
              return holidaysDate;
            }
            return false;
          },
          err => {
            throw Error(response.statusText);
          }
        );
      } else {
        document.querySelector("#outputMsg").innerHTML = "";
        document.querySelector("#outputMsg").innerHTML =
          "<code>Holidays will not be highlighted for your selected date, you can still get your calendar. Sorry!&nbsp; Holiday Api is limited to historical data for free accounts. A premium account access is required to current and upcoming holiday data. <br> Franco MaC :)</code>";
      }
    }
  }

  // Create the XHR object.
  function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  }

  // Make the actual CORS request.
  function makeCorsRequest(month, year, country) {
    return new Promise((resolve, reject) => {
      var url = `https://holidayapi.com/v1/holidays?key=527663a9-2932-4246-b950-bdaad94c94af&country=${country}&year=${year}&month=${month}`;

      var xhr = createCORSRequest("GET", url);

      if (xhr) {
        // Response handlers.
        xhr.onload = function() {
          var text = xhr.responseText;
          resolve(xhr.responseText);
        };
        xhr.onerror = function() {
          console.log(
            "Woops, there was an error making the request to https://www.holidayapi.com ."
          );
          reject(
            "Woops, there was an error making the request to https://www.holidayapi.com ."
          );
        };
        xhr.send();
      } else {
        reject(
          "Woops, there was an error making the request to https://www.holidayapi.com ."
        );
      }
    });
  }
})();
