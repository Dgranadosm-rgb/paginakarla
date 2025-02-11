import React, { useState, useRef, useEffect } from 'react';
import { Heart, Camera, Stars } from 'lucide-react';

function App() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = noButtonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate distance between mouse and button center
      const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) + Math.pow(mouseY - buttonCenterY, 2)
      );

      // If mouse is within 100px of the button, move it away
      if (distance < 100) {
        const moveX = Math.random() * 200 - 100; // Random movement between -100 and 100
        const moveY = Math.random() * 200 - 100;
        
        // Ensure button stays within viewport
        const newX = Math.min(Math.max(0, rect.left + moveX), window.innerWidth - rect.width);
        const newY = Math.min(Math.max(0, rect.top + moveY), window.innerHeight - rect.height);
        
        button.style.position = 'fixed';
        button.style.left = `${newX}px`;
        button.style.top = `${newY}px`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-200 flex flex-col items-center justify-center p-4">
      {/* Main content container */}
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        {/* Header with hearts */}
        <div className="flex items-center justify-center gap-4">
          <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
          <h1 className="text-4xl font-bold text-pink-600 text-center">
            Karla Marlene Samantha
          </h1>
          <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
        </div>

        {/* Photo gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="aspect-square bg-pink-50 rounded-lg flex items-center justify-center">
            <div className="text-center p-4">
              <Camera className="w-12 h-12 text-pink-400 mx-auto mb-2" />
              <p className="text-pink-600">Añade tu foto favorita aquí</p>
              <img src="C:\Users\Daniel Isaac\Downloads\project\imagenes\imagen1.jpg" />
            </div>
          </div>
          <div className="aspect-square bg-pink-50 rounded-lg flex items-center justify-center">
            <div className="text-center p-4">
              <Camera className="w-12 h-12 text-pink-400 mx-auto mb-2" />
              <p className="text-pink-600">Añade otra foto especial aquí</p>
              <img src="C:\Users\Daniel Isaac\Downloads\project\imagenes\imagen2.jpg" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-6">
          <Stars className="w-8 h-8 text-pink-500 mx-auto" />
          <p className="text-xl text-gray-700 leading-relaxed">
            Desde que entraste en mi vida, cada día ha sido más especial.
            Tu sonrisa ilumina mi mundo y tu presencia hace que todo sea mejor.
            Por eso, quiero preguntarte algo muy importante...
          </p>
          <h2 className="text-3xl font-bold text-pink-600 mt-8">
            ¿Quieres ser mi novia?
          </h2>
        </div>

        {/* Buttons */}
        {!showAnswer ? (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setShowAnswer(true);
                setAnswer('yes');
              }}
              className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold transform hover:scale-105 transition"
            >
              ¡Sí! 💖
            </button>
            <button
              ref={noButtonRef}
              onClick={() => {
                setShowAnswer(true);
                setAnswer('no');
              }}
              className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-semibold transform hover:scale-105 transition"
            >
              No 💔
            </button>
          </div>
        ) : (
          <div className="text-center">
            {answer === 'yes' && (
              <div className="animate-bounce">
                <p className="text-2xl text-pink-600 font-bold">
                  ¡Me has hecho la persona más feliz! 💖
                </p>
              </div>
            )}
            {answer === 'no' && (
              <p className="text-xl text-gray-600">
                Entiendo... Pero siempre estaré aquí para ti 💝
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;