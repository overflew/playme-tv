import { Injectable, ChangeDetectorRef, ApplicationRef } from "@angular/core";
import { GiphyApiService } from "./giphy-api.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SignalRService } from "../../playme/signalr.service";
import { IQueuedTrack } from "../../playme/models/index";

@Injectable()
export class GiphyFunService {

    // private readonly _currentState: BehaviorSubject<IGiphyDisplayState>;

    public currentImage: string;

    // private _imageIndex = 0;
    private _searchResults: any = [];

    private isLoading$ = new BehaviorSubject(false);

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
        this._resetResults();

        this._searchFor(track.Track.Name);
        track.Track.Artists.forEach(artist => {
            this._searchFor(artist.Name);            
        });
    }
    
    private _resetResults () {
        this.isLoading$.next(true);
        this._searchResults = [];
    }

    private _searchFor(searchTerm: string) {
        this._giphyApiService.searchGifs(searchTerm).subscribe(result => {
            this.addGiphyResults(result.json(), searchTerm);
        });
    }

    private addGiphyResults(results: any, searchTerm: string) {
        if (!results.data.length) {
            // TODO: Do something smarter with empty result sets (to avoid hanging on a loading screen...)
            return;
        }
        this._searchResults.push(new GiphyResults(results, searchTerm));
        this.isLoading$.next(false);
    }

    // private resetImages () {
    //     this.setImageIndex(0);
    // }
    
    public moveNextImage (): void {
        if (!this._searchResults.length) {
            return;
        }

        let resultIndexToUse = Math.floor(Math.random() * this._searchResults.length)

        this.useNextImageFrom(this._searchResults[resultIndexToUse]);
    }

    public useNextImageFrom (resultSet: GiphyResults): void {
        let newIndex = resultSet.currentIndex + 1;
        if (resultSet.currentIndex >= resultSet.results.data.length - 1) {
            newIndex = 0;            
        }
        resultSet.currentIndex = newIndex;
        
        this.setCurrentImage(resultSet);
    }

    private setCurrentImage(resultSet: GiphyResults) {
        let image = resultSet.results.data[resultSet.currentIndex];
        this.currentImage = image.images.original;
    }

}

export interface IGiphyDisplayState {
    isLoading: boolean;
    currentImage: string;
}

export class GiphyResults {
    public currentIndex = 0;

    constructor(
        public results: any,
        public searchTerm: string
    ) { 
        
    }
}