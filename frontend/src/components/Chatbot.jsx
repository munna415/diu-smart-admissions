import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User, Sparkles, Loader2, Maximize2, Minimize2, Menu, Plus, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Chatbot = ({ isChatOpen, setIsChatOpen }) => {
  // ডিফল্ট ওয়েলকাম মেসেজ
  const defaultMessage = { sender: 'bot', text: 'হ্যালো! আমি DIU Smart Assistant 🤖। ড্যাফোডিল ইউনিভার্সিটির ভর্তি, ফি, বা অন্য যেকোনো বিষয়ে আমাকে প্রশ্ন করতে পারেন।' };

  // চ্যাট হিস্ট্রি এবং সেশন স্টেট
  const [sessions, setSessions] = useState([
    { id: Date.now(), title: 'New Chat', date: new Date().toLocaleDateString(), messages: [defaultMessage] }
  ]);
  const [activeSessionId, setActiveSessionId] = useState(sessions[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef(null);

  // বর্তমান অ্যাক্টিভ চ্যাট সেশন বের করা
  const currentSession = sessions.find(s => s.id === activeSessionId) || sessions[0];
  const messages = currentSession.messages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // নতুন চ্যাট শুরু করার ফাংশন
  const startNewChat = () => {
    const newSession = {
      id: Date.now(),
      title: 'New Chat',
      date: new Date().toLocaleDateString(),
      messages: [defaultMessage]
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
    setIsSidebarOpen(false); // মোবাইল বা ডেস্কটপে সাইডবার বন্ধ করে দেওয়া
  };

  // পুরনো চ্যাটে ফিরে যাওয়ার ফাংশন
  const switchChat = (id) => {
    setActiveSessionId(id);
    setIsSidebarOpen(false);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const currentSessionId = activeSessionId; 

    // ইউজার মেসেজ অ্যাড করা এবং প্রথম মেসেজ হলে চ্যাটের টাইটেল চেঞ্জ করা
    setSessions(prev => prev.map(session => {
      if (session.id === currentSessionId) {
        const newMessages = [...session.messages, { sender: 'user', text: userMessage }];
        const title = session.title === 'New Chat' ? userMessage.substring(0, 20) + '...' : session.title;
        return { ...session, title, messages: newMessages };
      }
      return session;
    }));

    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://diu-smart-admissions.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      
      // বটের রিপ্লাই নির্দিষ্ট সেশনে সেভ করা
      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return { ...session, messages: [...session.messages, { sender: 'bot', text: data.reply }] };
        }
        return session;
      }));
    } catch (error) {
      console.error("Error:", error);
      setSessions(prev => prev.map(session => {
        if (session.id === currentSessionId) {
          return { ...session, messages: [...session.messages, { sender: 'bot', text: "দুঃখিত, কানেকশনে সমস্যা হচ্ছে। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।" }] };
        }
        return session;
      }));
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
            // 🌟 மொবাইল ফুল স্ক্রিন এবং ডেস্কটপ ফ্লোটিং ক্লাস 🌟
            className={`fixed z-50 bg-white flex flex-col overflow-hidden shadow-2xl transition-all duration-300
              inset-0 w-full h-full rounded-none sm:border sm:border-gray-200 sm:inset-auto sm:bottom-6 sm:right-6 sm:rounded-2xl
              ${isMaximized 
                ? 'sm:w-[700px] lg:w-[800px] sm:h-[85vh]' 
                : 'sm:w-[450px] md:w-[480px] sm:h-[600px] sm:max-h-[85vh]'
              }
            `}
          >
            {/* Header */}
            <div className="bg-primary p-3 md:p-4 text-white flex justify-between items-center shadow-md z-10 relative">
              <div className="flex items-center gap-3">
                {/* 🌟 মেনু বাটন - হিস্ট্রি দেখার জন্য 🌟 */}
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="hover:bg-blue-700 p-2 rounded-lg transition-colors"
                >
                  <Menu size={24} />
                </button>

                {/* 🌟 ড্যাফোডিল লোগো 🌟 */}
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center p-0.5 overflow-hidden bg-white shadow-sm">
                  <img src="https://daffodilvarsity.edu.bd/images/logo.svg" alt="DIU Logo" className="w-full h-full object-contain" />
                </div>
                
                <div>
                  <h3 className="font-bold text-lg md:text-xl leading-tight">DIU AI Bot</h3>
                  <p className="text-xs text-blue-200 flex items-center gap-1 mt-0.5"><Sparkles size={12} /> Live Support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 md:gap-2">
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

            {/* 🌟 Chat History Sidebar (Drawer) 🌟 */}
            <AnimatePresence>
              {isSidebarOpen && (
                <>
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute inset-0 bg-black z-20"
                  />
                  <motion.div 
                    initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                    transition={{ type: 'tween' }}
                    className="absolute left-0 top-0 bottom-0 w-3/4 sm:w-64 bg-white z-30 flex flex-col shadow-2xl border-r border-gray-200"
                  >
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                      <h2 className="font-bold text-gray-800 text-lg">Chat History</h2>
                      <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-red-500 p-1"><X size={20}/></button>
                    </div>
                    
                    <div className="p-4 border-b border-gray-100">
                      <button 
                        onClick={startNewChat} 
                        className="w-full flex items-center justify-center gap-2 bg-secondary text-white py-2.5 rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm"
                      >
                        <Plus size={18}/> New Chat
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                      {sessions.map(session => (
                        <button 
                          key={session.id} 
                          onClick={() => switchChat(session.id)} 
                          className={`w-full text-left p-3 rounded-xl flex flex-col gap-1 transition-all ${activeSessionId === session.id ? 'bg-blue-50 border border-blue-200 text-primary shadow-sm' : 'hover:bg-gray-100 text-gray-700 border border-transparent'}`}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <MessageSquare size={14} className={activeSessionId === session.id ? 'text-primary' : 'text-gray-400'} />
                            <span className="truncate text-sm font-medium flex-1">{session.title}</span>
                          </div>
                          <span className="text-[10px] text-gray-400 ml-6">{session.date}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            <div className="flex-1 p-4 md:p-5 overflow-y-auto bg-gray-50 flex flex-col gap-5 relative">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2.5 max-w-[90%] sm:max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                  {/* 🌟 মেসেজের আইকন (লোগো বা ইউজার) 🌟 */}
                  <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden ${msg.sender === 'user' ? 'bg-blue-100 text-primary' : 'bg-white border border-gray-200 p-0.5'}`}>
                    {msg.sender === 'user' ? <User size={18} /> : <img src="https://daffodilvarsity.edu.bd/images/logo.svg" alt="DIU Bot" className="w-full h-full object-contain" />}
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
            <form onSubmit={handleSend} className="p-3 md:p-4 bg-white border-t border-gray-200 flex gap-2 pb-6 sm:pb-3">
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