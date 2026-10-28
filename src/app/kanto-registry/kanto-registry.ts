import { ChangeDetectionStrategy, inject, signal, computed, OnInit, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pokemon } from '../pokemon';

@Component({
  imports: [ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-kanto-registry',
  styleUrl: './kanto-registry.css',
  templateUrl: './kanto-registry.html',
})
export class KantoRegistry implements OnInit {
  private formBuilder = inject(FormBuilder);
  pokemonRegistry = inject(Pokemon);
  editingId = signal<string | null>(null);

  kantoLeaders = computed(() =>
    this.pokemonRegistry.pokemonGymLeader().filter((l) => l.region === 'Kanto'),
  );

  pokemonKantoRegistry = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    region: ['Kanto', Validators.required],
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
    this.pokemonKantoRegistry.patchValue({
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
    this.pokemonKantoRegistry.reset();
  }

  deletePokeLeader(id: string) {
    if (!confirm('Are you sure to delete this Gym Leader?')) return;

    this.pokemonRegistry.deleteGymLeader(id).subscribe({
      next: () => this.pokemonRegistry.fetchGymLeader(),
      error: (err: unknown) => console.error('Error: Delete Failed.', err),
    });
  }

  onSubmit() {
    if (this.pokemonKantoRegistry.invalid) return;
    const data = this.pokemonKantoRegistry.getRawValue();
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
          this.pokemonKantoRegistry.reset();
        },
        error: (err: unknown) => console.error('Error: Save Failed.', err),
      });
    }
  }
}