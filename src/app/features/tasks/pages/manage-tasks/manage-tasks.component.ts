import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { TaskService } from '../../../../core/services/tasks.service';
import { AlertService } from '../../../../core/services/alert.service';
import { ApiTaskResponse, IGetTaskResponse, Task, TaskStatusUpdate } from '../../../../core/interfaces/task.interface';
import { Observer } from 'rxjs';

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
  loadTasks(showMessages?: boolean)
  {
    this.taskService.getAllTask().subscribe({
      next: (response: IGetTaskResponse) => 
      {
        const tasksList = response.data; 
        if (Array.isArray(tasksList)) {
          this.tasks.set(tasksList);
        }

        if(showMessages)
        {
            this.alertService.toast({
            title: 'Listado de tareas.',
            text: response.messages || 'Tareas cargadas.',
            icon: 'success',
          });
        }
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

    this.taskService.addTask(title,description).subscribe(
      this.handleTaskResponse('Creación de tareas.', 'La tarea ha sido creada correctamente.')
    );
  }

  /** Permite actualizar la información de una tarea **/
  updateTask()
  {
    const formData = this.taskForm.getRawValue();
    const data = {  ...formData, taskId: this.taskId()};

    if (this.taskId()) {
      this.taskService.update(data).subscribe(
        this.handleTaskResponse('Actualización exitosa.', 'La tarea ha sido actualizada correctamente.')
      );
    }
  }

  /** Método que permite reutlizar la logica para las respuesta de agregar y actualizar tarea */
  handleTaskResponse(title: string, text: string): Partial<Observer<any>>
  {
    return {
      next: (res: ApiTaskResponse) =>
      {
        this.isLoading.set(false);
        this.loadTasks(false);
        this.alertService.toast({
          title: title,
          text: res.messages ?? text, 
          icon: 'success',
        });
        this.resetForm();
      },
      error: (err: any) => 
      {
        const messages = err.error?.messages || err.message || 'Ha ocurrido un error inesperado.';
        this.isLoading.set(false);
        this.alertService.toast({
          title: 'Vaya...',
          text: messages,
          icon: 'error',
        });
        this.loadTasks(false);
      }
    }
  }

  /** Permite abrir el modal de confirmación de eliminación y actualiza el estado de la tarea **/
  async deleteTask(taskId: string, status: TaskStatusUpdate)
  {
    const result = await this.alertService.modalConfirm(
      '¿Eliminar tarea?', 
      'Esta acción no se puede deshacer y la información se perderá permanentemente.'
    );

    if(result)
    {
      this.taskService.updateStatus(taskId,status).subscribe(
        this.handleTaskResponse('Eliminar tarea', 'La tarea ha sido eliminada correctamente.')
      );
    }
  }

  /** Permite cambiar el estado de una tarea a completado **/
  async isComplete(taskId: string, status: TaskStatusUpdate)
  {
    this.taskService.updateStatus(taskId,status).subscribe(
      this.handleTaskResponse('Tarea completada', 'La tarea ha sido marcada como completada.')
    );
  }

  /** Permite limpiar el formulario */
  resetForm() 
  {
    this.taskForm.reset();
    this.isEditing.set(false);
    this.taskId.set('');
  }
}