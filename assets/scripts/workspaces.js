function test() {
  console.log("test");
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
  allLink.onclick = test;
  allLink.innerText = "All";

  allItem.appendChild(allLink);

  // Append the new elements to DOM
  header.insertBefore(allItem, header.firstChild);
  header.insertBefore(todayItem, header.firstChild);
  
  // Configure the button whether "+ Time in" or "End session"
  const timeBtn = document.getElementById("timeButton");
  timeBtn.onclick = endSession;
  timeBtn.innerText = "End session";

  getToday();
}

function getToday() {
  const container = document.getElementById("midContentWSContainer");
  
  // Clear container by removing all cards
  container.innerHTML = "";

  // Fill the container with data
  const dummyToday = [
    {name: "Millie Bobby Brown", time: ["9:12 AM"], duration: "0mins"},
    {name: "Taylor Swift", time: ["9:12 AM"], duration: "0mins"},
    {name: "Gaten Matarazzo", time: ["9:11 AM - 9:54 AM"], duration: "0mins"},
    {name: "Joe Keery", time: ["9:10 AM", "9:00 AM - 9:05 AM"], duration: "0mins"},
  ];

  dummyToday.forEach (data => {
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

function endSession() {
  console.log("Session has ended. Attendees can no longer time in.");
}