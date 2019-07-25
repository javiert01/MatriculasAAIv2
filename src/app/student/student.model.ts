import { Categoria } from '../models/categoria.model';
import { Familia } from '../models/familia.model';
import { Grado } from '../models/grado.model';
import { Deserializable } from '../models/deserializable.model';
import { ReporteDescuento } from '../models/reporte-descuento.model';
import { ReportePago } from '../models/reporte-pago.model';

export class Student implements Deserializable<Student> {
    public CODIGO_EST: string;
    public DESC_AYUD_FIN: string;
    public ID_CATE: Categoria;
    public ID_DESCUENTO: string;
    public ID_FAMILIA: Familia;
    public ID_GRADO: Grado;
    public NOMBRE_EST: string;
    public SALDO_PENDIENTE: string;
    public DESC_CREDITOS_MISION: number;
    public ID_PAGO_REPORTE: ReportePago;
    public id: number;
    public ID_DESC_REPORTE: ReporteDescuento;
    public ESTADO: string;
    public ALERTA: boolean;

    deserialize(input: any): Student {
        Object.assign(this, input);
        this.ID_CATE = new Categoria().deserialize(input.ID_CATE);
        Object.assign(this, input);
        this.ID_FAMILIA = new Familia().deserialize(input.ID_FAMILIA);
        Object.assign(this, input);
        this.ID_GRADO = new Grado().deserialize(input.ID_GRADO);
        Object.assign(this, input);
        this.ID_PAGO_REPORTE = new ReportePago().deserialize(input.ID_PAGO_REPORTE);
        Object.assign(this, input);
        this.ID_DESC_REPORTE = new ReporteDescuento().deserialize(input.ID_DESC_REPORTE);
        return this;
    }
}
