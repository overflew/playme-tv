import { Injectable, ChangeDetectorRef, ApplicationRef } from "@angular/core";
import { GiphyApiService } from "./giphy-api.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs";
import { SignalRService } from "../../playme/signalr.service";
import { IQueuedTrack } from "../../playme/models/index";

@Injectable()
export class GiphyFunService {

    // private readonly _currentState: BehaviorSubject<IGiphyDisplayState>;

    public currentImage: string;

    private _imageIndex = 0;
    private _searchResults: any;

    // public currentlyPlaying$: Observable<IQueuedTrack>;

    constructor(
        private _giphyApiService: GiphyApiService,
        private _applicationRef: ApplicationRef,
        private _signalRService: SignalRService
    ) {
        // TODO: Why does this give a stupid runtime error?
        // this._currentState = new BehaviorSubject<IGiphyDisplayState>({
        //     isLoading: true,
        //     currentImage: ''
        // });

        this.currentImage = '';

        // this.currentlyPlaying$ = this._signalRService.getNowPlaying();
    }

    public get currentState(): Observable<IGiphyDisplayState> {
        // return this._currentState.asObservable();
        //this._applicationRef.
        return null;
    }

    public updatePlayingTrack(track: IQueuedTrack) {
        // Search by track name:
        // this._giphyApiService.searchGifs(track.Track.Name).subscribe(result => {
        //     this._searchResults = result.json();
        // });

        // Search by artist:
        this._giphyApiService.searchGifs(track.Track.Artists[0].Name).subscribe(result => {
            this._searchResults = result.json();
        });
    }


    private resetImages () {
        this.setImageIndex(0);
    }

    private setImageIndex(i: number) {
        this._imageIndex = i;
        let image = this._searchResults.data[this._imageIndex];
        this.currentImage = image.images.original;
    }
    
    public moveNextImage (): void {
        let newIndex = this._imageIndex + 1;
        if (this._imageIndex >= this._searchResults.data.length - 1) {
            newIndex = 0;            
        }
        this.setImageIndex(newIndex);
    }

}

export interface IGiphyDisplayState {
    isLoading: boolean;
    currentImage: string;
}