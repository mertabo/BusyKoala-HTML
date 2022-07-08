const USER = "ericka";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SHOWOFFCANVAS_MAXWINDOWSIZEPX = 991;

// Dummy data
const attendeesToday = [
  {name: "Millie Bobby Brown", time: ["9:12 AM"], duration: "0mins"},
  {name: "Taylor Swift", time: ["9:12 AM"], duration: "0mins"},
  {name: "Gaten Matarazzo", time: ["9:11 AM - 9:54 AM"], duration: "43mins"},
  {name: "Joe Keery", time: ["9:10 AM", "9:00 AM - 9:05 AM"], duration: "5mins"},
];

const workspaces = [
  {
    name: "Exist Software Labs, Inc.",
    owner: "exist",
    when: "Mon-Fri",
    data: [
      {
        month: 6,
        date: 8,
        time: [
          {name: "Millie Bobby Brown", user: "millaeh",time: ["9:05 AM - 10:30 AM"], duration: "1hr 25mins"},
          {name: "Taylor Swift", user: "taytay",time: ["9:04 AM - 10:04 AM"], duration: "1hr"},
          {name: "Joe Keery", user: "steve",time: ["10:00 AM - 10:30 AM", "9:02 AM - 9:48 AM"], duration: "1hr 16mins"},
          {name: "Gaten Matarazzo", user: "dusty-bun",time: ["8:59 AM - 10:30 AM"], duration: "1hr 31mins"},
          {name: "Ericka Tabo", user: "ericka",time: ["8:50 AM"], duration: "0mins"},
        ]
      },
      {
        month: 6,
        date: 3,
        time: [
          {name: "Millie Bobby Brown", user: "millaeh",time: ["9:05 AM - 10:30 AM"], duration: "1hr 25mins"},
          {name: "Taylor Swift", user: "taytay",time: ["9:04 AM - 10:04 AM"], duration: "1hr"},
          {name: "Joe Keery", user: "steve",time: ["10:00 AM - 10:30 AM", "9:02 AM - 9:48 AM"], duration: "1hr 16mins"},
          {name: "Gaten Matarazzo", user: "dusty-bun",time: ["8:59 AM - 10:30 AM"], duration: "1hr 31mins"},
          {name: "Ericka Tabo", user: "ericka",time: ["10:46 AM - 11:00 AM", "8:59 AM - 10:30 AM"], duration: "1hr 45mins"},
        ]
      },
      {
        month: 6,
        date: 2,
        time: [
          {name: "Millie Bobby Brown", user: "millaeh",time: ["9:05 AM - 10:30 AM"], duration: "1hr 25mins"},
          {name: "Taylor Swift", user: "taytay",time: ["9:04 AM - 10:04 AM"], duration: "1hr"},
          {name: "Joe Keery", user: "steve",time: ["10:00 AM - 10:30 AM", "9:02 AM - 9:48 AM"], duration: "1hr 16mins"},
          {name: "Gaten Matarazzo", user: "dusty-bun",time: ["8:59 AM - 10:30 AM"], duration: "1hr 31mins"},
          {name: "Ericka Tabo", user: "ericka",time: ["10:00 AM - 10:30 AM", "9:02 AM - 9:48 AM"], duration: "1hr 16mins"},
        ]
      },
      {
        month: 6,
        date: 1,
        time: [
          {name: "Millie Bobby Brown", user: "millaeh",time: ["9:05 AM - 10:30 AM"], duration: "1hr 25mins"},
          {name: "Taylor Swift", user: "taytay",time: ["9:04 AM - 10:04 AM"], duration: "1hr"},
          {name: "Joe Keery", user: "steve",time: ["10:00 AM - 10:30 AM", "9:02 AM - 9:48 AM"], duration: "1hr 16mins"},
          {name: "Gaten Matarazzo", user: "dusty-bun",time: ["8:59 AM - 10:30 AM"], duration: "1hr 31mins"},
        ]
      },
      {
        month: 5,
        date: 3,
        time: [
          {name: "Millie Bobby Brown", user: "millaeh",time: ["9:05 AM - 10:30 AM"], duration: "1hr 25mins"},
          {name: "Taylor Swift", user: "taytay",time: ["9:04 AM - 10:04 AM"], duration: "1hr"},
          {name: "Joe Keery", user: "steve",time: ["10:00 AM - 10:30 AM", "9:02 AM - 9:48 AM"], duration: "1hr 16mins"},
          {name: "Gaten Matarazzo", user: "dusty-bun",time: ["8:59 AM - 10:30 AM"], duration: "1hr 31mins"},
          {name: "Ericka Tabo", user: "ericka",time: ["10:00 AM - 10:30 AM", "9:02 AM - 9:48 AM"], duration: "1hr 16mins"}
        ]
      },
    ]
  },
  {
    name: "My Session",
    owner: "ericka",
    when: "Tue, Thu",
    data: [
      {
        month: 6,
        date: 31,
        time: [
          {name: "Millie Bobby Brown", user: "millaeh",time: ["9:05 AM - 10:30 AM"], duration: "1hr 25mins"},
          {name: "Taylor Swift", user: "taytay",time: ["9:04 AM - 10:04 AM"], duration: "1hr"},
          {name: "Joe Keery", user: "steve",time: ["10:00 AM - 10:30 AM", "9:02 AM - 9:48 AM"], duration: "1hr 16mins"},
          {name: "Gaten Matarazzo", user: "dusty-bun",time: ["8:59 AM - 10:30 AM"], duration: "1hr 31mins"},
        ]
      },
    ]
  },
];

