export class Tarea{
    public id:number;
    public prioridad: number;
    public descripcion: Text;
    public id_usuario:number;
    
    constructor(id:number, prioridad:number, descripcion:Text, id_usuario:number) {
        this.id=id;
        this.prioridad=prioridad;
        this.descripcion=descripcion;
        this.id_usuario=id_usuario
    };
}