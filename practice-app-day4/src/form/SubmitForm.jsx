import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubmitButton from "../action/SubmitButton";
import { CheckCircle2, AlertCircle, Star } from "lucide-react";

// Crafted the input interface mapping DOM changes to React variables for accessibility
export default function SubmitForm({ formRef, action, state }) {
    // Created local states ensuring visual perfection and strict validation metrics
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [commentText, setCommentText] = useState("");
    const [toastVisible, setToastVisible] = useState(false);

    // Kept watch on the action state to trigger auto-hiding toast messages reliably
    useEffect(() => {
        if (state?.message) {
            setToastVisible(true);
            
            // Cleared out the local inputs natively if the validation completed successfully
            if (state.success) {
                setRating(0);
                setCommentText("");
            }

            // Dissipated the feedback toast smoothly scaling it downwards securely
            const timer = setTimeout(() => setToastVisible(false), 4500); 
            return () => clearTimeout(timer);
        }
    }, [state]);

    // Handled keyboard accessibility strictly enabling Space or Enter to lock ratings natively
    const handleKeyDown = (e, star) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setRating(star);
        }
    };

    return (
        <form ref={formRef} action={action}>
            <AnimatePresence>
                {/* Dropped the animated toast selectively distinguishing success vs error themes securely */}
                {toastVisible && state?.message && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, marginBottom: '1.5rem' }}
                        exit={{ opacity: 0, scale: 0.9, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                        className={`toast-container ${!state.success ? 'toast-error' : ''}`}
                    >
                        {state.success ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        <span>{state.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="form-group">
                <label>Select Rating</label>
                <div className="star-rating-container" role="radiogroup" aria-label="Rating">
                    {/* Rendered 5 interactive stars securing keyboard a11y implicitly and firmly */}
                    {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                            type="button"
                            key={star}
                            role="radio"
                            aria-checked={rating === star}
                            tabIndex={0}
                            whileHover={{ scale: 1.35 }}
                            whileTap={{ scale: 0.8 }}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(rating)}
                            onClick={() => setRating(star)}
                            onKeyDown={(e) => handleKeyDown(e, star)}
                            className="star-btn"
                        >
                            <Star 
                                size={34}
                                fill={(hover || rating) >= star ? '#fbbf24' : 'transparent'}
                                color={(hover || rating) >= star ? '#fbbf24' : 'rgba(148, 163, 184, 0.3)'}
                                style={{ 
                                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)", 
                                    filter: (hover || rating) >= star ? 'drop-shadow(0 0 14px rgba(251, 191, 36, 0.7))' : 'none' 
                                }}
                            />
                        </motion.button>
                    ))}
                    {/* Synchronized hidden DOM bindings validating inputs properly */}
                    <input type="hidden" name="rating" value={rating === 0 ? '' : rating} required />
                </div>
            </div>
            
            <div className="form-group">
                <div className="label-row">
                    <label htmlFor="comment">Your Feedback</label>
                    {/* Incorporated the required character counter to provide visual limit bounds locally */}
                    <span className={`char-counter ${commentText.length >= 5 ? 'valid' : 'invalid'}`}>
                        {commentText.length} / 5 min
                    </span>
                </div>
                {/* Embedded dynamic glow bounds inside the interactive focal element completely */}
                <motion.textarea 
                    whileFocus={{ scale: 1.02 }}
                    transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                    name="comment" 
                    id="comment" 
                    rows="4" 
                    required 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="glow-input"
                    placeholder="Share your thoughts or suggestions here..." 
                />
            </div>

            <SubmitButton />
        </form>
    );
}
