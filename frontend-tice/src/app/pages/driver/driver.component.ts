import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConductorService } from 'src/app/services/conductor.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  id:number;
  driver:any={
    nombres:'',
    apellidos:'',
    ci:0,
    expedicion:'',
    codigo:''
  };
  //id_vehiculo:number;

  constructor(
    private activatedRoute:ActivatedRoute,
    private _driver:ConductorService
  ) 
  {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id != 0){
      this.loadDriver();
    }
  }

  //methods

  reload(){
    this.loadDriver();
  }

  asignaId(value:number){
    this.id = value;
    this.loadDriver();
  }

  loadDriver(){
    this._driver.getConductorById(this.id).subscribe((res:any)=>{
      console.log(res);
      this.driver = res;
      // if(!!this.driver.vehiculos){
      //   console.log(this.driver.vehiculos);
      //   this.id_vehiculo = this.driver.vehiculos[0].id;
      // } 
    })
  }

}