// Converts string to title case format
function toTitleCase(str) {
  return str.split(' ')
   .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
   .join(' ');
}

// Initialize bootstrap toasts
function initToasts(title, body) {
  document.getElementById("timeButton").onclick = function() {
    const toast = document.getElementById("liveToast");
    
    const toastTitle = document.getElementsByClassName("toast-title")[0];
    toastTitle.innerText = title;
    
    const toastBody = document.getElementsByClassName("toast-body")[0];
    toastBody.innerText = body;

    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  }
}

// Returns duration between a start date and an end date in the format: 0hrs 0mins
function getDurationFromDates(start, end) {
  let newTime = "";

  // Get hours and minutes
  let minutes = (new Date(end).getTime() - new Date(start).getTime()) / 60000;
  const hours = Math.floor(minutes / 60);
  minutes = Math.floor(minutes % 60);

  // Format new time
  if (hours > 0) {
    newTime += `${hours}hrs`;
    if (minutes > 0) newTime += " ";
  }
  if (minutes > 0) newTime += `${minutes}mins`;

  return newTime;
}

function startSession() {
  const timeBtn = document.getElementById("timeButton");
  timeBtn.innerText = "End session";
  initToasts("Started session", "Session has started. Attendees can now time in.");
  timeBtn.click();
  timeBtn.onclick = endSession;
}

function endSession() {
  const timeBtn = document.getElementById("timeButton");
  timeBtn.innerText = "Start session";
  initToasts("Ended session", "Session has ended. Attendees can no longer time in.");
  timeBtn.click();
  timeBtn.onclick = startSession;
}

function timeIn() {
  console.log("Timed in");
}

// Updates time out and duration of the session timed out
function timeOut() {
  // Get time now
  const now = new Date().toLocaleString();
  let time = now.split(", ")[1];
  time = time.split(":");
  time = `${time[0]}:${time[1]} ${time[2].slice(-2)}`;

  // Update new time out
  const newTimeOut = document.getElementById("timeOut");
  newTimeOut.innerHTML = "";
  newTimeOut.innerText = time;

  // Get time in date
  const timeInDate = document.getElementById("timeInDate").innerText;
  
  // Get time in
  const timeInTime = document.getElementById("timeIn").innerText;
  let start = timeInDate.split(", ");
  const month = MONTHS.indexOf(start[0].split(" ")[0]) + 1;
  const date =  start[0].split(" ")[1];
  const year = start[1];
  start = `${month}/${date}/${year}, ${timeInTime}`;

  // Solve for the difference between time in time and time out time
  let newTime = getDurationFromDates(start, now);

  // Update new duration
  const newDuration = document.getElementById("duration");
  newDuration.innerText = `Duration: ${newTime}`;

  // Enable Time in button
  document.getElementById("timeButton").disabled = false;
}

