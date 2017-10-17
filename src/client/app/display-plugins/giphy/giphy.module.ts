import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { GiphyApiService } from "./giphy-api.service";
import { GiphyImageViewComponent } from "./giphy-image-view.component";
import { GiphyFunService } from './giphy-fun.service';

@NgModule({
    imports: [
        CommonModule
    ],    
    providers: [
        GiphyFunService,
        GiphyApiService
    ],
    declarations: [
        GiphyImageViewComponent
    ],
    exports: [
        GiphyImageViewComponent        
    ]
  })
  export class GiphyModule { }