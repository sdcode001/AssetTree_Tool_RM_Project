import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { DestroyRef} from "@angular/core";
import { AssetService } from '../asset.service';



@Component({
  selector: 'app-data-pusher-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './data-pusher-view.component.html',
  styleUrl: './data-pusher-view.component.css'
})
export class DataPusherViewComponent {

  @ViewChild('form') private form?:ElementRef<HTMLFormElement>;

  tagId?:number;
  value?:number;

  isButtonLoading = false;

  constructor(private destroyRef: DestroyRef, private assetService: AssetService){ }

  handelDataPush() {
     if(!this.isButtonLoading && this.tagId!=undefined && this.tagId!=null && this.value!=null && this.value!=undefined){
        this.isButtonLoading = true;

        const subscription = this.assetService.SetTagValue(this.tagId, this.value)
        .subscribe({
          next: (resData) => {
             this.isButtonLoading = false;
             console.log(resData);
             this.form?.nativeElement.reset();
             alert(resData.message);
          },
          error: (err) => {
            this.isButtonLoading = false;
            console.log(err);
          }
        })

        this.destroyRef.onDestroy(() => {
          subscription.unsubscribe();
        })
     }
  }




}
