import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { GiphyFunService, IGiphyDisplayState } from "./giphy-fun.service";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/observable/interval';
import { SignalRService } from "../../playme/signalr.service";
import { IQueuedTrack } from "../../playme/models/index";

@Component({
    moduleId: module.id,
    selector: 'giphy-image-view',
    templateUrl: 'giphy-image-view.component.html',
    styleUrls: [/*'giphy-image-view.component.css'*/]
})
export class GiphyImageViewComponent implements OnInit {
    
    public giphyDisplayState: Observable<IGiphyDisplayState>;
    
    public currentImage: string;

    private imageChangeIntervalMs = 5000;

    private nowPlaying$: Observable<IQueuedTrack>;

    constructor(
        private _giphyFunService: GiphyFunService,
        private _signalRService: SignalRService
    ) {
        this.nowPlaying$ = this._signalRService.getNowPlaying();
    }

    ngOnInit(): void {
        this.giphyDisplayState = this._giphyFunService.currentState;

        this.nowPlaying$.subscribe(track => {
            this._giphyFunService.updatePlayingTrack(track);

        });

        Observable.interval(this.imageChangeIntervalMs).subscribe(() => {
            this._giphyFunService.moveNextImage();
            this.currentImage = this._giphyFunService.currentImage;
        });
    }
}