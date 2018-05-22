import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  formDadosPessoais: FormGroup

  constructor(public fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
    this.formDadosPessoais = fb.group({
      nome: [null,[Validators.required]],
      endereco: [null,[Validators.required]],
      telefone: [null,[Validators.required, Validators.minLength(8)]],
      email: [null,[Validators.required]],
      senha: [null,[Validators.required]],

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  enviarDados(){
    console.log(this.formDadosPessoais.value)
  }

}