// Returns the currently selected workplace
function getSelectedWorkplace() {
  return document.querySelector(".active-card h5").innerHTML;
}

// Returns the currently selected month
function getSelectedMonth() {
  let selectedMonth = document.querySelector(".active-card h4").innerText;
  selectedMonth = MONTHS.indexOf(toTitleCase(selectedMonth));

  return selectedMonth;
}

// Get the workspaces and dynamically put to DOM
function getWorkspaces() {
  let container = document.getElementById("workspacesContainer");
  const containerOffcanvas = document.getElementById("workspacesContainerOffcanvas");

  if (window.innerWidth <= SHOWOFFCANVAS_MAXWINDOWSIZEPX) {
    container = containerOffcanvas;
  }
  
  // Ensure container is empty
  container.innerHTML = "";

  workspaces.forEach(workspace => {
    // Create card
    const card = document.createElement("button");
    card.className = "card";
    card.onclick = function() {
      document.querySelector(".sdbr-l-content .active-card").className = "card";
      card.className = "card active-card";
      USER === workspace.owner ? getOwnWorkspace() : getOtherWorkspace();
    } 
    
    // Create card-body
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    
    card.appendChild(cardBody);
    
    // Create title
    const title = document.createElement("h5");
    title.className = "card-title";
    title.innerText = workspace.name;

    // Create subtitle
    const subtitle = document.createElement("p");
    subtitle.className = "card-text text-secondary";
    subtitle.innerText = workspace.when;
    
    cardBody.append(title, subtitle);
    container.appendChild(card);
  });

  container.firstChild.className = "card active-card";
  container.firstChild.click();
}

// Initializes DOM if workspace.owner !== USER
function getOtherWorkspace() {
  const header = document.getElementById("containerHeader");

  // Ensure that the elements are not repeated if function is repeatedly called
  if (header.childElementCount > 1) {
    header.removeChild(header.firstChild);
    header.removeChild(header.firstChild);
  }
  
  // Configure the button whether "Time in" or "End session"
  const timeBtn = document.getElementById("timeButton");
  timeBtn.innerText = "Time in";
  timeBtn.onclick = timeIn;
  
  const container = document.getElementById("midContentWSContainer");
  
  // Clear container by removing all cards
  container.innerHTML = "";

  // Get selected workspace
  const workspace = getSelectedWorkplace();

  if (!workspace) return;

  // Get selected month
  const month = getSelectedMonth();

  // Get the data of selected workspace
  let workspaceData = workspaces.filter(data => {
    return data.name === workspace;
  })[0].data;

  // Filter the data by selected month
  workspaceData = workspaceData.filter(data => {
    return data.month === month;
  });

  workspaceData.forEach(data => {
    // Check if user has data under date
    const hasData = data.time.filter(data => {
      return data.user === USER;
    })[0];
    
    // No data
    if (!hasData) return;
    
    // Create card
    const card = document.createElement("div");
    card.className = "card";
    
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    
    card.appendChild(cardBody);
  
    // Add name to card
    const name = document.createElement("h6");
    name.className = "card-title";
    name.innerText = `${MONTHS[data.month]} ${data.date}, ${new Date().getFullYear()}`;
  
    cardBody.appendChild(name);
  
    // Create row
    const row = document.createElement("div");
    row.className = "row text-secondary";
  
    cardBody.appendChild(row);
  
    // Create column for time in, time out and duration
    const timeInHeader = document.createElement("p");
    timeInHeader.className = "col-12 col-sm-4";
    timeInHeader.innerText = "Time in"
    
    const timeOutHeader = document.createElement("p");
    timeOutHeader.className = "col-12 col-sm-4";
    timeOutHeader.innerText = "Time out"

    const durationHeader = document.createElement("p");
    durationHeader.className = "col-12 col-sm-4";
    durationHeader.innerText = `Duration: ${hasData.duration}`;
  
    row.append(timeInHeader, timeOutHeader, durationHeader);

    // Fill in columns with data
    hasData.time.forEach(data => {
      const timeInOut = data.split(" - ");

      const row = document.createElement("div");
      row.className = "row text-secondary mt-2";

      const timeInData = document.createElement("p");
      timeInData.className = "col-12 col-sm-4";
      timeInData.innerText = timeInOut[0];

      const timeOutData = document.createElement("p");
      timeOutData.className = "col-12 col-sm-4";
      
      // Check if there is an ongoing session that has not been timed out yet
      if (timeInOut[1]) {
        timeOutData.innerText = timeInOut[1];
      } else {
        document.getElementById("timeButton").disabled = true;
        const timeOutBtn = document.createElement("button");
        timeOutBtn.className = "btn btn-text";
        timeOutBtn.innerText = "Time out";
        timeOutBtn.onclick = timeOut;

        // Refs to update once Time out is clicked
        timeOutData.id = "timeOut";
        timeInData.id = "timeIn";
        durationHeader.id = "duration";
        name.id = "timeInDate"

        timeOutData.appendChild(timeOutBtn);
      }
      
      row.append(timeInData, timeOutData);
      cardBody.appendChild(row);
    })
  
    // Append card to DOM
    container.appendChild(card);
  })
}

