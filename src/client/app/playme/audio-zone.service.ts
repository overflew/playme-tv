import { IAudioZone } from './IAudioZone';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

@Injectable()
export class AudioZoneService {
    private zoneKey = 'currentAudioZone';
    private zoneChangedObservable: BehaviorSubject<IAudioZone>;

    private _zones: IAudioZone[] = [
        { name: 'localhost', path: 'http://localhost' },
        // { name: 'Bullnose', path: 'http://music.trademe.local/bullnose' },
        // { name: 'OML L3', path: 'http://music.trademe.local/oml/3' },
        // { name: 'OML L4', path: 'http://music.trademe.local/oml/4' },
        // { name: 'OML L5', path: 'http://music.trademe.local/oml/5' },
        // { name: 'NZX L4', path: 'http://music.trademe.local/nzx/4' },
        // { name: 'Auckland L1', path: 'http://music.trademe.local/sst/1' },
        // { name: 'Auckland L2', path: 'http://music.trademe.local/sst/2' },
        // { name: 'Christchurch', path: 'http://chc-music.trademe.local' }
    ];

    constructor() {
        this.zoneChangedObservable = new BehaviorSubject(this.getCurrentZoneSnapshot());
    }

    getAllZones(): Observable<IAudioZone[]> {
        return Observable.of(this._zones);
    }

    setCurrentZone(zonePath: string) {
        if (zonePath) {
            const zone = this._zones.find(z => z.path === zonePath);
            localStorage.setItem(this.zoneKey, zonePath);
            this.zoneChangedObservable.next(zone);
        }
    }

    getCurrentZone(): Observable<IAudioZone> {
        return this.zoneChangedObservable;
    }

    getCurrentZoneSnapshot(): IAudioZone {
        const zonePath = localStorage.getItem(this.zoneKey);
        const zone = this._zones.find(z => z.path === zonePath) || this._zones[0];
        return zone;
    }
}
