$(document).ready(function() {
  var clock = $('.your-clock').FlipClock({
    autostart: false,
    clockFace: 'DailyCounter',
    showSeconds: false,
    countdown: true
  });
  clock.setTime(getNextCakeDay());
  clock.start();

  function getNextCakeDay() {
    // Cake day is on the third Wednesday of the month
    var now = new Date();
    var firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    var firstDayOfNextMonth = new Date();
    firstDayOfNextMonth.setDate(1);
    firstDayOfNextMonth.setMonth(firstDayOfNextMonth.getMonth() + 1);

    var cakeDayOfMonth = getCakeDayOfMonth(firstDayOfMonth);
    var cakeDayOfNextMonth = getCakeDayOfMonth(firstDayOfNextMonth);
    var nextCakeDay;
    if(now > cakeDayOfMonth) {
      nextCakeDay = cakeDayOfNextMonth;
    }
    else {
      nextCakeDay = cakeDayOfMonth;
    }

    var cakeDayIsToday = (now.getDate() == cakeDayOfMonth.getDate()
        && now.getMonth() == cakeDayOfMonth.getMonth());

    if(cakeDayIsToday) {
      console.log("Today is cake day! :)");
      $('h1').html("Today is Cake Day!");
    }
    else {
      console.log("Today is not cake day. :(");
    }

    console.log("Now:", now);
    console.log("Cake Day Of Month:", cakeDayOfMonth);
    console.log("Cake Day Next month:", cakeDayOfNextMonth);
    console.log("Next Cake Day", nextCakeDay);

    return (nextCakeDay.getTime() - now.getTime()) / 1000;
  };

  function getCakeDayOfMonth(firstDayOfMonthCopy) {
    var firstDayOfMonth = new Date(firstDayOfMonthCopy.getTime());
    var firstWednesdayOfMonth = getWednesday(firstDayOfMonth);
    var monthDayOfFirstWednesday = firstWednesdayOfMonth.getDate();
    var thirdWednesdayOfMonth = new Date(firstWednesdayOfMonth.getTime());
    thirdWednesdayOfMonth.setDate(monthDayOfFirstWednesday + 14);
    thirdWednesdayOfMonth.setHours(15);
    thirdWednesdayOfMonth.setMinutes(30);
    thirdWednesdayOfMonth.setSeconds(0);
    return thirdWednesdayOfMonth;
  };

  function getWednesday(dayCopy) {
    var day = new Date(dayCopy.getTime());
    var dayOfWeek = day.getDay();
    var dayOfMonth = day.getDate();
    // 0 - Sunday
    // 1 - Monday
    // 2 - Tuesday
    // 3 - Wednesday
    // 4 - Thursday
    // 5 - Friday
    // 6 - Saturday
    // 7 - Sunday
    // 8 - Monday
    // 9 - Tuesday
    // 10 - Wednesday
    if(dayOfWeek < 3) {
      day.setDate(dayOfMonth + (3 - dayOfWeek));
    }
    else if(dayOfWeek > 3) {
      day.setDate(dayOfMonth + (10 - dayOfWeek));
    }
    return day;
  };

});
