import React, { useState } from 'react';
import ChatBox from '../components/ChatBox';
import MemberAvatar from '../components/MemberAvatar';
import { colors } from '../constants/colors';

const GroupTripPlanning = () => {
  const [groupMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);
  const [roomId] = useState('group-123');

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Group Trip Planning</h1>
      <div style={styles.content}>
        <div style={styles.membersSection}>
          <h2 style={styles.sectionTitle}>Group Members</h2>
          <div style={styles.membersList}>
            {groupMembers.map((member) => (
              <div key={member.id} style={styles.member}>
                <MemberAvatar user={member} />
                <span style={styles.memberName}>{member.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.chatSection}>
          <h2 style={styles.sectionTitle}>Group Chat</h2>
          <ChatBox roomId={roomId} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    padding: '40px',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: colors.text,
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '40px',
  },
  membersSection: {
    backgroundColor: colors.surface,
    padding: '30px',
    borderRadius: '8px',
    height: 'fit-content',
  },
  chatSection: {
    backgroundColor: colors.surface,
    padding: '30px',
    borderRadius: '8px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: colors.text,
  },
  membersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  member: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  memberName: {
    fontSize: '16px',
    color: colors.text,
  },
};

export default GroupTripPlanning;

