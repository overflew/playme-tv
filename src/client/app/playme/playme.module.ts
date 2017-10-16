import { NgModule } from '@angular/core';
import { AudioZoneService } from './audio-zone.service';
import { QueueService } from './queue.service';
import { SignalRService } from './signalr.service';
import { UserInfoService } from './user-info.service';

@NgModule({
    imports: [],
    declarations: [],
    providers: [
        AudioZoneService,
        QueueService,
        SignalRService,
        UserInfoService
    ],
    // exports: [
    //     AudioZoneService,
    //     QueueService,
    //     SignalRService,
    //     UserInfoService
    // ]
  })
  export class PlayMeModule { }
  