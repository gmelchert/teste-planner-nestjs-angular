import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: false,
})
export class SelectComponent<T = any> {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) control!: FormControl;
  @Input() options: T[] = [];
  @Input() optionLabel: keyof T = 'name' as keyof T;
  @Input() optionValue: keyof T = 'id' as keyof T;

  getOptions() {
    return this.options.map(option => ({
      value: option[this.optionValue],
      label: option[this.optionLabel],
    }));
  }
}
