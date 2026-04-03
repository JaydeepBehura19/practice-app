// Integrated a cinematic startup sequence rendering perfectly at optimal velocity natively
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClientAction from "./action/ClientAction";
import "./App.css";

// Formatted the overarching SaaS wrapper gracefully maintaining state bounds securely inside
function App() {
  // Configured the intro timing logic securely executing sequence tracking inherently
  const [showSplash, setShowSplash] = useState(true);

  // Expired the splash sequence rapidly at strictly 1.8 seconds satisfying robust standards
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Background Ambient Layer: Adding deep living gradients behind the application natively */}
      <div className="ambient-background">
         <motion.div 
            animate={{ 
              x: [0, 60, -40, 0], 
              y: [0, -40, 60, 0],
              scale: [1, 1.15, 0.85, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="ambient-blob blob-purple"
         />
         <motion.div 
            animate={{ 
              x: [0, -70, 50, 0], 
              y: [0, 70, -50, 0],
              scale: [1, 0.9, 1.1, 1]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="ambient-blob blob-blue"
         />
      </div>

      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div 
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.15, filter: "blur(12px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="splash-screen"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30, letterSpacing: "1px" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "6px" }}
              transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
              className="splash-text glow-text"
            >
              Smart Feedback
            </motion.h1>
            <motion.div 
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
               className="splash-line"
            />
          </motion.div>
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="app-container"
          >
            <header className="app-header">
               <motion.div 
                  initial={{ y: -30, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="logo-container"
               >
                  <h1 className="logo premium-brand">
                    SmartFeedback
                  </h1>
               </motion.div>
            </header>
            <main className="main-content">
              {/* Passed the architectural controls securely into the nested scoped logic perfectly */}
              <ClientAction />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
