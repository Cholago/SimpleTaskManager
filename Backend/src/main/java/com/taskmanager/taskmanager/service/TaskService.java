package com.taskmanager.taskmanager.service;

import com.taskmanager.taskmanager.dto.TaskRequest;
import com.taskmanager.taskmanager.dto.TaskResponse;
import com.taskmanager.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.taskmanager.model.Task;
import com.taskmanager.taskmanager.model.TaskStatus;
import com.taskmanager.taskmanager.model.User;
import com.taskmanager.taskmanager.repository.TaskRepository;
import com.taskmanager.taskmanager.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaskService {
    
    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);
    
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
    }
    
    @Transactional
    public TaskResponse createTask(TaskRequest request) {
        User user = getCurrentUser();
        logger.info("Creating task for user: {}", user.getUsername());
        
        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(request.getStatus() != null ? request.getStatus() : TaskStatus.PENDING)
                .user(user)
                .build();
        
        task = taskRepository.save(task);
        logger.info("Task created with ID: {}", task.getId());
        
        return mapToResponse(task);
    }
    
    public List<TaskResponse> getAllTasks() {
        User user = getCurrentUser();
        logger.debug("Fetching all tasks for user: {}", user.getUsername());
        
        List<Task> tasks = taskRepository.findByUserId(user.getId());
        return tasks.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public TaskResponse getTaskById(Long id) {
        User user = getCurrentUser();
        logger.debug("Fetching task with ID: {} for user: {}", id, user.getUsername());
        
        Task task = taskRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> {
                    logger.error("Task not found with ID: {} for user: {}", id, user.getUsername());
                    return new ResourceNotFoundException("Task not found with id: " + id);
                });
        
        return mapToResponse(task);
    }
    
    @Transactional
    public TaskResponse updateTask(Long id, TaskRequest request) {
        User user = getCurrentUser();
        logger.info("Updating task with ID: {} for user: {}", id, user.getUsername());
        
        Task task = taskRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> {
                    logger.error("Task not found with ID: {} for user: {}", id, user.getUsername());
                    return new ResourceNotFoundException("Task not found with id: " + id);
                });
        
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        if (request.getStatus() != null) {
            task.setStatus(request.getStatus());
        }
        
        task = taskRepository.save(task);
        logger.info("Task updated successfully with ID: {}", task.getId());
        
        return mapToResponse(task);
    }
    
    @Transactional
    public void deleteTask(Long id) {
        User user = getCurrentUser();
        logger.info("Deleting task with ID: {} for user: {}", id, user.getUsername());
        
        Task task = taskRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> {
                    logger.error("Task not found with ID: {} for user: {}", id, user.getUsername());
                    return new ResourceNotFoundException("Task not found with id: " + id);
                });
        
        taskRepository.delete(task);
        logger.info("Task deleted successfully with ID: {}", id);
    }
    
    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .status(task.getStatus())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}

