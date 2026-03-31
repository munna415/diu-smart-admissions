import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Bot } from 'lucide-react';

const Hero = ({ setIsChatOpen }) => {
  // সার্চ ইনপুটের জন্য স্টেট তৈরি করা হলো
  const [searchQuery, setSearchQuery] = useState('');

  // সার্চ বাটনে বা এন্টার চাপলে এই ফাংশনটি কাজ করবে
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      // গুগলের মাধ্যমে ড্যাফোডিল ভার্সিটির সাইটে সার্চ করা হবে
      window.open(`https://www.google.com/search?q=daffodilunivarsity+${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white pt-20 pb-32 overflow-hidden">
      
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight"
          >
            Simplify Your <span className="text-primary">DIU Admission</span> Journey
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10"
          >
            Get instant answers, explore programs, and apply smartly with our AI-powered admission assistant. Type your query or ask the bot directly!
          </motion.p>

          {/* Smart Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative max-w-2xl mx-auto mb-10"
          >
            {/* এখানে div এর বদলে form ব্যবহার করা হয়েছে এবং onSubmit যুক্ত করা হয়েছে */}
            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all duration-300 hover:shadow-xl">
              <div className="pl-6 text-gray-400">
                <Search size={24} />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // ইনপুট ভ্যালু স্টেটে সেভ হচ্ছে
                placeholder="Ex: CSE তে ভর্তি হতে কি লাগে? বা টিউশন ফি কত?" 
                className="w-full px-4 py-4 text-gray-700 outline-none bg-transparent text-lg"
              />
              <button type="submit" className="bg-primary hover:bg-blue-700 text-white px-8 py-4 font-semibold transition-colors duration-300 whitespace-nowrap">
                Search
              </button>
            </form>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => setIsChatOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-secondary hover:bg-green-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-md transform hover:scale-105"
            >
              <Bot size={20} />
              Chat with AI Bot
            </button>
            
            <a href="https://daffodilvarsity.edu.bd/programs" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-primary border-2 border-primary hover:bg-blue-50 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-sm">
              Explore Programs
              <ArrowRight size={20} />
            </a>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;