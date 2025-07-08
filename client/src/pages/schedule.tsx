import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, MapPin } from "lucide-react";

export default function Schedule() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    location: ""
  });
  const [showConfetti, setShowConfetti] = useState(false);

  // Create confetti particles
  const createConfetti = () => {
    const confettiCount = 50;
    const confetti = [];
    
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'][Math.floor(Math.random() * 7)],
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 6,
        speedY: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8
      });
    }
    
    return confetti;
  };

  const [confetti, setConfetti] = useState<any[]>([]);

  useEffect(() => {
    if (showConfetti) {
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
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [showConfetti]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfetti(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
                animate={{ opacity: 0.8, scale: 0.8 }}
                exit={{ opacity: 0, scale: 0 }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              top: `${[15, 25, 45, 65, 85, 35, 55, 75][i]}%`,
              left: `${[25, 75, 15, 85, 45, 65, 5, 95][i]}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="question-container rounded-3xl shadow-2xl relative">
            <CardHeader className="text-center pb-4">
              {/* Cute emojis around the header */}
              <motion.div
                className="absolute -top-6 -left-6 text-4xl"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🐱
              </motion.div>
              <motion.div
                className="absolute -top-6 -right-6 text-4xl"
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                🐰
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 text-4xl"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                🐶
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -right-6 text-4xl"
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                🐭
              </motion.div>

              <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                <span className="cute-emoji">🎉</span> Harika!
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Vakit ayırdığın için teşekkür ederim! 
                <br />
                Röportaj tarihi belirleyelim
              </p>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    İsim
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Adınızı girin"
                    className="rounded-xl border-2 border-pink-200 focus:border-pink-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <span>📧</span>
                    E-posta
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="E-posta adresinizi girin"
                    className="rounded-xl border-2 border-pink-200 focus:border-pink-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Tarih
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 border-pink-200 focus:border-pink-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Saat
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="rounded-xl border-2 border-pink-200 focus:border-pink-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Konum (İsteğe bağlı)
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Zoom, ofis, kafe vb."
                    className="rounded-xl border-2 border-pink-200 focus:border-pink-400"
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl text-lg"
                  >
                    <span className="cute-emoji">📅</span> Planla!
                  </Button>
                </motion.div>
              </form>

              {showConfetti && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center"
                >
                  <div className="text-4xl mb-2">🎊</div>
                  <p className="text-gray-700 font-medium">
                    Başarıyla kaydedildi!
                  </p>
                  <p className="text-gray-600 text-sm">
                    Yakında size ulaşacağım
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}