import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TaskService } from '../../../../core/services/tasks.service';
import { AlertService } from '../../../../core/services/alert.service';
import { HttpHeaders } from '@angular/common/http';

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
  private taskService = inject(TaskService);
  private alertService = inject(AlertService);

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
      if(this.isEditing())
      {
        this.updateTask()
      }else
      {
        this.addTask();
      }
    }
  }


  /** Permite añadir nuevas tareas **/
  addTask()
  {
    const title = this.taskForm.value.title!;
    const description = this.taskForm.value.description!;

    this.taskService.addTask(title,description).subscribe({
        next: (res) => 
        {
          this.isLoading.set(false);

          this.alertService.toast({
            title: 'Creación de tareas.',
            text: res.messages,
            icon: 'success',
          });
        },
        error: (err) => {
          const { error } = err;
          const messages = error.messages ?? 'Ha ocurrido un error inesperado.';
          this.isLoading.set(false);
          
          this.alertService.toast({
            title: 'Vaya...',
            text: messages,
            icon: 'error',
          });
        }
      })
  }

  /** Permite actualizar la información de una tarea **/
  updateTask()
  {

  }
}