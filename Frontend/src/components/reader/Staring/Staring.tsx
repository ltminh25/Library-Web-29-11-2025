
import React, { useState } from "react";
import "./Staring.css"; // hoặc StarRating.css

// THÊM interactive, onRate, userRating, disabled
interface StarRatingProps {
    rating: number | null | undefined;
    size?: "sm" | "md" | "lg";
    interactive?: boolean;     // ← THÊM
    onRate?: (score: number) => void; // ← THÊM
    userRating?: number;       // ← THÊM
    disabled?: boolean;        // ← THÊM
}

const StarRating: React.FC<StarRatingProps> = ({
    rating,
    size = "md",
    interactive = false,
    onRate,
    userRating = 0,
    disabled = false,
}) => {
    const [hoverRating, setHoverRating] = useState(0);
    const displayRating = hoverRating || userRating || Math.round(rating || 0);

    const handleClick = (score: number) => {
        if (!interactive || disabled || !onRate) return;
        onRate(score);
    };

    const handleMouseEnter = (score: number) => {
        if (!interactive) return;
        setHoverRating(score);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    return (
        <div
            className={`star-rating star-rating--${size} ${interactive ? "interactive" : ""}`}
            onMouseLeave={handleMouseLeave}
        >
            {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                const isFilled = interactive
                    ? starValue <= displayRating
                    : starValue <= Math.round(rating || 0);

                return (
                    <span
                        key={i}
                        className={`star ${isFilled ? "filled" : "empty"} ${interactive ? "clickable" : ""
                            }`}
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => handleMouseEnter(starValue)}
                        style={{ cursor: interactive && !disabled ? "pointer" : "default" }}
                    >
                        ★
                    </span>
                );
            })}
            <span className="rating-text">
                {rating ? rating.toFixed(1) : "?"}
                {interactive && userRating > 0}\5.0
            </span>
        </div>
    );
};

export default StarRating;