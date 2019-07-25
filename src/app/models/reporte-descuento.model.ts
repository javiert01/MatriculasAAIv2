import { Deserializable } from './deserializable.model';

export class ReporteDescuento implements Deserializable<ReporteDescuento> {
    DESC_NUM_HIJOS: number;
    DESC_CATE: number;
    DESC_AYUDA_FIN: number;
    DESC_PREPAGO: number;
    DESC_CREDITOS_MISION: number;
    TOTAL_DESCUENTO: number;
    id: number;

    deserialize(input: any): ReporteDescuento {
        Object.assign(this, input);
        return this;
    }
    // estudiantes: Student[];
}
