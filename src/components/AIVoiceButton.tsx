import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIVoiceButton() {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice functionality would be implemented here
    if (!isListening) {
      console.log('Starting voice recognition...');
    } else {
      console.log('Stopping voice recognition...');
    }
  };

  return (
    <div className="fixed bottom-20 left-4 z-50 md:bottom-6">
      <Button
        onClick={handleVoiceToggle}
        className={cn(
          "w-14 h-14 rounded-full shadow-payment-glow transition-all duration-300",
          isListening 
            ? "bg-red-500 hover:bg-red-600 animate-pulse" 
            : "bg-payment-gradient hover:scale-110"
        )}
      >
        {isListening ? (
          <MicOff className="w-6 h-6 text-white" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}
      </Button>
      
      {isListening && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">
          Listening...
        </div>
      )}
    </div>
  );
}