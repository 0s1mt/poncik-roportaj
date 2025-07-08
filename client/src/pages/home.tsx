import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Home() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  // Get random position for the moving button
  const getRandomPosition = useCallback(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = 120; // Approximate button width
    const buttonHeight = 48; // Approximate button height
    
    const maxX = windowWidth - buttonWidth - 40;
    const maxY = windowHeight - buttonHeight - 40;
    
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    return { 
      x: Math.max(20, x), 
      y: Math.max(20, y) 
    };
  }, []);

  // Move the no button to a random position
  const moveNoButton = useCallback(() => {
    if (isMoving) return;
    
    setIsMoving(true);
    const position = getRandomPosition();
    setNoButtonPosition(position);
    
    setTimeout(() => {
      setIsMoving(false);
    }, 500);
  }, [getRandomPosition, isMoving]);

  // Initialize no button position
  useEffect(() => {
    const position = getRandomPosition();
    setNoButtonPosition(position);
  }, [getRandomPosition]);

  // Move no button continuously
  useEffect(() => {
    const interval = setInterval(moveNoButton, 1500);
    return () => clearInterval(interval);
  }, [moveNoButton]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const rect = {
        right: noButtonPosition.x + 120,
        bottom: noButtonPosition.y + 48
      };
      
      if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
        moveNoButton();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [noButtonPosition, moveNoButton]);

  const handleYesClick = () => {
    setShowSuccessModal(true);
  };

  const handleNoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    moveNoButton();
  };

  const handleNoHover = () => {
    moveNoButton();
  };

  return (
    <div className="gradient-bg min-h-screen overflow-hidden relative">
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              top: `${[10, 30, 60, 80, 20, 70][i]}%`,
              left: `${[20, 80, 10, 70, 60, 40][i]}%`,
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Question Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="question-container rounded-3xl shadow-2xl max-w-md w-full relative">
            <CardContent className="p-8 md:p-12 text-center">
              {/* Decorative emojis */}
              <motion.div
                className="absolute -top-4 -left-4 text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💝
              </motion.div>
              <motion.div
                className="absolute -top-4 -right-4 text-3xl"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                🌸
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 text-3xl"
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                💖
              </motion.div>
              
              {/* Question text */}
              <div className="mb-8">
                <motion.h1 
                  className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Röportaj için müsait misin?
                </motion.h1>
                <motion.div 
                  className="text-6xl mb-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎤
                </motion.div>
                <p className="text-gray-600">
                  Seninle kısa bir röportaj yapmak istiyorum!
                </p>
              </div>

              {/* Yes button (stationary) */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.2 }}
              >
                <Button
                  onClick={handleYesClick}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-emerald-500 hover:to-green-400 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl text-lg relative overflow-hidden"
                  size="lg"
                >
                  <span className="relative z-10">✅ Evet!</span>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Moving No button */}
      <motion.div
        className="fixed z-10"
        animate={{
          x: noButtonPosition.x,
          y: noButtonPosition.y,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        style={{ left: 0, top: 0 }}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95, rotate: -5 }}
        >
          <Button
            onClick={handleNoClick}
            onMouseEnter={handleNoHover}
            onContextMenu={handleNoClick}
            className="bg-gradient-to-r from-pink-500 to-red-400 hover:from-red-400 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl text-base relative overflow-hidden"
          >
            <span className="relative z-10">❌ Hayır</span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Success modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
            <DialogContent className="rounded-3xl max-w-sm text-center">
              <DialogHeader>
                <div className="text-6xl mb-4">🎉</div>
                <DialogTitle className="text-2xl font-bold text-gray-800 mb-4">
                  Harika!
                </DialogTitle>
              </DialogHeader>
              <p className="text-gray-600 mb-6">
                Röportaj için teşekkürler! Yakında iletişime geçeceğim.
              </p>
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="bg-gradient-to-r from-pink-500 to-purple-400 text-white font-semibold py-3 px-6 rounded-full hover:shadow-lg"
              >
                Kapat
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
