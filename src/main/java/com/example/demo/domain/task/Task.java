package com.example.demo.domain.task;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Table(name="task")
@Entity(name="task")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Task {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    private String description;

    private String status;

    public Task(RequestTask requestTask){
        this.title = requestTask.title();
        this.description = requestTask.description();
        this.status = requestTask.status();
    }
}