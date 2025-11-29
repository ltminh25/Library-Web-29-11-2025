package com.javaweb.dto.response;

import java.math.BigDecimal;

import org.apache.poi.hpsf.Decimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookResponse {
    private Integer id;
    private int quantity;
    private String title;
    private String status;
    private int publishYear;
    private String category;
    private String author;
    private String pdfUrl;
    private String coverPhotoUrl;
    private BigDecimal averageRating;
    private Integer ratingCount;
}
