import { Student } from '../student/student.model';
import { Deserializable } from './deserializable.model';

export class Categoria implements Deserializable<Categoria> {
    DESC_CATE: number;
    TIPO_CATE: string;
    id: number;

    deserialize(input: any): Categoria {
        Object.assign(this, input);
        return this;
    }
    // estudiantes: Student[];
}
