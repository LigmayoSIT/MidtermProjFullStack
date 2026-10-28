import { Component, signal } from '@angular/core';
import { HoennRegistry } from './hoenn-registry/hoenn-registry';
import { JohtoRegistry } from './johto-registry/johto-registry';
import { KantoRegistry } from './kanto-registry/kanto-registry';

@Component({
  imports: [HoennRegistry, JohtoRegistry, KantoRegistry],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('MidtermProjFullStack');
}
