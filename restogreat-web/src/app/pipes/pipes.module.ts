import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { TurnoPipe } from './turno.pipe';
import { EsatusPlatilloPipe } from './estatusplatillo.pipe';

@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    TurnoPipe, 
    EsatusPlatilloPipe
  ],
  exports: [
    ImagenPipe,
    TurnoPipe, 
    EsatusPlatilloPipe
  ]
})
export class PipesModule { }
