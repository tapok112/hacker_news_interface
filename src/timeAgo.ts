export function time2TimeAgo(ts) {
  var d=new Date();  // Gets the current time
  var nowTs = Math.floor(d.getTime()/1000); // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000
  var seconds = nowTs-ts;

  // more that two days
  if (seconds > 2*24*3600) {
     return "несколько дней назад";
  }
  // a day
  if (seconds > 24*3600) {
     return "вчера";
  }

  if (seconds > 3600) {
     return "несколько часов назад";
  }
  if (seconds > 1800) {
     return "полчаса назад";
  }
  if (seconds > 60) {
     return Math.floor(seconds/60) + " минут назад";
  }
}