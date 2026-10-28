import { ChangeDetectionStrategy, inject, computed, signal, OnInit, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pokemon } from '../pokemon';

@Component({
  imports: [ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hoenn-registry',
  styleUrl: './hoenn-registry.css',
  templateUrl: './hoenn-registry.html',
})
export class HoennRegistry implements OnInit {
  private formBuilder = inject(FormBuilder);
  pokemonRegistry = inject(Pokemon);
  editingId = signal<string | null>(null);

  hoennLeaders = computed(() =>
    this.pokemonRegistry.pokemonGymLeader().filter((l) => l.region === 'Hoenn'),
  );

  pokemonHoennRegistry = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    region: ['Hoenn', Validators.required],
    town: ['', Validators.required],
    badge: ['', Validators.required],
    specialty: ['', Validators.required],
    aceLevel: [1, [Validators.required, Validators.min(1)]],
    motto: ['', Validators.required],
  });

  ngOnInit() {
    this.pokemonRegistry.fetchGymLeader();
  }

  startEdit(leader: any) {
    this.editingId.set(leader._id);
    this.pokemonHoennRegistry.patchValue({
      name: leader.name,
      region: leader.region,
      town: leader.town,
      badge: leader.badge,
      specialty: leader.specialty,
      aceLevel: leader.aceLevel,
      motto: leader.motto,
    });
  }

  cancelEdit() {
    this.editingId.set(null);
    this.pokemonHoennRegistry.reset();
  }

  deletePokeLeader(id: string) {
    if (!confirm('Are you sure to delete this Gym Leader?')) return;

    this.pokemonRegistry.deleteGymLeader(id).subscribe({
      next: () => this.pokemonRegistry.fetchGymLeader(),
      error: (err: unknown) => console.error('Error: Delete Failed.', err),
    });
  }

  onSubmit() {
    if (this.pokemonHoennRegistry.invalid) return;
    const data = this.pokemonHoennRegistry.getRawValue();
    const id = this.editingId();

    if (id) {
      this.pokemonRegistry.updateGymLeader(id, data).subscribe({
        next: () => {
          this.pokemonRegistry.fetchGymLeader();
          this.cancelEdit();
        },
        error: (err: unknown) => console.error('Error: Update Failed.', err),
      });
    } else {
      this.pokemonRegistry.saveGymLeader(data).subscribe({
        next: () => {
          this.pokemonRegistry.fetchGymLeader();
          this.pokemonHoennRegistry.reset();
        },
        error: (err: unknown) => console.error('Error: Save Failed.', err),
      });
    }
  }
}