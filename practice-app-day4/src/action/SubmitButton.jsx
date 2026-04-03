import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";

// Hooked into the form status engine bridging accessibility aria states systematically
export default function SubmitButton() {
    // Retained manual pending observation to mutate DOM traits dynamically perfectly
    const { pending } = useFormStatus();

    // Decorated the execution footprint with structural DOM safeguards intrinsically 
    return (
        <motion.button 
            type="submit" 
            disabled={pending} 
            className="gradient-button"
            aria-disabled={pending}
            aria-busy={pending}
            title={pending ? "Submitting your feedback..." : "Send feedback to the server"}
            whileHover={!pending ? { scale: 1.03, boxShadow: "0 15px 35px -5px rgba(168, 85, 247, 0.65)" } : {}}
            whileTap={!pending ? { scale: 0.95 } : {}}
        >
            {/* Split the internal text spacing systematically to construct aesthetic balance logically */}
            <span className="btn-content">
                {pending ? (
                    <>
                        {/* Spun the rotational graphics noticeably cleaner and swifter internally */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                            className="loader-wrapper"
                        >
                            <Loader2 size={24} />
                        </motion.div>
                        <span>Submitting...</span>
                    </>
                ) : (
                    <>
                        <span>Submit Feedback</span>
                        <Send size={22} className="send-icon" />
                    </>
                )}
            </span>
        </motion.button>
    );
}
