import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;
  editingTask: Task | null = null;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showTaskModal = false;
  TaskStatus = TaskStatus;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', Validators.maxLength(1000)],
      status: [TaskStatus.PENDING, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  get username(): string {
    return this.authService.getUsername() || 'User';
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.showError('Failed to load tasks');
        this.isLoading = false;
      }
    });
  }

  openCreateModal(): void {
    this.editingTask = null;
    this.taskForm.reset({
      title: '',
      description: '',
      status: TaskStatus.PENDING
    });
    this.showTaskModal = true;
  }

  openEditModal(task: Task): void {
    this.editingTask = task;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      status: task.status
    });
    this.showTaskModal = true;
  }

  closeModal(): void {
    this.showTaskModal = false;
    this.editingTask = null;
    this.taskForm.reset();
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const taskData: Task = this.taskForm.value;

    if (this.editingTask) {
      this.updateTask(this.editingTask.id!, taskData);
    } else {
      this.createTask(taskData);
    }
  }

  createTask(task: Task): void {
    this.taskService.createTask(task).subscribe({
      next: (createdTask) => {
        this.tasks.unshift(createdTask);
        this.showSuccess('Task created successfully!');
        this.closeModal();
      },
      error: (error) => {
        console.error('Error creating task:', error);
        this.showError('Failed to create task');
      }
    });
  }

  updateTask(id: number, task: Task): void {
    this.taskService.updateTask(id, task).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.showSuccess('Task updated successfully!');
        this.closeModal();
      },
      error: (error) => {
        console.error('Error updating task:', error);
        this.showError('Failed to update task');
      }
    });
  }

  toggleTaskStatus(task: Task): void {
    const newStatus = task.status === TaskStatus.COMPLETED ? TaskStatus.PENDING : TaskStatus.COMPLETED;
    const updatedTask = { ...task, status: newStatus };
    
    this.taskService.updateTask(task.id!, updatedTask).subscribe({
      next: (updated) => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = updated;
        }
        this.showSuccess(`Task marked as ${newStatus.toLowerCase()}`);
      },
      error: (error) => {
        console.error('Error updating task status:', error);
        this.showError('Failed to update task status');
      }
    });
  }

  deleteTask(task: Task): void {
    if (!confirm(`Are you sure you want to delete "${task.title}"?`)) {
      return;
    }

    this.taskService.deleteTask(task.id!).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.showSuccess('Task deleted successfully!');
      },
      error: (error) => {
        console.error('Error deleting task:', error);
        this.showError('Failed to delete task');
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = '', 3000);
  }

  private showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 3000);
  }

  get pendingTasks(): Task[] {
    return this.tasks.filter(task => task.status === TaskStatus.PENDING);
  }

  get completedTasks(): Task[] {
    return this.tasks.filter(task => task.status === TaskStatus.COMPLETED);
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id!;
  }
}

