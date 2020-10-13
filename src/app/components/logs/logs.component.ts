import { Component, OnInit } from '@angular/core';

import { LogService } from '../../services/log.service';

import { Log } from '../../models/Log';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLog: Log;
  loaded: boolean = false;
  data: any;
  logSum: number;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.stateClear.subscribe(clear => {
      if(clear) {
        this.selectedLog = {id: '', text: '', owed: 0, date: ''};
      }
    });

    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });
  }

  getSum(index: number) {
    let sum = 0;
    for (let i = 0; i < this.logs.length; i++) {
      sum += this.logs[i].owed;
    }
    this.logSum = sum;
    console.log(sum);
  }

  onSelect(log: Log) {
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log) {
    if(confirm('Are you sure?')){
      this.logService.deleteLog(log);
    }
  }

}
