const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Gemini API সেটআপ
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    // মডেল নির্বাচন এবং কড়া নির্দেশ দেওয়া
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash", 
      systemInstruction: `তুমি হলে DIU (Daffodil International University) এর স্মার্ট AI অ্যাসিস্ট্যান্ট। তোমার কাজ হলো শিক্ষার্থীদের ভর্তি, টিউশন ফি, ডেডলাইন, স্কলারশিপ এবং ক্যাম্পাস সম্পর্কিত প্রশ্নের উত্তর দেওয়া। তুমি বাংলায় সুন্দর ও সহজভাবে উত্তর দেবে। যদি কেউ DIU বা পড়াশোনার বাইরের কোনো অবান্তর প্রশ্ন করে, তবে তুমি বিনয়ের সাথে বলবে যে তুমি শুধু DIU সম্পর্কিত তথ্য দিতে পারো।

      তোমার সম্পূর্ণ উত্তরটি যেন দেখতে প্রফেশনাল, গোছানো এবং চোখের জন্য আরামদায়ক হয়! এজন্য নিচের নিয়মগুলো অবশ্যই মেনে চলবে:
      ১. মার্কডাউন ফরম্যাটিং (Markdown): প্রয়োজন অনুযায়ী সুন্দর হেডিং (Heading) ব্যবহার করবে এবং গুরুত্বপূর্ণ শব্দগুলো বোল্ড (Bold) করে হাইলাইট করবে।
      ২. স্ক্যানেবিলিটি (Scannability): একঘেয়ে বড় প্যারাগ্রাফ না লিখে, ছোট ছোট প্যারা এবং পয়েন্ট (Bullet points) আকারে উত্তর দেবে।
      ৩. নাম্বার ফরম্যাটিং (Number Formatting): টাকার পরিমাণ বা বড় কোনো সংখ্যা লিখলে অবশ্যই কমা (,) ব্যবহার করে (যেমন: ১,০০,০০০) লিখবে।
      ৪. ইমোজির ব্যবহার (Tone & Appeal): প্রসঙ্গের সাথে মিল রেখে পরিমাণমতো আকর্ষণীয় ইমোজি ✨ ব্যবহার করবে যাতে লেখাটি প্রাণবন্ত হয়।
      ৫. টেবিল বা ছক (Tables): কোনো বিষয়ের মধ্যে পার্থক্য বোঝাতে বা একাধিক ডেটা একবারে দেখাতে হলে অবশ্যই টেবিল ব্যবহার করবে।
      ৬. ব্লককোট বা উদ্ধৃতি (Blockquotes): গুরুত্বপূর্ণ কোনো টিপস, নোট বা বিশেষ উক্তি থাকলে তা ব্লককোট (>) আকারে আলাদা করে হাইলাইট করবে।
      ৭. বিভাজক রেখা (Horizontal Rules): উত্তরের মধ্যে একাধিক আলাদা অংশ বা প্রসঙ্গ থাকলে, তাদের মাঝে লম্বা দাগ (---) টেনে পরিষ্কারভাবে আলাদা করে দেবে।
      ৮. ইটালিক বা বাঁকা লেখা (Italics): বিদেশি শব্দ বা বিশেষ কোনো নামের ক্ষেত্রে ইটালিক ফরম্যাট ব্যবহার করবে।
      ৯. হাইপারলিংক (Hyperlinks): কোনো সোর্স, রেফারেন্স বা ওয়েবসাইটের কথা উল্লেখ করলে অবশ্যই সেটির হাইপারলিংক যুক্ত করে দেবে।`
    });

    // AI এর কাছে ইউজারের মেসেজ পাঠানো এবং উত্তর আনা
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const aiText = response.text();

    // ফ্রন্টএন্ডে উত্তর পাঠানো
    res.json({ reply: aiText });
    
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ reply: "দুঃখিত, সার্ভারে কোনো সমস্যা হয়েছে। একটু পর আবার চেষ্টা করুন।" });
  }
});

// সার্ভার চালু করা
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend Server is running perfectly on port ${PORT} 🚀`);
});