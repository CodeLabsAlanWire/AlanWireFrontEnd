import { Component, OnInit, inject } from '@angular/core';
import * as moment from 'moment';
import { EventService } from '../shared/services/event.service';

interface CalendarEvent {
  day: moment.Moment;
  name: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  public daysOfWeek: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  public currentDate: moment.Moment = moment();
  public calendarDays: moment.Moment[];
  public showEventForm: boolean = false;
  public selectedDay: moment.Moment;
  public eventName: string;
  public events: CalendarEvent[] = [];

  // Injections
  private eventService = inject(EventService);

  ngOnInit(): void {
    this.generateCalendar();
  }

  // Calendar Functions
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

  // Event Functions

  addEvent(day: moment.Moment) {
    this.selectedDay = day;
    this.showEventForm = true;
    this.eventName = '';
  }

  deleteEvent(day: moment.Moment) {
    this.events = this.events.filter((event) => !event.day.isSame(day, 'day'));
  }

  submitEvent() {
    if (this.eventName) {
      const event: CalendarEvent = {
        day: this.selectedDay,
        name: this.eventName,
      };
      this.events.push(event);
      this.createEvent(
        this.eventName,
        this.selectedDay.date(),
        this.selectedDay.month() + 1,
        this.selectedDay.year()
      );
      this.cancelEvent();
    }
  }

  cancelEvent() {
    this.showEventForm = false;
    this.selectedDay = null;
    this.eventName = '';
  }

  isEventOnDay(day: moment.Moment): boolean {
    return this.events.some((event) => event.day.isSame(day, 'day'));
  }

  getEventNameForDay(day: moment.Moment): string {
    const event = this.events.find((event) => event.day.isSame(day, 'day'));
    return event ? event.name : '';
  }

  createEvent(name: string, day: number, month: number, year: number) {
    const event = { name, day, month, year };
    this.eventService.createEvent(event).subscribe((res) => console.log(res));
  }
}
