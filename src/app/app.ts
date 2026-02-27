import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppShellComponent } from './shared/ui/app-shell/app-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppShellComponent],
  template: `<app-shell />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}