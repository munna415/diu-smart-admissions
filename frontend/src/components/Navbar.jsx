import { useState } from 'react';
import { Menu, X, Bot, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ setIsChatOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const navItems = [
    { name: "Home", link: "https://daffodilvarsity.edu.bd/" },
    {
      name: "Admission",
      dropdown: [
        { name: "Admission", link: "https://daffodilvarsity.edu.bd/admission" },
        { name: "Admission Test Result", link: "https://daffodilvarsity.edu.bd/admission-test-result" },
        { name: "Apply Online", link: "https://admission.daffodilvarsity.edu.bd/" },
        { name: "Admission Contact", link: "https://daffodilvarsity.edu.bd/admission-contact" },
        { name: "Admission Process", link: "https://webbackend.daffodilvarsity.edu.bd/photos/pdf/Admission-Flow-Chart19.pdf" },
      ]
    },
    {
      name: "Campus",
      dropdown: [
        { name: "Campus life", link: "https://daffodilvarsity.edu.bd/campus-life" },
        { name: "Virtual Tour", link: "https://annisulhuq.daffodil.university/vt/" },
        { name: "Student Activities", link: "https://daffodilvarsity.edu.bd/article/student-activities" },
        { name: "Event", link: "https://daffodilvarsity.edu.bd/events" },
      ]
    },
    { name: "International", link: "https://daffodilvarsity.edu.bd/international/international" },
    { name: "Rankings", link: "https://daffodilvarsity.edu.bd/rankings" },
    { name: "Fee Calculator", link: "https://daffodilvarsity.edu.bd/tuition-fee-calculator" },
    { name: "Scholarship", link: "https://daffodilvarsity.edu.bd/scholarship/diu-scholarship" },
  ];

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="w-full px-4 lg:px-8 max-w-[100rem] mx-auto">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo and Title Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer flex-shrink-0"
          >
            {/* Daffodil Logo with white background for visibility */}
            <div className="bg-white px-2 py-1 rounded-md shadow-sm flex items-center justify-center h-10 w-28 md:w-32">
              <img 
                src="https://daffodilvarsity.edu.bd/images/logo.svg" 
                alt="DIU Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            
            {/* Project Title */}
            <div>
              <h1 className="text-[17px] md:text-xl lg:text-[22px] font-bold tracking-wide">DIU Smart Admissions</h1>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden lg:flex items-center justify-end space-x-3 xl:space-x-5 text-[13px] xl:text-sm font-medium w-full ml-4"
          >
            {navItems.map((item, index) => (
              <div key={index} className="relative group h-full flex items-center">
                {item.dropdown ? (
                  <div className="flex items-center gap-1 cursor-pointer hover:text-secondary py-8 transition-colors duration-300 whitespace-nowrap">
                    {item.name} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                    
                    <div className="absolute top-[75px] left-0 bg-white text-gray-800 shadow-xl rounded-b-lg w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 border-t-4 border-secondary overflow-hidden">
                      {item.dropdown.map((subItem, subIndex) => (
                        <a 
                          key={subIndex} 
                          href={subItem.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block px-4 py-3 hover:bg-gray-50 hover:text-primary transition-colors border-b border-gray-100 last:border-0 whitespace-normal"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-secondary py-8 transition-colors duration-300 whitespace-nowrap"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
            
            {/* Desktop: AI Bot Button */}
            <button 
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-2 bg-secondary hover:bg-green-600 text-white px-5 py-2 rounded-full font-semibold transition-all duration-300 shadow-md transform hover:scale-105 whitespace-nowrap ml-2"
            >
              <Bot size={18} />
              Ask AI Bot
            </button>
          </motion.div>

          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-secondary focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#004080] overflow-hidden shadow-inner"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.dropdown ? (
                    <>
                      <button 
                        onClick={() => setMobileDropdown(mobileDropdown === index ? null : index)}
                        className="flex items-center justify-between w-full py-3 text-left hover:text-secondary transition-colors font-medium border-b border-blue-800/50"
                      >
                        {item.name}
                        <ChevronDown size={18} className={`transition-transform duration-300 ${mobileDropdown === index ? 'rotate-180 text-secondary' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {mobileDropdown === index && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-blue-900/50 rounded-b-lg overflow-hidden"
                          >
                            {item.dropdown.map((subItem, subIndex) => (
                              <a 
                                key={subIndex} 
                                href={subItem.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block pl-6 pr-4 py-3 text-sm text-gray-200 hover:text-white hover:bg-blue-800/50 border-l-2 border-transparent hover:border-secondary transition-all"
                              >
                                • {subItem.name}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block py-3 hover:text-secondary transition-colors font-medium border-b border-blue-800/50"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
              
              {/* Mobile: AI Bot Button */}
              <button 
                onClick={() => {
                  setIsChatOpen(true);
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full bg-secondary text-white px-6 py-3 rounded-full font-semibold mt-6 shadow-md"
              >
                <Bot size={20} />
                Ask AI Bot
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;