import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { TurnoPipe } from './turno.pipe';



@NgModule({
  imports: [ ],
  declarations: [
    ImagenPipe,
    TurnoPipe
  ],
  exports: [
    ImagenPipe,
    TurnoPipe
  ]
})
export class PipesModule { }
