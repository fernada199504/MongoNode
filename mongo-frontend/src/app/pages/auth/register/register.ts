import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth';

function samePassword(ctrl: AbstractControl): ValidationErrors | null {
  const p = ctrl.get('password')?.value;
  const c = ctrl.get('confirm')?.value;
  return p && c && p === c ? null : { notMatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  okMsg = ''; errMsg = ''; loading = false;

  form = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', Validators.required],
  }, { validators: samePassword });

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    const { confirm, ...dto } = this.form.value;
    this.auth.register(dto as any).subscribe({
      next: () => { this.loading = false; this.okMsg = 'Registrado'; this.router.navigateByUrl('/login'); },
      error: (e) => { this.loading = false; this.errMsg = e?.error?.message || 'Error registrando'; }
    });
  }
}