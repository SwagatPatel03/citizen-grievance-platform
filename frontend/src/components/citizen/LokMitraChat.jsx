import {useEffect, useRef, useState} from 'react';
import {MessageSquare, X, Send, Bot, Loader2, Sparkles} from 'lucide-react';
import {askLokMitra} from "../../services/api.jsx";

const LokMitraChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([
        { sender: 'bot', text: 'Namaste! I am LokMitra, your civic assistant. How can I help you today?' }
    ]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userText = message;
        setMessage('');
        setChatHistory(prev => [...prev, { sender: 'user', text: userText }]);
        setIsLoading(true);

        try {
            const response = await askLokMitra(userText);
            setChatHistory(prev => [...prev, { sender: 'bot', text: response.data.reply }]);
        } catch (error) {
            setChatHistory(prev => [...prev, { sender: 'bot', text: 'Sorry, I am having trouble connecting to the network. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <div className="bg-white w-80 sm:w-[400px] rounded-2xl shadow-2xl border border-slate-200 mb-4 overflow-hidden flex flex-col h-[520px] animate-fadeIn">

                    {/* Header */}
                    <div className="bg-slate-900 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600/20 p-2 rounded-xl border border-blue-500/30">
                                <Bot className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold leading-none flex items-center gap-1.5">
                                    LokMitra AI
                                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                                </h3>
                                <span className="text-slate-400 text-xs">Your Civic Assistant</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3">
                        {chatHistory.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${
                                    msg.sender === 'user' 
                                        ? 'bg-blue-600 text-white rounded-br-none' 
                                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-slate-200 text-slate-500 rounded-xl rounded-bl-none shadow-sm p-3 flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                    <span className="text-sm">LokMitra is thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-slate-200">
                        <form onSubmit={handleSend} className="flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isLoading}
                                placeholder="Ask about civic services..."
                                className="flex-1 bg-slate-100 border border-transparent rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all disabled:opacity-50"
                            />
                            <button 
                                type="submit" 
                                disabled={isLoading || !message.trim()} 
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`
                    group relative p-4 rounded-full shadow-lg transition-all duration-200 
                    hover:scale-105 active:scale-95 flex items-center justify-center
                    ${isOpen 
                        ? 'bg-slate-800 hover:bg-slate-700 shadow-slate-900/20' 
                        : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
                    }
                `}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-white" />
                ) : (
                    <>
                        <MessageSquare className="w-6 h-6 text-white" />
                        {/* Ping indicator */}
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
                        </span>
                    </>
                )}
            </button>
        </div>
    );
};

export default LokMitraChat;
