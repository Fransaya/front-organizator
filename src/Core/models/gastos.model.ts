
export class Gastos {
    public id:number;
    public categoria:string;
    public descripcion:string;
    public monto: number;
    public fecha_gasto: Date;
    public id_usuario:number;

    constructor(id:number, categoria: string, descripcion:string, monto:number,fecha_gasto:Date,id_usuario:number){
        this.id=id;
        this.categoria=categoria;
        this.descripcion=descripcion;
        this.monto=monto;
        this.fecha_gasto=fecha_gasto;
        this.id_usuario=id_usuario
    };
}