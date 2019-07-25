import { NgModule } from '@angular/core';
import { SelectedDirective } from './selected.directive';
import { CommonModule } from '@angular/common';
import { TipoGradoPipe } from '../pipes/tipogrado.pipe';

@NgModule({
    declarations: [
        SelectedDirective,
        TipoGradoPipe
    ],
    exports: [
        CommonModule,
        SelectedDirective,
        TipoGradoPipe
    ]
})
export class SharedModule {}
