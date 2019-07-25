import { Student } from '../student/student.model';
import { Deserializable } from './deserializable.model';

export class Familia implements Deserializable<Familia> {

    estudiantes: Student[];
    DESC_NUM_HIJOS: number;
    NOMB_FAMILIA: string;
    NUM_HIJOS: number;
    id: number;


    deserialize(input: any): Familia {
        Object.assign(this, input);
        return this;
      }
    // estudiantes: Student[];
}
