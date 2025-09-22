import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { error } from 'console';
import { toast } from '@/components/ui/use-toast';


export function AIVoiceButton() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleVoiceToggle = async () => {
  if (isProcessing) return;

  setIsListening(true);
  setIsProcessing(true);

  let mediaRecorder;
  const audioChunks = [];

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      try {
        const recordedBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', recordedBlob, 'recording.webm');

        const response = await fetch('http://localhost:5000/api/voicechatbot', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Server error: ${response.status} - ${errorData.error}`);
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('audio/mpeg')) {
          const responseBlob = await response.blob();
          const audioUrl = URL.createObjectURL(responseBlob);
          const audio = new Audio(audioUrl);
          await audio.play();
          audio.onended = () => URL.revokeObjectURL(audioUrl);

          toast({ title: "Success", description: "Voice command processed!", duration: 3000 });

        } else if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log("Recognized text:", data.recognized_text);

          toast({ title: "Info", description: `Recognized: ${data.recognized_text}`, duration: 3000 });
        } else {
          throw new Error("Unexpected response content type");
        }

      } catch (error) {
        console.error("Error processing voice command:", error);
        toast({ title: "Error", description: error.message, variant: "destructive", duration: 5000 });
      } finally {
        setIsProcessing(false);
        setIsListening(false);
      }
    };

    mediaRecorder.start();

    setTimeout(() => {
      mediaRecorder.stop();
      stream.getTracks().forEach(track => track.stop());
    }, 5000);

  } catch (error) {
    console.error(error);
    toast({ title: "Error", description: "Microphone access denied", variant: "destructive", duration: 3000 });
    setIsListening(false);
    setIsProcessing(false);
  }
}; // <- bu sətir lazımdır, handleVoiceToggle funksiyasını bağlayır


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
