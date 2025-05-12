'use client';
import { useEffect, useRef, useState } from 'react';
import { MessageSquare } from 'lucide-react';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('nia');
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);
  const chatEndRef = useRef(null);

  const [chatData, setChatData] = useState({
    nia: [
      { from: 'guest', text: '👋 Halo, saya tertarik untuk nego tanggal!' },
      { from: 'host', text: 'Baik kak, untuk tanggal berapa ya?' },
    ],
    joko: [
      { from: 'guest', text: 'Halo, properti ini masih tersedia minggu depan?' },
      { from: 'host', text: 'Masih kak, bisa booking sekarang ya.' },
    ],
    kevin: [
      { from: 'guest', text: 'Ada diskon untuk sewa 2 minggu nggak kak?' },
      { from: 'host', text: 'Bisa nego ya kak, chat aja di sini.' },
    ],
  });

  const guests = [
    { id: 'nia', name: 'Nia', color: 'bg-pink-400' },
    { id: 'joko', name: 'Joko', color: 'bg-green-400' },
    { id: 'kevin', name: 'Kevin', color: 'bg-blue-400' },
  ];

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setChatData((prev) => ({
      ...prev,
      [selectedUser]: [...prev[selectedUser], { from: 'host', text: newMessage }],
    }));
    setNewMessage('');
    setIsTyping(false);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatData, selectedUser, isTyping]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: ' #00B5E2' }}
        className="fixed bottom-6 right-6 text-white p-3 rounded-full shadow-lg z-50 hover:brightness-110 transition duration-200"
        aria-label="Buka chat"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[360px] h-[500px] bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-300 z-50 flex">
          {/* Sidebar Kontak */}
          <div className="w-16 bg-gray-100 flex flex-col items-center py-4 gap-4 border-r rounded-tl-2xl rounded-bl-2xl">
            {guests.map((guest) => (
              <button
                key={guest.id}
                onClick={() => setSelectedUser(guest.id)}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-sm ${
                  guest.color
                } ${selectedUser === guest.id ? 'ring-2 ring-blue-600' : ''}`}
              >
                {guest.name[0]}
              </button>
            ))}
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-[#00B5E2] text-white px-4 py-3 font-semibold flex justify-between items-center rounded-tr-2xl">
              <span>{guests.find((g) => g.id === selectedUser)?.name}</span>
              <button onClick={() => setIsOpen(false)} className="text-white font-bold text-lg">×</button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700 flex flex-col-reverse space-y-reverse space-y-2">
              <div ref={chatEndRef} />
              {isTyping && (
                <div className="self-end flex gap-1 px-3 py-2">
                  <span className="w-2 h-2 bg-[#00B5E2] rounded-full animate-bounce [animation-delay:.1s]"></span>
                  <span className="w-2 h-2 bg-[#00B5E2] rounded-full animate-bounce [animation-delay:.2s]"></span>
                  <span className="w-2 h-2 bg-[#00B5E2] rounded-full animate-bounce [animation-delay:.3s]"></span>
                </div>
              )}
              {[...chatData[selectedUser]]?.reverse().map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 max-w-[80%] whitespace-pre-line ${
                    msg.from === 'guest'
                      ? 'bg-gray-100 text-left self-start rounded-xl rounded-bl-none'
                      : 'bg-blue-100 text-right self-end rounded-xl rounded-br-none'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input Chat */}
            <div className="p-3 border-t flex gap-2">
              <textarea
                rows={1}
                placeholder="Ketik pesan..."
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);
                  setIsTyping(true);
                  if (typingTimeout.current) clearTimeout(typingTimeout.current);
                  typingTimeout.current = setTimeout(() => setIsTyping(false), 1500);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 px-3 py-2 border rounded-lg text-sm resize-none"
              />
              <button
                onClick={handleSend}
                style={{ backgroundColor: ' #00B5E2 ' }}
                className="text-white px-4 py-2 rounded-lg text-sm hover:brightness-110 transition duration-200"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
