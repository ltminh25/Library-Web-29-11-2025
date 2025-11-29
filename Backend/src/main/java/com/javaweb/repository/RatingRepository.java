package com.javaweb.repository;

import com.javaweb.models.entity.Rating;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import lombok.RequiredArgsConstructor;

import java.sql.*;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RatingRepository {
    private final JdbcTemplate jdbcTemplate;
    private static final RowMapper<Rating> RATING_ROW_MAPPER = RatingRepository::mapRating;

    public List<Rating> findAll(){
        return jdbcTemplate.query("""
                SELECT id, user_id, book_id, score, created_at, updated_at
                FROM rating
            """, RATING_ROW_MAPPER);
    }

    public Optional<Rating> findById(Integer Id){
        List<Rating> result = jdbcTemplate.query("""
            SELECT id, user_id, book_id, score, created_at, updated_at
            FROM rating
            WHERE id = ?
        """, RATING_ROW_MAPPER, Id);
        return result.stream().findFirst();
    }

    public List<Rating> findByBookId(Integer bookId){
        return jdbcTemplate.query("""
            SELECT id, user_id, book_id, score, created_at, updated_at
            FROM rating
            WHERE book_id = ?
        """, RATING_ROW_MAPPER, bookId);    
    }

    public Optional<Rating> findByUserAndBook(int userId, int bookId){
        List<Rating> result = jdbcTemplate.query("""
            SELECT id, user_id, book_id, score, created_at, updated_at
            FROM rating
            WHERE user_id = ? AND book_id = ?
        """, RATING_ROW_MAPPER, userId, bookId);
        return result.stream().findFirst();
    }

    public Rating save(Rating rating){
        if(rating.getId() == null){
            return insert(rating);
        } else {
            update(rating);
            return rating;
        }
    }

    public void deleteById(Integer id){
        jdbcTemplate.update("DELETE FROM rating WHERE id = ?", id);
    }

    public Rating insert(Rating rating){
        var keyHolder = new org.springframework.jdbc.support.GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement("""
                INSERT INTO rating (user_id, book_id, score)
                VALUES (?, ?, ?)
            """, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, rating.getUserId());
            ps.setInt(2, rating.getBookId());
            ps.setInt(3, rating.getScore());
            return ps;
        }, keyHolder);
        Number key = keyHolder.getKey();
        if(key != null) rating.setId(key.intValue());
        return rating;
    }

    public void update(Rating rating){
        jdbcTemplate.update("""
            UPDATE rating
            SET score = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?     
        """, rating.getScore(), rating.getId());
    }

    private static Rating mapRating(ResultSet rs, int rowNum) throws SQLException{
        return Rating.builder()
                .id(rs.getInt("id"))
                .userId(rs.getInt("user_id"))
                .bookId(rs.getInt("book_id"))
                .score(rs.getInt("score"))
                .createAt(rs.getTimestamp("created_at").toLocalDateTime())
                .updateAt(rs.getTimestamp("updated_at").toLocalDateTime())
                .build();
    }
}
