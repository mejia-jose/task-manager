import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  completed: boolean;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './manage-tasks.component.html',
  styleUrl: './manage-tasks.component.scss'
})

export class ManageTaskComponent 
{
  private fb = inject(FormBuilder);

  taskForm = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    description: ['']
  });

  isLoading = signal(false);

  /** Variable para editar **/
  isEditing = signal(false);
  editingId: number | null = null;
  
  onSubmit()
  {
    if(this.taskForm.valid)
    {
      this.isLoading.set(true);

    }
  }

  addTask()
  {

  }
}