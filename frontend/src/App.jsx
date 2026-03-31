import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdmissionInfo from './components/AdmissionInfo';
import Chatbot from './components/Chatbot';

function App() {
  // চ্যাটবট ওপেন বা ক্লোজ করার মেইন সুইচ
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-primary selection:text-white overflow-x-hidden relative">
      {/* সব জায়গায় সুইচটি পাঠিয়ে দিচ্ছি */}
      <Navbar setIsChatOpen={setIsChatOpen} />
      <Hero setIsChatOpen={setIsChatOpen} />
      <AdmissionInfo />
      
      <Chatbot isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
    </div>
  );
}

export default App;