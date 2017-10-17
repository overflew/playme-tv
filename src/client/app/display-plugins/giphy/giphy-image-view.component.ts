import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { GiphyFunService, IGiphyDisplayState } from "./giphy-fun.service";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/observable/interval';

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

    constructor(
        private _giphyFunService: GiphyFunService
    ) {
        
    }

    ngOnInit(): void {
        this.giphyDisplayState = this._giphyFunService.currentState;

        Observable.interval(this.imageChangeIntervalMs).subscribe(() => {
            this._giphyFunService.moveNextImage();
            this.currentImage = this._giphyFunService.currentImage;
        });
    }
}