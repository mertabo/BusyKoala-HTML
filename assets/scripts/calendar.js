// Dummy data
const calendar = {
  6: {
    8: ["Sesh (10AM @ Exist Software Labs, Inc.)"],
    18: ["Birthday"],
    19: ["Gala", "Swimming"],
  }
}

// Converts military time to standard form (13:01 -> 1:01 PM)
function militaryToStandart(str) {
  const time = str.split(":");
  let result = parseInt(time[0] % 12);
  result = (result === 0 ? 12 : result) + ":" + time[1] + (time[0] >= 12 ? " PM" : " AM");
  
  return result;
}

// Converts string to title case
function toTitleCase(str) {
  return str.split(' ')
   .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
   .join(' ');
}

// Returns the currently selected month
function getSelectedMonth() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let selectedMonth = document.getElementsByClassName("active-card")[0];
  selectedMonth = months.indexOf(toTitleCase(selectedMonth.innerText));

  return selectedMonth;
}

function initCalendar() {
  const WEEKDAYS = 7;
  
  // Get the selected month
  const selectedMonth = getSelectedMonth();

  // Get the weekday of the first day of month
  const date = new Date();
  const firstDayCurrentMonth = (new Date(date.getFullYear(), selectedMonth, 1)).getDay();

  // Get the last date of month
  const lastDateCurrentMonth = (new Date(date.getFullYear(), selectedMonth + 1, 0)).getDate();

  // Get the number of weeks of month
  const weeks = Math.ceil((firstDayCurrentMonth + lastDateCurrentMonth) / 7);

  // Make sure table is clear before filling
  const calendarBody = document.getElementById("calendarBody");
  calendarBody.innerHTML = "";
  
  let dateCounter = 1;

  // Fill table with dates
  for (i = 0; i < weeks; i++) {
    // Create row
    const tr = document.createElement("tr");
    calendarBody.appendChild(tr);

    for (j = 0; j < WEEKDAYS; j++) {
      // Create table data
      const td = document.createElement("td");
      
      // Write dates in table data
      if ((i !== 0 || j >= firstDayCurrentMonth) && dateCounter <= lastDateCurrentMonth) {
        const h6 = document.createElement("h6");
        td.id = dateCounter;
        h6.innerText = dateCounter++;
        
        td.appendChild(h6);
      }

      tr.appendChild(td);
    }
  }
}

function getEvents() {
  // Get the selected month
  const selectedMonth = getSelectedMonth();
  const monthData = calendar[selectedMonth];

  // Write events to their respective <td>
  if (monthData) {
    // Loop through dates with event/s
    for (const date in monthData) {
      const td = document.getElementById(date);

      // Loop through event/s
      monthData[date].forEach(event => {
        const p = document.createElement("p");
        p.innerText = event;
        p["title"] = event;
        
        td.appendChild(p);
      })
    }
  }
}

initCalendar();
getEvents();

// Create event
function postEvent() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value.split("-");
  const time = document.getElementById("time").value;
  const workplace = document.getElementById("workplace").value;
  const month = date[1] - 1;
  const day = date[2] - 0;

  // if (!title || !date) return;
  
  // Title (Time @ Workspace)
  let newEvent = title;

  if (time || workplace) {
    newEvent += " (";
    
    if (time) { 
      newEvent += militaryToStandart(time);
      if (workplace) { newEvent += " @"} 
    } 
    if (workplace) {
      newEvent += workplace;
    }
    newEvent += ")";
  }

  console.log(newEvent);

  // Find month
  if (calendar[month]) {
    // Existing month
    const monthData = calendar[month];

    // Find date
    if (monthData[day]) {
      monthData[day].push("hello");
    } else {
      monthData[day] = "hello";
    }
  } else {
    // No month yet, create one

  }

  // console
  // console.log(title.value, parseInt(date.value.split("-")[1]), time.value, workplace.value);
  // militaryToStandart(time.value);
}