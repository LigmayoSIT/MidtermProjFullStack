import { ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

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

  pokemonHoennRegistry = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    region: ['', Validators.required],
    town: ['', Validators.required],
    badge: ['', Validators.required],
    specialty: ['', Validators.required],
    aceLevel: [1, [Validators.required, Validators.min(1)]],
    motto: ['', Validators.required]
  });

  ngOnInit(){
    this.pokemonService.fetchPokeLeader();
  }
  deletePokeLeader(id: string){
    if(confirm("Are you sure you want to delete this Leader?")){
      this.pokemonRegistry.deletePokeLeader(id);
    }
    this.pokemonRegistry.fetchPokeLeader();
  }
  startEdit(){
    this.editingId.set(null);
    this.pokemonHoennRegistry.patchValue(pokemon);
  }
  onSubmit(){
    if (this.pokemonHoennRegistry.invalid) return;
    const data = this.pokemonHoennRegistry.getRawValue();

    if(this.pokemonHoennRegistry.valid){
      this.pokemonService.saveGymLeader(data).subscribe({
        next: () => {
          this.pokemonService.fetchGymLeader();
          this.pokemonHoennRegistry.reset();
          console.log("Pokemon saved successfully"):
        }
      })
    }
  }
}
