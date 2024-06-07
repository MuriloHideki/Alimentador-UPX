import { FeederResponse } from './../../../classes/feeder-response';
import { Feeder } from 'src/app/classes/feeder';
import { FeederService } from './../../../services/feeder.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../aux/confirmation-dialog/confirmation-dialog.component';
import { ModalService } from 'src/app/services/modal.service';
import { Subscription } from 'rxjs';
import { FeederData } from 'src/app/classes/feeder-data';

@Component({
  selector: 'app-feeders-list',
  templateUrl: './feeders-list.component.html',
  styleUrls: ['./feeders-list.component.css']
})
export class FeedersListComponent implements OnInit {
  constructor(
    private feederService: FeederService,
    private router: Router,
    private modalService: ModalService
  ) { }
  @ViewChild('confirmDialog') confirmDialog!: ConfirmationDialogComponent;

  cities: string[] = [];
  neighborhoods: string[] = [];
  selectedCity: string | null = null;
  selectedNeighborhood: string | null = null;
  feeders: Feeder[] = [];
  currentFeederId: string | undefined;

    ngOnInit(): void {
      this.feederService.getAllFeeders().subscribe(response =>{
        this.feeders = response.data.feeders;
      });
      this.feederService.getCities().subscribe(cities => {
        this.cities = cities;
      });
  }

  onCitySelect(city: string): void {
    this.selectedCity = city;

    this.feederService.getNeighborhoodsByCity(city).subscribe(neighborhoods => {
      this.neighborhoods = neighborhoods;
    });
  }

  onNeighborhoodSelect(neighborhood: string): void {
    this.selectedNeighborhood = neighborhood;
    if(this.selectedCity){
      this.feederService.getFeedersByCityAndNeighborhood(this.selectedCity, this.selectedNeighborhood).subscribe({
        next: feeders => this.feeders = feeders,
        error: error => console.error('Failed to fetch feeders:', error)
      });
    }
  }

  detail(id:string){
    this.router.navigate(['/feeder', id]);
  }

  openDeleteConfirm(id: string) {
    this.currentFeederId = id;  // Armazenar o ID para usar depois na confirmação
    this.confirmDialog.open();
  }

  handleDeleteConfirmation(confirmed: boolean) {
    if (confirmed && this.currentFeederId) {
      this.delete(this.currentFeederId);
    }
  }

  delete(id:string){
    this.feederService.deleteFeeder(id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.log('Error deleting feeder:', err);
      }
    });
  }

  isOpen = false;
  isOpenSubscription: Subscription = this.modalService.isOpen.subscribe(state => {
    this.isOpen = state;
  });
  openModal() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
