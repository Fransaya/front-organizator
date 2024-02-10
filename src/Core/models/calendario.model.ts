export class Calendario{
    public id:number;
    public fecha_creacion: Date;
    public titulo: string; 
    public descripcion: string;
    public id_usuario: number;

    constructor(id:number, fecha_creacion:Date, titulo: string, descripcion:string, id_usuario:number){
        this.id=id;
        this.fecha_creacion=fecha_creacion;
        this.titulo=titulo;
        this.descripcion=descripcion
        this.id_usuario=id_usuario
    }
}