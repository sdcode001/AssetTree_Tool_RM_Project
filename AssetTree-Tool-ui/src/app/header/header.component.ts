import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input({required: true})companyName:string = 'Company'
  @Output() showConfig = new EventEmitter<boolean>();

  onConfigClick() {
    this.showConfig.emit(true);
  }

}
