import { PipeTransform } from '@angular/core';
import { StudentService } from '../student/student.service';
import { Pipe } from '@angular/core';

@Pipe({
    name: 'tipoGrado'
})

export class TipoGradoPipe implements PipeTransform {

    // grados: Grado[];
    tipoGrados: string[] = [
    'PS3',
    'PS4',
    'K',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12'
    ];

    constructor(private stdService: StudentService) {
        /*this.stdService.getTiposGrado()
        .subscribe(
            (gradosAux: Grado[]) => {
                this.grados = gradosAux;
            },
            (error) => console.log(error)
        );*/
    }


    transform(value: string) {
        if (value === '16') {
            return '';
        } else {
            return this.tipoGrados[(+value) - 1];
        }
    }

}
