package com.javaweb.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingResponse {
    private Integer id;
    private Integer userId;
    private Integer bookId;
    private Integer score;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
}
