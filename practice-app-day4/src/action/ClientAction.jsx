// Integrated framer-motion for UI animations smoothly and selectively
import { useActionState, useState, useOptimistic, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitFeedbackAction } from "./ServerAction";
import SubmitForm from "../form/SubmitForm";
import { MessageSquare, Sparkles, Inbox } from "lucide-react";

// Crafted standardized physics profiles for premium execution
const transitionSpring = { type: "spring", bounce: 0.3, duration: 0.6 };
const transitionEase = { duration: 0.7, ease: [0.16, 1, 0.3, 1] };

// Orchestrated container variants handling staggered list animations securely
const listContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

// Item variants orchestrating the drop-in effects natively
const listItem = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    show: { opacity: 1, scale: 1, y: 0, transition: transitionSpring }
};

// Maintained the overarching state boundary prioritizing optimistic fluidity
export default function ClientAction() {
    // Archived all resolved validations here permanently
    const [feedbacks, setFeedbacks] = useState([]);
    const formRef = useRef(null);

    // Initialized the optimistic integration for zero-latency presentation
    const [optimisticFeedbacks, addOptimisticFeedback] = useOptimistic(
        feedbacks,
        (current, newFb) => [newFb, ...current]
    );

    // Hooked the latest ActionState engine monitoring validation failures safely
    const [state, formAction] = useActionState(async (prevState, formData) => {
        // Sculpted the initial speculative feedback instantly
        const tempFeedback = {
            id: 'temp-' + Date.now(),
            rating: Number(formData.get("rating")),
            comment: formData.get("comment"),
            isPending: true
        };
        
        // Casted it directly to the view assuming optimistic truth
        addOptimisticFeedback(tempFeedback);

        // Requested the backend validation rules securely
        const result = await submitFeedbackAction(prevState, formData);
        
        // Secured permanent addition strictly on success conditions natively
        if (result.success && result.data) {
            setFeedbacks(prev => [result.data, ...prev]);
            // Purged the DOM nodes programmatically preserving UI state
            if (formRef.current) formRef.current.reset();
        }
        
        return result;
    }, null);

    return (
        <div className="dashboard-grid">
            {/* Mounted the interactive SubmitForm smoothly into an eased panel */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={transitionEase}
                className="glass-panel"
            >
                <h2 className="dashboard-header">
                    Share Experience <Sparkles size={26} className="inline-icon" />
                </h2>
                <p className="subtitle">We value your insights to help us improve our services.</p>
                
                <SubmitForm formRef={formRef} action={formAction} state={state} />
            </motion.div>

            {/* Revealed the feedback list panel leveraging refined easing logic */}
            <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...transitionEase, delay: 0.15 }}
                className="glass-panel list-panel"
            >
                <h3 className="community-header">
                    <MessageSquare size={26} className="inline-icon"/> Community Pulse
                </h3>
                
                {optimisticFeedbacks.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={transitionEase}
                        className="empty-state"
                    >
                        <Inbox size={48} opacity={0.5} />
                        <p>No feedback provided yet. Be the first to share your experience!</p>
                    </motion.div>
                ) : (
                    <motion.ul 
                        className="feedback-items"
                        variants={listContainer}
                        initial="hidden"
                        animate="show"
                    >
                        <AnimatePresence mode="popLayout">
                            {/* Handled dynamic iteration safely tracking pending behaviors */}
                            {optimisticFeedbacks.map((fb) => (
                                <motion.li 
                                    layout
                                    variants={listItem}
                                    key={fb.id} 
                                    className={`feedback-card ${fb.isPending ? 'pending-card' : ''}`}
                                >
                                    <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                            <span 
                                                key={i} 
                                                style={{ 
                                                    color: i < fb.rating ? '#fbbf24' : '#334155', 
                                                    fontSize: '1.2rem',
                                                    textShadow: i < fb.rating && !fb.isPending ? '0 0 10px rgba(251, 191, 36, 0.4)' : 'none'
                                                }}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                    <p>{fb.comment}</p>
                                    
                                    {/* Showed a polished loader when the item processed server-side */}
                                    {fb.isPending && (
                                        <div className="pending-spinner">
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                                            </svg>
                                        </div>
                                    )}
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </motion.ul>
                )}
            </motion.div>
        </div>
    );
}
