import { Injectable, ChangeDetectorRef, ApplicationRef } from "@angular/core";
import { GiphyApiService } from "./giphy-api.service";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class GiphyFunService {

    // private readonly _currentState: BehaviorSubject<IGiphyDisplayState>;

    public currentImage: string;

    private _imageIndex = 0;
    private _searchResults: any;

    constructor(
        private _giphyApiService: GiphyApiService,
        private _applicationRef: ApplicationRef
    ) {
        // TODO: Why does this give a stupid runtime error?
        // this._currentState = new BehaviorSubject<IGiphyDisplayState>({
        //     isLoading: true,
        //     currentImage: ''
        // });

        this.currentImage = '';

        this._giphyApiService.searchGifs('I\'d Rather Go Blind').subscribe(result => {
            this._searchResults = result.json();

        });
    }

    public get currentState(): Observable<IGiphyDisplayState> {
        // return this._currentState.asObservable();
        //this._applicationRef.
        return null;
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