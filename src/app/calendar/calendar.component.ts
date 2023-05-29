import { Component } from '@angular/core';
import * as moment from 'moment';

interface CalendarEvent {
  day: moment.Moment;
  name: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  currentDate: moment.Moment;
  calendarDays: moment.Moment[];
  showEventForm: boolean = false;
  selectedDay: moment.Moment;
  eventName: string;
  events: CalendarEvent[] = [];

  constructor() {
    this.currentDate = moment();
    this.generateCalendar();
  }

  generateCalendar() {
    const startDate = moment(this.currentDate).startOf('month').startOf('week');
    const endDate = moment(this.currentDate).endOf('month').endOf('week');
    const diff = endDate.diff(startDate, 'days');
    this.calendarDays = Array.from({ length: diff + 1 }, (_, index) =>
      moment(startDate).add(index, 'days')
    );
  }

  previousMonth() {
    this.currentDate.subtract(1, 'month');
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.add(1, 'month');
    this.generateCalendar();
  }

  addEvent(day: moment.Moment) {
    this.selectedDay = day;
    this.showEventForm = true;
    this.eventName = '';
  }

  deleteEvent(day: moment.Moment) {
    this.events = this.events.filter(event => !event.day.isSame(day, 'day'));
  }


  submitEvent() {
    if (this.eventName) {
      const event: CalendarEvent = {
        day: this.selectedDay,
        name: this.eventName
      };
      this.events.push(event);
      this.cancelEvent();
    }
  }

  cancelEvent() {
    this.showEventForm = false;
    this.selectedDay = null;
    this.eventName = '';
  }

  isEventOnDay(day: moment.Moment): boolean {
    return this.events.some(event => event.day.isSame(day, 'day'));
  }

  getEventNameForDay(day: moment.Moment): string {
    const event = this.events.find(event => event.day.isSame(day, 'day'));
    return event ? event.name : '';
  }
}
