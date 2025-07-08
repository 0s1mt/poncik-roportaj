import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import thankYouImage from "@assets/WhatsApp Image 2025-06-26 at 20.17.55_67c44f11_1752013243402.jpg";

export default function ThankYou() {
  const [showConfetti, setShowConfetti] = useState(false);

  // Create confetti particles
  const createConfetti = () => {
    const confettiCount = 60;
    const confetti = [];
    
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a55eea'][Math.floor(Math.random() * 8)],
        size: Math.random() * 10 + 6,
        speedX: (Math.random() - 0.5) * 8,
        speedY: Math.random() * 4 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }
    
    return confetti;
  };

  const [confetti, setConfetti] = useState<any[]>([]);

  useEffect(() => {
    // Start confetti immediately when component mounts
    setShowConfetti(true);
    setConfetti(createConfetti());
    
    const interval = setInterval(() => {
      setConfetti(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        rotation: particle.rotation + particle.rotationSpeed
      })).filter(particle => particle.y < window.innerHeight + 20));
    }, 16);

    const timeout = setTimeout(() => {
      setShowConfetti(false);
      setConfetti([]);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="gradient-bg min-h-screen overflow-hidden relative">
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {confetti.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  borderRadius: '50%',
                  transform: `rotate(${particle.rotation}deg)`
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0.9, scale: 0.9 }}
                exit={{ opacity: 0, scale: 0 }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              top: `${[10, 20, 30, 40, 50, 60, 70, 80, 15, 85][i]}%`,
              left: `${[15, 25, 35, 45, 55, 65, 75, 85, 5, 95][i]}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotateY: 180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="w-full max-w-2xl"
        >
          <Card className="question-container rounded-3xl shadow-2xl relative overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              {/* Cute animal emojis */}
              <motion.div
                className="absolute -top-6 -left-6 text-5xl"
                animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🐱
              </motion.div>
              <motion.div
                className="absolute -top-6 -right-6 text-5xl"
                animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                🐰
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 text-5xl"
                animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                🐶
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -right-6 text-5xl"
                animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
              >
                🐭
              </motion.div>

              {/* Thank you message */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-8"
              >
                <div className="text-7xl mb-6">🎉</div>
                <motion.h1 
                  className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Çok Teşekkür Ederim!
                </motion.h1>
                <p className="text-gray-600 text-lg mb-6">
                  Zaman ayırdığınız için minnettarım. En kısa sürede size dönüş yapacağım.
                </p>
              </motion.div>

              {/* User image */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.7, type: "spring" }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <img 
                    src={thankYouImage} 
                    alt="Teşekkürler" 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-xl border-4 border-white"
                  />
                  <motion.div
                    className="absolute -top-2 -right-2 text-3xl"
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                </div>
              </motion.div>

              {/* Quantum bilgi */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl border-2 border-purple-200"
              >
                <div className="text-4xl mb-3">🔬</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Kuantum Bilgi
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Kuantum fiziğinde, bir parçacık aynı anda birden fazla durumda bulunabilir. 
                  Bu "süperpozisyon" ilkesi sayesinde, kuantum bilgisayarlar klasik bilgisayarlardan 
                  exponansiyel olarak daha hızlı hesaplama yapabilir. Tıpkı bu röportajın 
                  hem gerçekleşmiş hem de henüz gerçekleşmemiş olması gibi! 🌌
                </p>
              </motion.div>

              {/* Footer message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-8"
              >
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <span className="text-2xl">⚡</span>
                  <span className="text-sm">Hızlıca dönüş yapılacak</span>
                  <span className="text-2xl">⚡</span>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}