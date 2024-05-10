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
  constructor(private feederService: FeederService, private modalService: ModalService) {}

  onSubmit() {
    console.log(this.feeder);
    this.feeder.bowl = 0;
    this.feeder.lastUpdateDate = new Date();
    this.feederService.createFeeder(this.feeder).subscribe(result => {
      console.log('Feeder adicionado', result);
      this.closeModal();
      window.location.reload();
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
