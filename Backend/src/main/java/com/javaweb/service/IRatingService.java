package com.javaweb.service;

import com.javaweb.customexceptions.DataNotFoundException;
import com.javaweb.dto.request.RatingRequest;
import com.javaweb.dto.response.RatingResponse;

import java.util.List;

public interface IRatingService {
    List<RatingResponse> getAllRatings();
    List<RatingResponse> getRatingByBookId(Integer bookId);
    RatingResponse createOrUpdateRating(RatingRequest request) throws DataNotFoundException;
    String deleteRating(Integer id) throws DataNotFoundException;
}
