import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Feeder } from 'src/app/classes/feeder';
import { FeederService } from 'src/app/services/feeder.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-feeder-form',
  templateUrl: './feeder-form.component.html',
  styleUrls: ['./feeder-form.component.css']
})
export class FeederFormComponent {
  feeder : Feeder = new Feeder();
  constructor(private feederService: FeederService, private modalService: ModalService, private http: HttpClient) {}

  fetchAddress() {
    if (this.feeder.address.cep) {
      this.http.get(`https://viacep.com.br/ws/${this.feeder.address.cep}/json/`).subscribe((data: any) => {
        if (data.erro) {
          alert('CEP não encontrado');
        } else {
          this.feeder.address.street = data.logradouro;
          this.feeder.address.neighborhood = data.bairro;
          this.feeder.address.city = data.localidade;
          this.feeder.address.state = data.uf;
        }
      }, () => {
        alert('Erro ao buscar o CEP');
      });
    }
  }

  onSubmit() {
    this.feeder.bowl = 0;
    this.feeder.lastUpdateDate = new Date();
    console.log(this.feeder);
    this.feederService.createFeeder(this.feeder).subscribe(result => {

      this.closeModal();
      window.location.reload();
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
