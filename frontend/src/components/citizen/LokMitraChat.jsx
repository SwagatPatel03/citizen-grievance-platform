import { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

const LokMitraChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { sender: 'bot', text: 'Namaste! I am LokMitra, your civic assistant. How can I help you today?' }
    ]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Add user message
        const newHistory = [...chatHistory, { sender: 'user', text: message }];
        setChatHistory(newHistory);
        setMessage('');

        // Simulate bot response after a short delay
        setTimeout(() => {
            setChatHistory(prev => [...prev, {
                sender: 'bot',
                text: 'I have noted your query. If you need to report an issue, please use the "New Grievance" tab. For emergencies, use the directory on the right.'
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

            {/* The Chat Window */}
            {isOpen && (
                <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-200 mb-4 overflow-hidden flex flex-col h-[400px] animate-in slide-in-from-bottom-5 duration-300">
                    {/* Chat Header */}
                    <div className="bg-[#000080] p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-white/20 p-1.5 rounded-lg">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold leading-none">LokMitra AI</h3>
                                <span className="text-blue-200 text-xs">Always active</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-blue-200 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3">
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                                    msg.sender === 'user'
                                        ? 'bg-[#046A38] text-white rounded-tr-none'
                                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-3 bg-white border-t border-slate-100">
                        <form onSubmit={handleSend} className="flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your question..."
                                className="flex-1 bg-slate-100 border-transparent rounded-lg px-4 py-2 text-sm focus:bg-white focus:border-[#000080] focus:ring-2 focus:ring-[#000080]/20 outline-none transition-all"
                            />
                            <button
                                type="submit"
                                className="bg-[#000080] hover:bg-blue-900 text-white p-2 rounded-lg transition-colors flex-shrink-0"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* The Floating Action Button (FAB) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-[#000080] hover:bg-blue-900'} text-white p-4 rounded-full shadow-lg shadow-blue-900/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </button>
        </div>
    );
};

export default LokMitraChat;