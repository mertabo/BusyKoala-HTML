const USER = "ericka";

// Dummy data
const attendeesToday = [
  {name: "Millie Bobby Brown", time: ["9:12 AM"], duration: "0mins"},
  {name: "Taylor Swift", time: ["9:12 AM"], duration: "0mins"},
  {name: "Gaten Matarazzo", time: ["9:11 AM - 9:54 AM"], duration: "0mins"},
  {name: "Joe Keery", time: ["9:10 AM", "9:00 AM - 9:05 AM"], duration: "0mins"},
];

const workspaces = [
  {
    name: "Exist Software Labs, Inc.",
    owner: "exist",
    when: "Mon-Fri",
    data: [
      {
        month: 6,
        date: 3,
        time: [
          {name: "Millie Bobby Brown", time: ["9:05 AM - 10:30 AM"], duration: "1hr 25mins"},
          {name: "Taylor Swift", time: ["9:04 AM - 10:04 AM"], duration: "1hr"},
          {name: "Joe Keery", time: ["10:00 AM - 10:30 AM", "9:02 AM - 9:48 AM"], duration: "1hr 16mins"},
          {name: "Gaten Matarazzo", time: ["8:59 AM - 10:30 AM"], duration: "1hr 31mins"},
        ]
      },
      {
        month: 6,
        date: 2,
        time: [
          {name: "Millie Bobby Brown", time: ["9:05 AM - 10:30 AM"], duration: "1hr 25mins"},
          {name: "Taylor Swift", time: ["9:04 AM - 10:04 AM"], duration: "1hr"},
          {name: "Joe Keery", time: ["9:02 AM - 9:48 AM"], duration: "46mins"},
          {name: "Gaten Matarazzo", time: ["8:59 AM - 10:30 AM"], duration: "1hr 31mins"},
        ]
      },
      {
        month: 5,
        date: 3,
        time: [
          {name: "Millie Bobby Brown", time: ["9:05 AM - 10:30 AM"], duration: "1hr 25mins"},
          {name: "Taylor Swift", time: ["9:04 AM - 10:04 AM"], duration: "1hr"},
          {name: "Joe Keery", time: ["9:02 AM - 9:48 AM"], duration: "46mins"},
          {name: "Gaten Matarazzo", time: ["8:59 AM - 10:30 AM"], duration: "1hr 31mins"},
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
        date: 3,
        time: [
          {name: "Millie Bobby Brown", time: ["9:05 AM - 10:30 AM"], duration: "1hr 25mins"},
          {name: "Taylor Swift", time: ["9:04 AM - 10:04 AM"], duration: "1hr"},
          {name: "Joe Keery", time: ["9:02 AM - 9:48 AM"], duration: "46mins"},
          {name: "Gaten Matarazzo", time: ["8:59 AM - 10:30 AM"], duration: "1hr 31mins"},
        ]
      },
      
    ]
  },
];


function toTitleCase(str) {
  return str.split(' ')
   .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
   .join(' ');
}

// Initialize bootstrap toasts
function initToasts() {
  document.getElementById("timeButton").onclick = function() {
    const toast = document.getElementById("liveToast");
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
  }
}

// Returns the currently selected month
function getSelectedMonth() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let selectedMonth = document.getElementsByClassName("active-card")[0];
  selectedMonth = months.indexOf(toTitleCase(selectedMonth.innerText));

  return selectedMonth;
}

function getWorkspaces() {
  const container = document.getElementById("workspacesContainer");
  
  // Ensure container is empty
  container.innerHTML = "";

  workspaces.forEach(workspace => {
    // Create card
    const card = document.createElement("button");
    card.className = "card";
    card.onclick = USER === workspace.owner ? getOwnWorkspace : getOtherWorkspace;
    
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
  
  getToday();
}

function timeIn() {
  console.log("timed");
}

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
  todayLink.className = "nav-link";
  todayLink.onclick = getToday;
  todayLink.innerText = "Today";

  todayItem.appendChild(todayLink);

  // Add All button that gets a log of all attendance in a given month
  const allItem = document.createElement("li");
  allItem.className = "nav-item";

  const allLink = document.createElement("a");
  allLink.className = "nav-link";
  allLink.onclick = getAll;
  allLink.innerText = "All";

  allItem.appendChild(allLink);

  // Append the new elements to DOM
  header.insertBefore(allItem, header.firstChild);
  header.insertBefore(todayItem, header.firstChild);
  
  // Configure the button whether "+ Time in" or "End session"
  const timeBtn = document.getElementById("timeButton");
  timeBtn.innerText = "End session";
  initToasts();
  
  getToday();
}

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
    time.className = "col-12 col-lg-6";

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
    duration.className = "col-12 col-lg-6";

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

function getAll() {
  const container = document.getElementById("midContentWSContainer");
  
  // Clear container by removing all cards
  container.innerHTML = "";

  // Get selected month
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const options = document.getElementsByClassName("active-card");
  const month = months.indexOf(toTitleCase(options[1].innerText));

  // Get selected workspace
  const workspace = options[0].innerText.split("\n")[0];

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
    name.innerText = `${months[monthData.month]} ${monthData.date}`;

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
    nameHeader.className = "col-12 col-lg-4";
    nameHeader.innerText = "Name";

    const timeHeader = document.createElement("p");
    timeHeader.className = "col-12 col-lg-4";
    timeHeader.innerText = "Time in - Time out";

    const durationHeader = document.createElement("p");
    durationHeader.className = "col-12 col-lg-4";
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
      name.className = "col-12 col-lg-4";
      name.innerText = timeData.name;

      // Write time
      const time = document.createElement("div");
      time.className = "col-12 col-lg-4";

      timeData.time.forEach (timeN => {
        const timeP = document.createElement("p");
        timeP.innerText = timeN;
        time.appendChild(timeP);
      })

      // Write duration
      const duration = document.createElement("p");
      duration.className = "col-12 col-lg-4";
      duration.innerText = timeData.duration;

      row.append(name, time, duration);
    })

    container.appendChild(card);
  });
}


// Updates UI of left sidebar
document.querySelectorAll(".sidebar-left .card").forEach((card) => {
  card.onclick = function() {
    document.querySelector(".sidebar-left .active-card").className = "card";
    card.className = "card active-card";
  }
})

// Updates UI of right sidebar
document.querySelectorAll(".sidebar-right .card").forEach((card) => {
  card.onclick = function() {
    document.querySelector(".sidebar-right .active-card").className = "card";
    card.className = "card active-card";
  }
})

getWorkspaces();