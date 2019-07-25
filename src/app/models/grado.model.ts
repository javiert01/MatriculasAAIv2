import { Deserializable } from './deserializable.model';

export class Grado implements Deserializable<Grado> {
    COSTO_MATRICULA: number;
    COSTO_PENSION: number;
    TIPO_GRADO: string;
    id: number;

    deserialize(input: any): Grado {
        Object.assign(this, input);
        return this;
      }
}
