package com.taskmanager.taskmanager.dto;

import com.taskmanager.taskmanager.model.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponse {
    
    private Long id;
    
    private String title;
    
    private String description;
    
    private TaskStatus status;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}

