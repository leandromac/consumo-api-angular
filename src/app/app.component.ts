import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'deliveryapp';
  formUsuario = null;
  usuarios = null;

  constructor(public formBuilder:FormBuilder, public http:HttpClient) {

    this.formUsuario = this.formBuilder.group({
      id: [''],
      avatar: [''],
      first_name: ['',[Validators.required,Validators.minLength(3)]],
      last_name: [''],
      email: [''],
    });

    this.listar();

  }

  salvar() {
    this.http.put("https://reqres.in/api/users/"+this.formUsuario.get("id").value,this.formUsuario.value).subscribe(data=>{
    this.listar();
    })
  }

  selecionar(usuario) {
    console.log(usuario);
    this.formUsuario.get("id").setValue(usuario.id);
    this.formUsuario.get("avatar").setValue(usuario.avatar);
    this.formUsuario.get("first_name").setValue(usuario.first_name);
    this.formUsuario.get("last_name").setValue(usuario.last_name);
    this.formUsuario.get("email").setValue(usuario.email);
  }

  listar() {
    this.http.get("https://reqres.in/api/users?page=2").subscribe(data=>{
    let retorno:any=data;
    this.usuarios=retorno.data;
    })
  }

}
