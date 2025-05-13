'use client';
import {useEffect, useRef, useState} from 'react';
import {MessageSquare, Send} from 'lucide-react'; // Ubah import, tambahkan Send
import {motion, AnimatePresence} from 'framer-motion'; // Tambahkan import ini

export default function FloatingChat({userType = 'host', pendingMessage, setPendingMessage}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);
  const chatEndRef = useRef(null);

  // Data untuk guest (user sebagai penyewa, host sebagai pemilik)
  const guestContacts = [
    {id: 'host1', name: 'Nia (Host)', color: 'bg-blue-500'},
    {id: 'host2', name: 'Joko (Host)', color: 'bg-green-500'},
    {id: 'host3', name: 'Kevin (Host)', color: 'bg-pink-500'},
  ];
  const guestChatData = {
    // host1: [
    //   {from: 'guest', text: 'Halo kak, saya mau tanya soal ketersediaan properti ini.'},
    //   {from: 'host', text: 'Hai! Properti masih tersedia, kak. Ada yang ingin ditanyakan?'},
    // ],
    host2: [
      {from: 'guest', text: 'Apakah bisa sewa untuk 10 hari?'},
      {from: 'host', text: 'Bisa kak, silakan info tanggalnya ya.'},
    ],
    host3: [
      {from: 'guest', text: 'Ada diskon untuk sewa 2 minggu?'},
      {from: 'host', text: 'Bisa kak, nanti saya kasih penawaran spesial.'},
    ],
  };

  // Data untuk host
  const hostContacts = [
    {id: 'nia', name: 'Nia', color: 'bg-pink-400'},
    {id: 'joko', name: 'Joko', color: 'bg-green-400'},
    {id: 'kevin', name: 'Kevin', color: 'bg-blue-400'},
  ];
  const hostChatData = {
    nia: [
      {from: 'guest', text: '👋 Halo, saya tertarik untuk nego tanggal!'},
      {from: 'host', text: 'Baik kak, untuk tanggal berapa ya?'},
    ],
    joko: [
      {from: 'guest', text: 'Halo, properti ini masih tersedia minggu depan?'},
      {from: 'host', text: 'Masih kak, bisa booking sekarang ya.'},
    ],
    kevin: [
      {from: 'guest', text: 'Ada diskon untuk sewa 2 minggu nggak kak?'},
      {from: 'host', text: 'Bisa nego ya kak, chat aja di sini.'},
    ],
  };

  // Pilih data sesuai userType
  const contacts = userType === 'guest' ? guestContacts : hostContacts;
  const initialChatData = userType === 'guest' ? guestChatData : hostChatData;

  // Inisialisasi kontak pertama
  useEffect(() => {
    if (contacts.length > 0 && !selectedUser) {
      setSelectedUser(contacts[0].id);
    }
    // eslint-disable-next-line
  }, [userType]);

  // State chat per kontak
  const [chatData, setChatData] = useState(initialChatData);

  // Reset chatData jika userType berubah
  useEffect(() => {
    setChatData(initialChatData);
    setSelectedUser(contacts[0]?.id || '');
    // eslint-disable-next-line
  }, [userType]);

  // Buka chat & isi pesan jika ada pendingMessage
  useEffect(() => {
    if (pendingMessage) {
      setIsOpen(true);
      setNewMessage(pendingMessage);
      if (setPendingMessage) setPendingMessage(null);
    }
    // eslint-disable-next-line
  }, [pendingMessage]);

  const handleSend = () => {
    if (!newMessage.trim() || !selectedUser) return;
    setChatData((prev) => ({
      ...prev,
      [selectedUser]: [...(prev[selectedUser] || []), {from: userType, text: newMessage}],
    }));
    // Simulasi balasan host jika guest mengirim pesan tertentu
    if (userType === 'guest' && newMessage.trim().toLowerCase().includes('durasi lain')) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setChatData((prev) => ({
            ...prev,
            [selectedUser]: [...(prev[selectedUser] || []), {from: 'host', text: 'Ingin durasi berapa lama kak?'}],
          }));
          setIsTyping(false);
        }, 2000); // 2 detik animasi typing
      }, 300); // jeda kecil agar bubble guest muncul dulu
    }
    setNewMessage('');
    setIsTyping(false);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [chatData, selectedUser, isTyping]);

  return (
    <>
      {/* Overlay: klik di luar chat untuk menutup */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="chat-overlay"
              initial={{opacity: 0}}
              animate={{opacity: 0.2}}
              exit={{opacity: 0}}
              transition={{duration: 0.13}}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup chat"
              style={{cursor: 'pointer'}}
            />
            <motion.div
              key="chat-widget"
              initial={{opacity: 0, y: 40, scale: 0.95}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={{opacity: 0, y: 40, scale: 0.95}}
              transition={{duration: 0.13, ease: 'easeOut'}}
              className="fixed bottom-20 right-6 w-[360px] h-[500px] bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-300 z-50 flex"
              onClick={(e) => e.stopPropagation()} // Supaya klik di dalam chat tidak menutup
            >
              {/* Sidebar Kontak */}
              <div className="w-16 bg-gray-100 flex flex-col items-center py-4 gap-4 border-r rounded-tl-2xl rounded-bl-2xl">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedUser(contact.id)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-sm ${contact.color} ${
                      selectedUser === contact.id ? 'ring-2 ring-blue-600' : ''
                    } cursor-pointer`}
                    aria-label={`Pilih chat dengan ${contact.name}`}
                    type="button"
                  >
                    {contact.name[0]}
                  </button>
                ))}
              </div>

              {/* Main Chat Area */}
              <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="bg-[#00B5E2] text-white px-4 py-3 font-semibold flex justify-between items-center rounded-tr-2xl">
                  <span>{contacts.find((c) => c.id === selectedUser)?.name}</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition cursor-pointer group"
                    aria-label="Tutup chat"
                    type="button"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="text-white group-hover:text-red-200 transition"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 6L14 14M14 6L6 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Chat Content */}
                <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700 flex flex-col-reverse space-y-reverse space-y-2">
                  <div ref={chatEndRef} />
                  {isTyping &&
                    // Jika userType adalah 'guest', maka yang sedang mengetik adalah host (kiri, abu-abu)
                    // Jika userType adalah 'host', maka yang sedang mengetik adalah guest (kanan, biru)
                    (userType === 'guest' ? (
                      // Host sedang mengetik (tampilkan di kiri dengan warna abu-abu)
                      <div className="self-start flex gap-1 px-3 py-2 items-end">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm shadow">
                          {contacts.find((c) => c.id === selectedUser)?.name[0] || 'H'}
                        </div>
                        <div className="flex items-center bg-gray-200 rounded-2xl px-3 py-2">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:.1s]"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:.2s]"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:.3s]"></span>
                        </div>
                      </div>
                    ) : (
                      // Guest sedang mengetik (tampilkan di kanan dengan warna biru)
                      <div className="self-end flex gap-1 px-3 py-2 items-end">
                        <div className="flex items-center bg-blue-500 rounded-2xl px-3 py-2">
                          <span className="w-2 h-2 bg-blue-200 rounded-full animate-bounce [animation-delay:.1s]"></span>
                          <span className="w-2 h-2 bg-blue-200 rounded-full animate-bounce [animation-delay:.2s]"></span>
                          <span className="w-2 h-2 bg-blue-200 rounded-full animate-bounce [animation-delay:.3s]"></span>
                        </div>
                      </div>
                    ))}
                  {[...(chatData[selectedUser] || [])]?.reverse().map((msg, index, arr) => {
                    const now = new Date();
                    const time = msg.time
                      ? msg.time
                      : `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                    const isSelf = msg.from === userType;
                    const isLast = index === 0;
                    return (
                      <div
                        key={index}
                        className={`flex items-end gap-2 mb-2 ${isSelf ? 'justify-end' : 'justify-start'}`}
                      >
                        {/* Avatar untuk lawan bicara */}
                        {!isSelf && (
                          <div
                            className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-sm shadow cursor-pointer"
                            title={contacts.find((c) => c.id === selectedUser)?.name || 'User'}
                          >
                            {contacts.find((c) => c.id === selectedUser)?.name[0] || 'H'}
                          </div>
                        )}
                        <motion.div
                          initial={{opacity: 0, y: 10}}
                          animate={{opacity: 1, y: 0}}
                          transition={{duration: 0.18}}
                          className={`
                            relative px-4 py-2 break-words whitespace-pre-line
                            ${
                              isSelf
                                ? 'bg-blue-500 text-white self-end rounded-2xl rounded-br-md shadow border border-blue-400 mr-0'
                                : 'bg-white text-gray-800 self-start rounded-2xl rounded-bl-md border border-gray-200 ml-0'
                            }
                            ${isLast ? 'ring-2 ring-primary/30' : ''}
                          `}
                          style={{
                            maxWidth: isSelf
                              ? 'calc(100% - 8px)' // biar benar-benar nempel kanan, tanpa margin
                              : 'calc(100% - 56px)', // 56px = sidebar kontak
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                          }}
                        >
                          {msg.text}
                          <span className={`block text-xs mt-1 ${isSelf ? 'text-blue-100' : 'text-gray-400'} text-right`}>{time}</span>
                        </motion.div>
                        {/* Spacer untuk bubble user */}
                        {/* Hapus <div className="w-8" /> agar bubble biru nempel ke kanan */}
                      </div>
                    );
                  })}
                </div>

                {/* Input Chat */}
                <div className="p-3 border-t flex gap-2 items-end">
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
                    className="flex-1 px-3 py-2 border rounded-lg text-sm resize-none max-h-32 min-h-[40px] overflow-auto"
                    style={{height: 'auto'}}
                    ref={(el) => {
                      // Auto expand textarea height
                      if (el) {
                        el.style.height = 'auto';
                        el.style.height = el.scrollHeight + 'px';
                      }
                    }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                    style={{
                      backgroundImage: newMessage.trim() ? 'linear-gradient(to right, #00B5E2, rgb(5, 126, 156))' : 'none',
                      backgroundColor: !newMessage.trim() ? '#d1d5db' : undefined,
                      cursor: !newMessage.trim() ? 'not-allowed' : 'pointer',
                    }}
                    className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg transition duration-200
                      ${newMessage.trim() ? 'hover:brightness-110 text-white' : 'opacity-60 text-white'}
                    `}
                    aria-label="Kirim pesan"
                    type="button"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Floating Button */}
      <button
        id="floating-chat-btn"
        onClick={() => setIsOpen(!isOpen)}
        style={{background: ' #00B5E2'}}
        className="fixed bottom-6 right-6 text-white p-3 rounded-full shadow-lg z-50 hover:brightness-110 transition duration-200 cursor-pointer"
        aria-label="Buka chat"
        type="button"
      >
        <MessageSquare size={24} />
      </button>
    </>
  );
}
