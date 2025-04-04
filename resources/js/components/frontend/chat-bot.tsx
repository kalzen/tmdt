import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  html?: boolean;
}

interface ChatSession {
  sessionId: string;
  messages: Message[];
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session
  useEffect(() => {
    // Try to load existing session from localStorage
    const savedSession = localStorage.getItem('84Gate_chat_session');
    
    if (savedSession) {
      try {
        const session: ChatSession = JSON.parse(savedSession);
        // Convert string timestamps back to Date objects
        const messagesWithDates = session.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        
        setSessionId(session.sessionId);
        setMessages(messagesWithDates);
        
        // Don't show suggestions if we have a previous conversation
        if (messagesWithDates.length > 1) {
          setShowSuggestions(false);
        }
      } catch (e) {
        console.error('Error parsing saved chat session:', e);
        initializeNewSession();
      }
    } else {
      initializeNewSession();
    }
  }, []);

  // Initialize a new chat session
  const initializeNewSession = () => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    
    const initialMessage: Message = {
      id: '1',
      content: 'Hello! I am the virtual assistant for 84Gate Marketplace. How can I help you today?',
      isBot: true,
      timestamp: new Date(),
    };
    
    setMessages([initialMessage]);
    setShowSuggestions(true);
    
    // Default suggested questions
    setSuggestedQuestions([
      'How do I place an order?',
      'What payment methods do you accept?',
      'How long does shipping take?',
      'What is your return policy?',
      'How can I track my order?',
      'Do you ship internationally?',
    ]);
  };

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (sessionId && messages.length > 0) {
      const session: ChatSession = {
        sessionId,
        messages,
      };
      localStorage.setItem('84Gate_chat_session', JSON.stringify(session));
    }
  }, [sessionId, messages]);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (message = inputValue) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isBot: false,
      timestamp: new Date(),
    };

    const userInput = message;
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      // Call the API through our backend
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({ 
          message: userInput,
          session_id: sessionId
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Add bot response
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message,
          isBot: true,
          timestamp: new Date(),
          html: true, // Allow HTML in bot responses for links
        };
        
        setMessages((prev) => [...prev, botResponse]);
        
        // Update session ID if provided
        if (data.session_id) {
          setSessionId(data.session_id);
        }
        
        // Update suggested questions if provided
        if (data.suggested_questions && data.suggested_questions.length > 0) {
          setSuggestedQuestions(data.suggested_questions);
        }
      } else {
        // Handle error
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          isBot: true,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, errorResponse]);
        console.error('Chat bot error:', data.error);
      }
    } catch (error) {
      // Handle network or other errors
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorResponse]);
      console.error('Chat bot error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle clicking a suggested question
  const handleSuggestedQuestion = (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowSuggestions(false);

    // Send the question to the backend to get the predefined answer
    fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
      body: JSON.stringify({ 
        message: question,
        session_id: sessionId
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Add bot response
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message,
          isBot: true,
          timestamp: new Date(),
          html: true, // Allow HTML in bot responses for links
        };
        
        setMessages((prev) => [...prev, botResponse]);
        
        // Update session ID if provided
        if (data.session_id) {
          setSessionId(data.session_id);
        }
      }
    })
    .catch(error => {
      console.error('Error fetching predefined answer:', error);
      
      // Add error response
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorResponse]);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button (visible when chat is closed) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="rounded-full h-14 w-14 shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Chat panel */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-[400px] p-0 flex flex-col h-[600px] sm:h-[70vh] max-h-[700px] fixed bottom-6 right-6 rounded-lg shadow-xl border">
          <SheetHeader className="border-b p-4 flex flex-row items-center justify-between">
            <SheetTitle className="text-left">84Gate Chat Bot</SheetTitle>
           
          </SheetHeader>
          
          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <Card
                  className={`max-w-[80%] p-3 ${
                    message.isBot
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {message.html ? (
                    <p 
                      className="text-sm" 
                      dangerouslySetInnerHTML={{ __html: message.content }}
                    ></p>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </Card>
              </div>
            ))}
            
            {/* Suggested questions */}
            {showSuggestions && messages.length === 1 && suggestedQuestions.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">You can ask me about:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <Card className="max-w-[80%] p-3 bg-muted">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="border-t p-4 flex items-center gap-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button size="icon" onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
