import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { PlayMeModule } from '../playme/playme.module';
import { GiphyModule } from '../display-plugins/giphy/giphy.module';

@NgModule({
  imports: [
    HomeRoutingModule, 
    SharedModule,
    PlayMeModule,
    GiphyModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [NameListService]
})
export class HomeModule { }
