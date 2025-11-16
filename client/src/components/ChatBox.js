import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../hooks/useSocket';
import { colors } from '../constants/colors';

const ChatBox = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const { emit, on, off } = useSocket(roomId);

  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    on('message', handleMessage);

    return () => {
      off('message', handleMessage);
    };
  }, [on, off]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      emit('send-message', {
        roomId,
        message: inputMessage,
        timestamp: new Date(),
      });
      setInputMessage('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            <div style={styles.messageHeader}>
              <strong>{msg.user?.name || 'User'}</strong>
              <span style={styles.timestamp}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div style={styles.messageBody}>{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} style={styles.inputForm}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button type="submit" style={styles.sendButton}>
          Send
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    overflow: 'hidden',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '15px',
    backgroundColor: colors.background,
  },
  message: {
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: colors.surface,
    borderRadius: '8px',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
    fontSize: '14px',
  },
  timestamp: {
    color: colors.textSecondary,
    fontSize: '12px',
  },
  messageBody: {
    color: colors.text,
    lineHeight: '1.5',
  },
  inputForm: {
    display: 'flex',
    padding: '10px',
    borderTop: `1px solid ${colors.border}`,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    padding: '10px',
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    fontSize: '14px',
  },
  sendButton: {
    marginLeft: '10px',
    padding: '10px 20px',
    backgroundColor: colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ChatBox;