// Initializes DOM if workspace.owner === USER
function getOwnWorkspace() {
  const header = document.getElementById("containerHeader");

  // Ensure that the elements are not repeated if function is repeatedly called
  if (header.childElementCount > 1) {
    header.removeChild(header.firstChild);
    header.removeChild(header.firstChild);
  }

  // Add Today button that gets all attendees today
  const todayItem = document.createElement("li");
  todayItem.className = "nav-item";

  const todayLink = document.createElement("a");
  todayLink.className = "nav-link active";
  todayLink.onclick = function() {
    document.querySelector("a.active").className = "nav-link";
    todayLink.className = "nav-link active";
    getToday();
  };
  todayLink.innerText = "Today";

  todayItem.appendChild(todayLink);

  // Add All button that gets a log of all attendance in a given month
  const allItem = document.createElement("li");
  allItem.className = "nav-item";

  const allLink = document.createElement("a");
  allLink.className = "nav-link";
  allLink.onclick = function() {
    document.querySelector("a.active").className = "nav-link";
    allLink.className = "nav-link active";
    getAll();
  };
  allLink.innerText = "All";

  allItem.appendChild(allLink);

  // Append the new elements to DOM
  header.insertBefore(allItem, header.firstChild);
  header.insertBefore(todayItem, header.firstChild);
  
  // Configure the button whether "Time in" or "End session"
  const timeBtn = document.getElementById("timeButton");
  timeBtn.innerText = "End session";
  timeBtn.disabled = false;
  timeBtn.onclick = endSession;
  
  getToday();
}

// Fills the DOM with data of attendees today
function getToday() {
  const container = document.getElementById("midContentWSContainer");
  
  // Clear container by removing all cards
  container.innerHTML = "";

  // Fill the container with data
  attendeesToday.forEach (data => {
    // Create card
    const card = document.createElement("div");
    card.className = "card";
    
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    
    card.appendChild(cardBody);
  
    // Add name to card
    const name = document.createElement("h6");
    name.className = "card-title";
    name.innerText = data.name;
  
    cardBody.appendChild(name);
  
    // Create row
    const row = document.createElement("div");
    row.className = "row text-secondary";
  
    cardBody.appendChild(row);
  
    // Create column for time in and time out
    const time = document.createElement("div");
    time.className = "col-12 col-sm-6";
  
    row.appendChild(time);
  
    const timeTitle = document.createElement("p");
    timeTitle.innerText = "Time in - Time out:";
    time.appendChild(timeTitle);
  
    // Fill the column with time data
    data.time.forEach (timeData => {
      const timeP = document.createElement("p");
      timeP.innerText = timeData;
  
      time.appendChild(timeP);
    });
  
    // Create column for duration
    const duration = document.createElement("div");
    duration.className = "col-12 col-sm-6";
  
    row.appendChild(duration);
  
    // Write the duration to column
    const durationData = document.createElement("p");
    durationData.className = "card-text";
    durationData.innerText = `Duration: ${data.duration}`;
  
    duration.appendChild(durationData);
  
    // Append card to DOM
    container.appendChild(card);
  });
}

