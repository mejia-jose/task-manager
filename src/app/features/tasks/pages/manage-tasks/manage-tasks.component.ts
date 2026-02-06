import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TaskService } from '../../../../core/services/tasks.service';
import { AlertService } from '../../../../core/services/alert.service';
import { ApiTaskResponse, IGetTaskResponse, Task } from '../../../../core/interfaces/task.interface';

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

  /** Se realiza la definicion del formulario reactivo **/
  taskForm = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    description: ['']
  });

  /** Se definen los signals para manejar el estado del componente **/
  isEditing = signal(false);
  editingId: number | null = null;
  isLoading = signal(false);
  taskId = signal('');
  public tasks = signal<Task[]>([]);

  ngOnInit() {
    this.loadTasks();
  }

  /** Permite obtener el listado de tareas del usuario */
  loadTasks()
  {
    this.taskService.getAllTask().subscribe({
      next: (response: IGetTaskResponse) => 
      {
        const tasksList = response.data; 
        if (Array.isArray(tasksList)) {
          this.tasks.set(tasksList);
        }

        this.alertService.toast({
          title: 'Listado de tareas.',
          text: response.messages || 'Tareas cargadas.',
          icon: 'success',
        });
      },
      error: (err) => { 
        this.alertService.toast({
          title: 'Listado de tareas.',
          text: err.messages || 'Tareas cargadas.',
          icon: 'success',
        });
      }
    });
  }

  /** Permite setear los datos de la tarea en el formulario **/
  editTask(item:Task)
  {
    this.isEditing.set(true);
    this.taskId.set(item.id);
    this.taskForm.patchValue({
      title: item.title,
      description: item.description
    });
  }
  
  /** Gestiona el envío del formulario, determinando si debe crear una nueva tarea o actualizar una existente */
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