function getTimeDifference(startTime, endTime) {
  // Split the time strings into [hours, minutes, seconds]
  const [startH, startM, startS] = startTime.split(":").map(Number);
  const [endH, endM, endS] = endTime.split(":").map(Number);

  // Convert both times to total seconds
  const startTotalSeconds = startH * 3600 + startM * 60 + startS;
  const endTotalSeconds = endH * 3600 + endM * 60 + endS;

  // Calculate difference in seconds
  let diffSeconds = endTotalSeconds - startTotalSeconds;

  // If difference is negative, assume endTime is on next day
  if (diffSeconds < 0) {
    diffSeconds += 24 * 3600;
  }

  // Convert difference back to hours and minutes
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);

  return `${hours}H ${minutes}M`;
}
let t=null
// Examples:
console.log(getTimeDifference("09:30:00", "12:45:00")); // "3H 15M"
console.log(getTimeDifference("23:00:00", "01:30:00")); // "2H 30M"

let list = document.getElementById("main");
function search(){
     list.innerHTML=""
let data = document.getElementById("search").value;
console.log(data)
function checkDataType(data) {
  const converted = Number(data); // try c

  if (!isNaN(converted)) {
    fetch(`http://localhost:8080/train/id/${data}`,
    {
        method:"GET"
    }
).then(res=>res.json())
.then(element=>{
    t = getTimeDifference(element.departure,element.arrival);

        list.innerHTML+=
        `  <div class="train-card">
    <div class="train-header">
      <div>
        <h3>${element.trainNum} ${element.trainName}</h3>
        <div class="train-time">
          <span class="time">${element.departure}</span>
          <span class="station">${element.fromStation}</span>
          <span class="duration">→ ${t} →</span>
          <span class="time">${element.arrival} </span>
          <span class="station" => ${element.toStation}</span>
        </div>
      </div>

      <div class="right-info">
        <span class="rating">★ 4.4</span>
        <a href="#" class="schedule">Schedule</a>
      </div>
    </div>
  </div>`

  }) .catch(err => console.error(err))
  } else {
    fetch(`http://localhost:8080/train/${data}`,
    {
        method:"GET"
    }
).then(res=>res.json())
.then(data=>{
    data.forEach(element => {

        list.innerHTML+=
        `  <div class="train-card">
    <div class="train-header">
      <div>
        <h3>${element.trainNum} ${element.trainName}</h3>
        <div class="train-time">
          <span class="time">${element.departure}</span>
          <span class="station">${element.fromStation}</span>
          <span class="duration">→ 4h 17m →</span>
          <span class="time">${element.arrival} </span>
          <span class="station" => ${element.toStation}</span>
        </div>
      </div>

      <div class="right-info">
        <span class="rating">★ 4.4</span>
        <a href="#" class="schedule">Schedule</a>
      </div>
    </div>
  </div>`
    });
}
) .catch(err => console.error(err))
  }
}

checkDataType(data)
}