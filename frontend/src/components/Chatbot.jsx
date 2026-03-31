import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User, Sparkles, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Chatbot = ({ isChatOpen, setIsChatOpen }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'হ্যালো! আমি DIU Smart Assistant 🤖। ড্যাফোডিল ইউনিভার্সিটির ভর্তি, ফি, বা অন্য যেকোনো বিষয়ে আমাকে প্রশ্ন করতে পারেন।' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // লোকাল হোস্টের বদলে রেন্ডারের লাইভ লিংক ব্যবহার করা হয়েছে
      const response = await fetch('https://diu-smart-admissions.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { sender: 'bot', text: "দুঃখিত, কানেকশনে সমস্যা হচ্ছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsChatOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-secondary hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${isChatOpen ? 'hidden' : 'flex'}`}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bot size={32} />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">AI</span>
      </motion.button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 ${
              isMaximized 
                ? 'w-[95vw] sm:w-[80vw] md:w-[700px] lg:w-[800px] h-[85vh]' 
                : 'w-[92vw] sm:w-[450px] md:w-[480px] h-[600px] max-h-[85vh]'
            }`}
          >
            {/* Header */}
            <div className="bg-primary p-4 md:p-5 text-white flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full text-primary shadow-sm"><Bot size={26} /></div>
                <div>
                  <h3 className="font-bold text-lg md:text-xl leading-tight">DIU AI Bot</h3>
                  <p className="text-xs text-blue-200 flex items-center gap-1 mt-0.5"><Sparkles size={12} /> Live Support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="hover:bg-blue-700 p-2 rounded-full transition-colors hidden sm:block"
                  title={isMaximized ? "Minimize" : "Maximize"}
                >
                  {isMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>

                <button 
                  onClick={() => setIsChatOpen(false)} 
                  className="hover:bg-blue-700 p-2 rounded-full transition-colors"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 md:p-5 overflow-y-auto bg-gray-50 flex flex-col gap-5">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2.5 max-w-[90%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                  <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-blue-100 text-primary' : 'bg-green-100 text-secondary'}`}>
                    {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                  </div>
                  <div className={`p-3.5 md:p-4 rounded-2xl text-[15px] shadow-sm leading-relaxed ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'}`}>
                    
                    {msg.sender === 'user' ? (
                      msg.text
                    ) : (
                      <div className="text-gray-800 break-words prose max-w-none prose-sm sm:prose-base">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc ml-5 mb-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal ml-5 mb-2" {...props} />,
                            h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-2 text-primary" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-2 text-primary" {...props} />,
                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-secondary pl-3 italic my-2 bg-green-50 p-2 text-gray-700 rounded-r-md" {...props} />,
                            table: ({node, ...props}) => <div className="overflow-x-auto my-4 rounded-lg border border-gray-300 shadow-sm"><table className="min-w-full divide-y divide-gray-200 border-collapse" {...props} /></div>,
                            thead: ({node, ...props}) => <thead className="bg-gray-100" {...props} />,
                            th: ({node, ...props}) => <th className="px-3 py-2 text-left text-xs font-bold text-gray-700 uppercase border" {...props} />,
                            td: ({node, ...props}) => <td className="px-3 py-2 text-sm border bg-white" {...props} />,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-500 text-sm ml-12 italic">
                  <Loader2 size={16} className="animate-spin" /> DIU Bot চিন্তা করছে...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 md:p-4 bg-white border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="DIU সম্পর্কে কিছু জিজ্ঞাসা করুন..."
                className="flex-1 px-5 py-3.5 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-[15px]"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="bg-secondary hover:bg-green-600 disabled:bg-gray-300 text-white p-3.5 rounded-full transition-colors shadow-sm"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;