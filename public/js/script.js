today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();

var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

var months_vi = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

function showCalendar(wedding) {
  var day = new Date(wedding).getDate();
  var month = new Date(wedding).getMonth();
  var year = new Date(wedding).getFullYear();

  let firstDay = new Date(year, month).getDay();

  var caption = document.getElementById("caption");
  var calendar = document.getElementById("calendar"); // body of the calendar

  // clearing all previous cells
  calendar.innerHTML =
    '<tbody id="calendar">' +
    "<tr>" +
    "<th>Sun</th>" +
    "<th>Mon</th>" +
    "<th>Tue</th>" +
    "<th>Wed</th>" +
    "<th>Thu</th>" +
    "<th>Fri</th>" +
    "<th>Sat</th>" +
    "</tr></tbody>";

  // filing data about month and in the page via DOM.
  caption.innerHTML = months_vi[month] + " năm " + year;

  // creating all cells
  let date = 1;

  for (let i = 0; i < 6; i++) {
    // creates a table row
    let row = document.createElement("tr");

    //creating individual cells, filing them up with data.
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cell = document.createElement("td");
        cell.classList.add("none-day");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);

        cellInfo = document.createElement("span");
        cellInfo.setAttribute(
          "id",
          "dateLastMonth" + (daysInMonth(month - 1, year) - firstDay + 1 + j)
        );
        cellInfo.classList.add("date");
        cellInfoText = document.createTextNode(
          daysInMonth(month - 1, year) - firstDay + 1 + j
        );
        cellInfo.appendChild(cellInfoText);

        cell.appendChild(cellInfo);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year) && j == 0) {
        break;
      } else if (date > daysInMonth(month, year)) {
        cell = document.createElement("td");
        cell.classList.add("none-day");
        cellText = document.createTextNode("");
        cell.appendChild(cellText);

        cellInfo = document.createElement("span");
        cellInfo.setAttribute(
          "id",
          "dateNextMonth" + (date - daysInMonth(month, year))
        );
        cellInfo.classList.add("date");
        cellInfoText = document.createTextNode(date - daysInMonth(month, year));
        cellInfo.appendChild(cellInfoText);

        cell.appendChild(cellInfo);
        row.appendChild(cell);

        date++;
      } else {
        cell = document.createElement("td");
        if (j === 0 || j === 6) {
          cell.classList.add("weekend");
        }
        if (date == day) {
          cell.classList.add("today");
        }
        cell.setAttribute("id", "date" + date);

        cellText = document.createTextNode("");

        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("current-day");
        } // color today's date

        cell.appendChild(cellText);

        cellInfo = document.createElement("span");
        cellInfo.setAttribute("id", "date" + date);
        cellInfo.classList.add("date");
        cellInfoText = document.createTextNode(date);
        cellInfo.appendChild(cellInfoText);
        cellEventul = document.createElement("ul");

        cell.appendChild(cellInfo);

        row.appendChild(cell);
        date++;
      }

      calendar.appendChild(row); // appending each row into calendar body.
    }
  }
}

// function countdownTimer(date) {
//   var countDownDate = new Date(date).getTime();

//   // Update the count down every 1 second
//   var x = setInterval(function () {
//     // Get today's date and time
//     var now = new Date().getTime();

//     // Find the distance between now and the count down date
//     var distance = countDownDate - now;

//     // Time calculations for days, hours, minutes and seconds
//     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     var hours = Math.floor(
//       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//     );
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     // Display the result in the element with id="demo"
//     document.getElementById("countdown").innerHTML =
//       days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

//     // If the count down is finished, write some text
//     if (distance < 0) {
//       clearInterval(x);
//       document.getElementById("countdown").innerHTML = "EXPIRED";
//     }
//   }, 1000);
// }

// check how many days in a month code from https://dzone.com/articles/determining-number-days-month

function showWishes() {
  var datas = [
    {
      name: "Your name1",
      wishes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit condimentum risus, vel tristique libero elementum eget.",
    },
    {
      name: "Your name2",
      wishes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit condimentum risus, vel tristique libero elementum eget.",
    },
    {
      name: "Your name3",
      wishes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit condimentum risus, vel tristique libero elementum eget.",
    },
    {
      name: "Your name4",
      wishes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit condimentum risus, vel tristique libero elementum eget.",
    },
  ];
  var wishes = document.getElementById("replyWishes");

  wishes.innerHTML = "";

  datas.forEach((data) => {
    wishes.innerHTML +=
      '<div class="replyWishes-item">' +
      '<p class="name">' +
      data.name +
      "</p>" +
      '<p class="wishes">' +
      data.wishes +
      "</p></div>";
  });
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
