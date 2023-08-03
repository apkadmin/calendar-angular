import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit{
  

  WEEKDAYS = [" ","Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun","Mon", "Tue"];
  TODAY = moment().format("YYYY-MM-DD");
  INITIAL_YEAR: number = 2023;
  async ngOnInit() {
    for(var i = 1; i<12; i++){
      await this.createCalendar(this.INITIAL_YEAR,i);
    }
// this.initMonthSelectors();
  }


  
  async createCalendar(year: number, month : number)  {
  const calendarDaysElement = document.getElementById("calendar-days");

  // this.removeAllDayElements(calendarDaysElement);

  let currentMonthDays = await this.createDaysForCurrentMonth(
    year,
    month
  );

  let previousMonthDays = this.createDaysForPreviousMonth(year, month, currentMonthDays);
  // this.nextMonthDays = this.createDaysForNextMonth(year, month);

  var days = await [{date: "data ",
  dayOfMonth: moment(`${year}-${month}-1`).format('MMMM'),
  isCurrentMonth: true
},...previousMonthDays, ...currentMonthDays];
let extendDay: any[] = [];
    for(let index = 0; index < 38 - days.length; index++){
    let temp = {date: "data ",
      dayOfMonth: index + 1,
      isCurrentMonth: false
    }
    extendDay.push(temp);
    }
  days = [...days,...extendDay];
  console.log(days.length);
  days.forEach((day) => {
    this.appendDay(day, calendarDaysElement);
  });
}

removeAllDayElements(calendarDaysElement: any) {
  let first = calendarDaysElement.firstElementChild;

  while (first) {
    first.remove();
    first = calendarDaysElement.firstElementChild;
  }
}

getNumberOfDaysInMonth(year: any, month: any) {
  return moment(`${year}-${month}`).daysInMonth();
}




createDaysForCurrentMonth(year: any, month: any) {
  return [...Array(this.getNumberOfDaysInMonth(year, month))].map((day, index) => {
    return {
      date: moment(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: true
    };
  });
}

createDaysForPreviousMonth(year:any, month:any, currentMonthDays: any[]) {
  const firstDayOfTheMonthWeekday = this.getWeekday(currentMonthDays[0].date);
  const previousMonth = moment(`${year}-${month}-01`).subtract(1, "month");
  // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
    ? firstDayOfTheMonthWeekday - 1
    : 6;

  const previousMonthLastMondayDayOfMonth = moment(currentMonthDays[0].date)
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();

  return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
    return {
      date: moment(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${
          previousMonthLastMondayDayOfMonth + index
        }`
      ).format("YYYY-MM-DD"),
      dayOfMonth: previousMonthLastMondayDayOfMonth + index,
      isCurrentMonth: false
    };
  });
}

// createDaysForNextMonth(year:any, month:any, currentMonthDays: any[]) {
//   const lastDayOfTheMonthWeekday = this.getWeekday(
//     `${year}-${month}-${currentMonthDays.length}`
//   );

//   const nextMonth = moment(`${year}-${month}-01`).add(1, "month");

//   const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
//     ? 7 - lastDayOfTheMonthWeekday
//     : lastDayOfTheMonthWeekday;
//     console.log(visibleNumberOfDaysFromNextMonth);

//   return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
//     return {
//       date: moment(
//         `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
//       ).format("YYYY-MM-DD"),
//       dayOfMonth: index + 1,
//       isCurrentMonth: false
//     };
//   });
// }

getWeekday(date:any) {
  return moment(date).weekday();
}


appendDay(day:any, calendarDaysElement:any) {
  const dayElement = document.createElement("li");
  const dayElementClassList = dayElement.classList;
  dayElementClassList.add("calendar-day");
  const dayOfMonthElement = document.createElement("span");
  if (day.isCurrentMonth) {
  dayOfMonthElement.innerText = day.dayOfMonth;
  } else {
      dayOfMonthElement.innerText = "";
  }
  dayElement.appendChild(dayOfMonthElement);
  calendarDaysElement.appendChild(dayElement);

  if (!day.isCurrentMonth) {
    dayElementClassList.add("calendar-day--not-current");
  }

  if (day.date === this.TODAY) {
    dayElementClassList.add("calendar-day--today");
  }
}
}