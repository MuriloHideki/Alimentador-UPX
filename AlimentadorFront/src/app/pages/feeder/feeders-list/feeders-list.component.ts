import { Feeder } from 'src/app/classes/feeder';
import { FeederService } from './../../../services/feeder.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../../aux/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-feeders-list',
  templateUrl: './feeders-list.component.html',
  styleUrls: ['./feeders-list.component.css']
})
export class FeedersListComponent implements OnInit {
  feeders: Feeder[] = [];
  currentFeederId: string | undefined;
  @ViewChild('confirmDialog') confirmDialog!: ConfirmationDialogComponent;

  constructor(private feederService: FeederService, private router: Router) { }

  ngOnInit(): void {
    this.feederService.getAllFeeders().subscribe(response =>{
      this.feeders = response.data.feeders;
    })
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
}
