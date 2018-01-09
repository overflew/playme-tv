import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';

@Injectable()
export class GiphyApiService {

    private readonly API_BASE = 'https://api.giphy.com';

    private readonly RESULT_LIMIT: number = 50;
    private readonly RATING: string = 'g';

    // TODO: Inject this
    // NOTE: TRY TO NOT COMMIT THIS
    private readonly API_KEY = '';

    constructor(
        private _http: Http
    ) {
        if (!this.API_KEY) {
            throw new Error('Giphy API key is missing');
        }

    }

    public searchGifs(q: string) {
        return this._http.get(`${this.API_BASE}/v1/gifs/search`, {
            params: {
                api_key: this.API_KEY,
                q: q,
                limit: this.RESULT_LIMIT,
                rating: this.RATING
            }
        });
    }

}