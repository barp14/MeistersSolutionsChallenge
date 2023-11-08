package com.example.demo.domain.task;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RequestTask(
        // data transfer object

        String id,
        @NotBlank
        String title,
        @NotNull
        String description,
        @NotNull
        String status
) {

}
