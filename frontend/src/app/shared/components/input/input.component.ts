import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false,
})
export class InputComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input({ required: true }) control!: FormControl;
}
