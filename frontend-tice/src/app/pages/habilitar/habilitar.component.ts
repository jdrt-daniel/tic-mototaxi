import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';



import swal from 'sweetalert';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-habilitar',
  templateUrl: './habilitar.component.html',
  styleUrls: ['./habilitar.component.css']
})
export class HabilitarComponent implements OnInit {

  displayedColumns: string[] = ['#', 'nombres', 'apellidos', 'username', 'grado', 'estado', 'rol', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  usuarios:any=[];
  roles:any = [
    {value:'administrador', label:"Administrador"},
    {value:'usuario', label:"Usuario"}
  ]

  constructor(
    private _usuario:UsuarioService,
    private _auth:AuthService
    ) { 
      this.dataSource = new MatTableDataSource(this.usuarios);
      this.loadUsuarios();
  }

  ngOnInit(): void {
  }

  loadUsuarios(){
    this._usuario.getUsers().subscribe((res)=>{
      this.usuarios = res;
      //console.log(this.usuarios);
      this.dataSource = new MatTableDataSource(this.usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  reloadList(){
    this.loadUsuarios();
  }

  eliminar(id:any, id_user:any){
    //alert("eliminar"+value);
    swal({
      title: "Importante",
      text:"¿Esta seguro que desea eliminar el registro?",
      icon: "info",
      buttons: ['NO', 'SI'],
      dangerMode: true,
    }).then((respuesta:boolean)=>{
      if(respuesta){
        this._usuario.deleteUser(id).subscribe(()=>{
            this._usuario.deleteUserPrincipal(id_user).subscribe(()=>{
              swal('Información', 'Se eliminó al usuario de manera exitosa', 'success').then(()=>{
                this.loadUsuarios();
            })
          })
        })
      }
    })
  }

  changeRole(id:number, event:any){
    this.update(id, {rol:event.target.value});
  }

  update(id:number, data:any){
    this._usuario.updateUserData(id, data).subscribe(res =>{
      console.log('se modificó el usuario');
    })
  }

  changeState(id:number, event:any){
    this.update(id, {state:event.checked});
  }

  newUser(){
    console.log('formulario de creación')
  }

}

