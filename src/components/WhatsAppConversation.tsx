import { Check, CheckCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  time: string;
  read?: boolean;
}

const conversations: Message[] = [
  { id: 1, text: "Hi! I'd like to order a burger", isBot: false, time: "2:30 PM" },
  { id: 2, text: "Hello! 🍔 I'd be happy to help you order. We have:\n\n1. Classic Burger - $12.99\n2. Cheese Burger - $13.99\n3. Bacon Burger - $14.99\n\nWhich one would you like?", isBot: true, time: "2:30 PM", read: true },
  { id: 3, text: "I'll take the Classic Burger please", isBot: false, time: "2:31 PM" },
  { id: 4, text: "Great choice! 😊\n\nYour order:\n🍔 Classic Burger - $12.99\n\nWould you like to:\n1. Add more items\n2. Proceed to checkout\n3. View full menu", isBot: true, time: "2:31 PM", read: true },
  { id: 5, text: "Proceed to checkout", isBot: false, time: "2:32 PM" },
  { id: 6, text: "Perfect! Your order is confirmed! ✅\n\nOrder #1234\nTotal: $12.99\nEstimated delivery: 25-30 mins\n\nYou'll receive updates on your order status. Thank you for choosing RestoBot! 🎉", isBot: true, time: "2:32 PM", read: true },
];

export function WhatsAppConversation() {
  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-[#e5ddd5] rounded-xl overflow-hidden shadow-2xl border-0">
        {/* WhatsApp Header */}
        <div className="bg-[#075e54] text-white px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl">
            🤖
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">RestoBot</h3>
            <p className="text-xs text-green-200">Online</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-[#e5ddd5] p-4 space-y-2 min-h-[500px] max-h-[600px] overflow-y-auto"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23d9d9d9\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M0 0h100v100H0z\'/%3E%3Cpath d=\'M50 0L0 50 50 100l50-50z\'/%3E%3C/g%3E%3C/svg%3E")',
          }}
        >
          {conversations.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-3 py-2 shadow-sm ${
                  message.isBot
                    ? 'bg-white'
                    : 'bg-[#dcf8c6]'
                }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed text-gray-800">
                  {message.text}
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-gray-500">{message.time}</span>
                  {!message.isBot && (
                    <span className="text-blue-500">
                      {message.read ? (
                        <CheckCheck className="h-3 w-3" />
                      ) : (
                        <Check className="h-3 w-3" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-[#f0f0f0] px-4 py-2 flex items-center gap-2 border-t border-gray-300">
          <div className="flex-1 bg-white rounded-full px-4 py-2">
            <p className="text-sm text-gray-400">Type a message...</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#075e54] flex items-center justify-center text-white">
            <span className="text-xl">🎤</span>
          </button>
        </div>
      </Card>
    </div>
  );
}

export function WhatsAppConversation2() {
  const tableReservation: Message[] = [
    { id: 1, text: "Can I book a table for 4 people tonight?", isBot: false, time: "7:15 PM" },
    { id: 2, text: "Of course! 🍽️ I can help with that.\n\nWhat time would you prefer?\n\nAvailable slots:\n• 7:00 PM\n• 7:30 PM\n• 8:00 PM\n• 8:30 PM", isBot: true, time: "7:15 PM", read: true },
    { id: 3, text: "8:00 PM works great", isBot: false, time: "7:16 PM" },
    { id: 4, text: "Perfect! ✅\n\nReservation confirmed:\n👥 4 people\n⏰ 8:00 PM\n📅 Tonight\n\nMay I have your name please?", isBot: true, time: "7:16 PM", read: true },
    { id: 5, text: "John Smith", isBot: false, time: "7:17 PM" },
    { id: 6, text: "Thank you, John! 🎉\n\nYour table is reserved!\nReservation #R789\n\nWe look forward to seeing you at 8:00 PM. You'll receive a confirmation SMS shortly.", isBot: true, time: "7:17 PM", read: true },
  ];

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-[#e5ddd5] rounded-xl overflow-hidden shadow-2xl border-0">
        {/* WhatsApp Header */}
        <div className="bg-[#075e54] text-white px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-2xl">
            🤖
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">RestoBot</h3>
            <p className="text-xs text-green-200">Online</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-[#e5ddd5] p-4 space-y-2 min-h-[500px] max-h-[600px] overflow-y-auto"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23d9d9d9\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M0 0h100v100H0z\'/%3E%3Cpath d=\'M50 0L0 50 50 100l50-50z\'/%3E%3C/g%3E%3C/svg%3E")',
          }}
        >
          {tableReservation.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-3 py-2 shadow-sm ${
                  message.isBot
                    ? 'bg-white'
                    : 'bg-[#dcf8c6]'
                }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed text-gray-800">
                  {message.text}
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-gray-500">{message.time}</span>
                  {!message.isBot && (
                    <span className="text-blue-500">
                      {message.read ? (
                        <CheckCheck className="h-3 w-3" />
                      ) : (
                        <Check className="h-3 w-3" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-[#f0f0f0] px-4 py-2 flex items-center gap-2 border-t border-gray-300">
          <div className="flex-1 bg-white rounded-full px-4 py-2">
            <p className="text-sm text-gray-400">Type a message...</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#075e54] flex items-center justify-center text-white">
            <span className="text-xl">🎤</span>
          </button>
        </div>
      </Card>
    </div>
  );
}