// Fills the DOM with data of attendance per day of the selected month
function getAll() {
  const container = document.getElementById("midContentWSContainer");
  
  // Clear container by removing all cards
  container.innerHTML = "";

  // Get selected month
  const month = getSelectedMonth();

  // Get selected workspace
  const workspace = getSelectedWorkplace();

  // Get data from dummy data
  // Filter by workspace
  let workspaceData = workspaces.filter(data => {
    return data.name === workspace;
  })[0].data;

  // Filter by month
  workspaceData = workspaceData.filter(data => {
    return data.month === month;
  });

  // Fill container with data
  workspaceData.forEach(monthData => {
    // Create card
    const card = document.createElement("div");
    card.className = "card";
    
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    
    card.appendChild(cardBody);

    // Add name to card
    const name = document.createElement("h6");
    name.className = "card-title";
    name.innerText = `${MONTHS[monthData.month]} ${monthData.date}`;

    cardBody.appendChild(name);

    // Write number of attendees
    const attendeesN = document.createElement("p");
    attendeesN.className = "text-secondary";
    attendeesN.innerText = `Number of attendees: ${monthData.time.length}`;

    cardBody.appendChild(attendeesN);

    // Create table
    const div = document.createElement("div");
    div.className = "text-secondary";

    cardBody.appendChild(div);

    // Create row
    const row = document.createElement("div");
    row.className = "row mt-2 fw-bold";

    div.appendChild(row);

    // Create column for name, time in and time out, and duration
    const nameHeader = document.createElement("p");
    nameHeader.className = "col-12 col-sm-4";
    nameHeader.innerText = "Name";

    const timeHeader = document.createElement("p");
    timeHeader.className = "col-12 col-sm-4";
    timeHeader.innerText = "Time in - Time out";

    const durationHeader = document.createElement("p");
    durationHeader.className = "col-12 col-sm-4";
    durationHeader.innerText = "Duration";

    row.append(nameHeader, timeHeader, durationHeader);

    // Fill columns with data
    monthData.time.forEach (timeData => {
      // Create row
      const row = document.createElement("div");
      row.className = "row py-2 border-top";
  
      div.appendChild(row);

      // Write name
      const name = document.createElement("p");
      name.className = "col-12 col-sm-4";
      name.innerText = timeData.name;

      // Write time
      const time = document.createElement("div");
      time.className = "col-12 col-sm-4";

      timeData.time.forEach (timeN => {
        const timeP = document.createElement("p");
        timeP.innerText = timeN;
        time.appendChild(timeP);
      })

      // Write duration
      const duration = document.createElement("p");
      duration.className = "col-12 col-sm-4";
      duration.innerText = timeData.duration;

      row.append(name, time, duration);
    })

    container.appendChild(card);
  });
}

// Updates UI when clicking month
document.querySelectorAll(".sidebar-right .card").forEach((card) => {
  card.onclick = function() {
    document.querySelector(".sidebar-right .active-card").className = "card";
    card.className = "card active-card";
    
    const inOwnWS = document.querySelector("a.active");
    
    if (inOwnWS) {
      inOwnWS.click();
    } else {
      document.getElementsByClassName("active-card")[0].click();
    }
  }
})

getWorkspaces();

window.addEventListener('resize', function(event) {
  getWorkspaces();
}, true);