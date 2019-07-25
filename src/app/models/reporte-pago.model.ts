import { Deserializable } from './deserializable.model';

export class ReportePago implements Deserializable<ReportePago> {
    FORMA_PAGO: string;
    METODO_PAGO: string;
    TOTAL_PAGO: number;
    FECHA_PAGO: string;
    id: number;

    deserialize(input: any): ReportePago {
        Object.assign(this, input);
        return this;
    }
    // estudiantes: Student[];
}
