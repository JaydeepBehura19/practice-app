// Simulated a backend server action handling the feedback submission safely
export async function submitFeedbackAction(previousState, formData) {
    try {
        const rawRating = formData.get("rating");
        const rawComment = formData.get("comment");
        
        // Paused execution to mimic real network latency realistically
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Processed and cleaned the string data securely
        const rating = Number(rawRating);
        const comment = typeof rawComment === 'string' ? rawComment.trim() : '';

        // Validated the inputs rigidly to prevent bad data injections
        if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
            return { success: false, message: "Invalid rating selected. Please provide a rating between 1 and 5." };
        }
        
        if (comment.length < 5) {
            return { success: false, message: "Feedback must contain at least 5 characters to be helpful." };
        }
        
        // Constructed the returned response and generated a mock identifier systematically
        const newFeedback = {
            id: crypto.randomUUID(),
            rating: rating,
            comment: comment,
        };

        return {
            success: true,
            message: "Thank you for the amazing feedback!",
            data: newFeedback
        };
    } catch (error) {
        // Appended systematic error catching securely for stability
        return { success: false, message: "A server transmission error occurred. Please attempt again." };
    }
}
