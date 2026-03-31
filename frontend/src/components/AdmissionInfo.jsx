import { motion } from 'framer-motion';
import { BookOpen, CreditCard, Calendar, Award, ArrowRight } from 'lucide-react';

const AdmissionInfo = () => {
  const infoCards = [
    {
      id: 1,
      title: "Programs & Departments",
      description: "Explore our undergraduate and graduate programs tailored for the future.",
      icon: <BookOpen size={32} className="text-primary" />,
      color: "bg-blue-50",
      borderColor: "border-blue-100",
      link: "https://daffodilvarsity.edu.bd/programs"
    },
    {
      id: 2,
      title: "Tuition Fees & Cost",
      description: "Detailed breakdown of semester fees, lab costs, and payment methods.",
      icon: <CreditCard size={32} className="text-secondary" />,
      color: "bg-green-50",
      borderColor: "border-green-100",
      link: "https://daffodilvarsity.edu.bd/tuition-fee-calculator"
    },
    {
      id: 3,
      title: "Admission Deadlines",
      description: "Stay updated with the latest admission dates, exam schedules, and results.",
      icon: <Calendar size={32} className="text-orange-500" />,
      color: "bg-orange-50",
      borderColor: "border-orange-100",
      link: "https://daffodilvarsity.edu.bd/admission"
    },
    {
      id: 4,
      title: "Scholarships & Waivers",
      description: "Get up to 100% merit-based scholarships and special waivers for students.",
      icon: <Award size={32} className="text-purple-500" />,
      color: "bg-purple-50",
      borderColor: "border-purple-100",
      link: "https://daffodilvarsity.edu.bd/scholarship/diu-scholarship"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Essential <span className="text-primary">Admission</span> Information
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Everything you need to know about joining Daffodil International University is right here.
          </motion.p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {infoCards.map((card, index) => (
            <motion.a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`block p-6 xl:p-8 rounded-2xl border ${card.borderColor} ${card.color} hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md group`}
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-600 mb-6 text-sm xl:text-base">{card.description}</p>
              
              <div className="flex items-center gap-2 text-primary font-semibold group-hover:text-blue-700 transition-colors">
                Learn More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdmissionInfo;