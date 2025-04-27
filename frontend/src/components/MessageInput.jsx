import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Smile, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage, isSendingMessage } = useChatStore();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione apenas arquivos de imagem");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Não foi possível enviar a mensagem");
    }
  };

  return (
    <div className="p-4 w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700
              flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              type="button"
              aria-label="Remover imagem"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            className={`w-full py-2.5 px-4 rounded-full bg-gray-100 dark:bg-gray-800 border ${
              isFocused 
                ? "border-primary ring-2 ring-primary/20" 
                : "border-gray-200 dark:border-gray-700"
            } focus:outline-none transition-all`}
            placeholder="Digite sua mensagem..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              type="button"
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Adicionar imagem"
            >
              <Image className="w-5 h-5" />
            </button>
            
          </div>
        </div>
        
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
          aria-label="Upload de imagem"
        />

        <button
          type="submit"
          className={`p-2.5 rounded-full flex items-center justify-center ${
            text.trim() || imagePreview
              ? "bg-primary text-white hover:bg-primary-focus" 
              : "bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600"
          } transition-colors`}
          disabled={isSendingMessage && !text.trim() && !imagePreview}
          
        >
          {isSendingMessage ? (
            "..." 
          ): (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;