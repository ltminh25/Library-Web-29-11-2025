package com.javaweb.service.impl;

import com.javaweb.customexceptions.DataNotFoundException;
import com.javaweb.dto.request.RatingRequest;
import com.javaweb.dto.response.RatingResponse;
import com.javaweb.models.entity.Rating;
import com.javaweb.repository.BookRepository;
import com.javaweb.repository.RatingRepository;
import com.javaweb.service.IRatingService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RatingService implements IRatingService {

    private final RatingRepository ratingRepository;
    private final BookRepository bookRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<RatingResponse> getAllRatings() {
        return ratingRepository.findAll().stream()
                .map(rating -> modelMapper.map(rating, RatingResponse.class))
                .toList();
    }

    @Override
    public List<RatingResponse> getRatingByBookId(Integer bookId) {
        List<Rating> ratings = ratingRepository.findByBookId(bookId);
        return ratings.stream()
                .map(rating -> modelMapper.map(rating, RatingResponse.class))
                .toList();
    }

    @Override
    public RatingResponse createOrUpdateRating(RatingRequest request) throws DataNotFoundException {
        if (request.getUserId() == null || request.getBookId() == null) {
            throw new DataNotFoundException("User ID or Book ID cannot be null");
        }

        var existing = ratingRepository.findByUserAndBook(request.getUserId(), request.getBookId());

        Rating rating;
        if (existing.isPresent()) {

            rating = existing.get();
            rating.setScore(request.getScore());
            ratingRepository.update(rating);
        } else {
            rating = new Rating(); 
            rating.setUserId(request.getUserId());
            rating.setBookId(request.getBookId());
            rating.setScore(request.getScore());
            ratingRepository.insert(rating); 
        }

        updateBookAverageRating(request.getBookId());

        return modelMapper.map(rating, RatingResponse.class);
    }

    @Override
    public String deleteRating(Integer id) throws DataNotFoundException {
        Rating existing = ratingRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Rating not found with id: " + id));

        ratingRepository.deleteById(id);
        updateBookAverageRating(existing.getBookId());
        return "Rating deleted successfully";
    }

    private void updateBookAverageRating(Integer bookId) {
        List<Rating> ratings = ratingRepository.findByBookId(bookId);
        double avg = 0.0;
        int count = ratings.size();

        if (count > 0) {
            avg = ratings.stream()
                    .mapToInt(Rating::getScore)
                    .average()
                    .orElse(0.0);
        }

        bookRepository.updateAverageRating(bookId, avg, count);
    }
}
