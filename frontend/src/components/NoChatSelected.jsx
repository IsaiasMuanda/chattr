import { MessageCircleHeart, MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageCircleHeart className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Bem-vindo ao Chattr!</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Selecione uma conversa para começar a trocar mensagens
        </p>
        
        {/* Tips Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">Dicas rápidas:</h3>
          <div className="grid grid-cols-1 gap-4 text-left text-sm">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-medium">1</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Selecione um contato na barra lateral para iniciar uma conversa
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-medium">2</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Use o filtro para ver apenas contatos online
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-medium">3</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Envie mensagens, imagens e muito mais em tempo real
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;