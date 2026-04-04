import { useState } from 'react';
import { Star, X, ThumbsUp } from 'lucide-react';

const RatingBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    // If dismissed, don't render anything, saving screen real estate
    if (!isVisible) return null;

    const handleRating = (rating) => {
        // In production, this would send an API request: axios.post('/api/ratings', { rating, complaintId })
        setSubmitted(true);
        setTimeout(() => setIsVisible(false), 3000); // Auto-dismiss after 3 seconds
    };

    return (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 shadow-sm relative overflow-hidden transition-all duration-500">

            <button
                onClick={() => setIsVisible(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>

            {submitted ? (
                <div className="flex items-center justify-center gap-2 text-green-700 font-medium py-2">
                    <ThumbsUp className="w-5 h-5" />
                    Thank you for helping us improve LokShikayat!
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h4 className="text-sm font-bold text-slate-800">Your recent grievance was resolved!</h4>
                        <p className="text-xs text-slate-600 mt-1">Ticket #1042 ("Broken Streetlight") was closed. How was your experience?</p>
                    </div>

                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(0)}
                                onClick={() => handleRating(star)}
                                className="p-1 focus:outline-none transition-transform hover:scale-110"
                            >
                                <Star
                                    className={`w-6 h-6 ${hoveredStar >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RatingBanner;