import React from 'react';
import { colors } from '../constants/colors';

const MemberAvatar = ({ user, size = 40 }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getColor = (name) => {
    const colors = [
      '#4A90E2',
      '#50C878',
      '#FF6B6B',
      '#F39C12',
      '#9B59B6',
      '#1ABC9C',
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  return (
    <div
      style={{
        ...styles.avatar,
        width: size,
        height: size,
        backgroundColor: getColor(user?.name || user?.email),
        fontSize: size * 0.4,
      }}
      title={user?.name || user?.email}
    >
      {getInitials(user?.name || user?.email)}
    </div>
  );
};

const styles = {
  avatar: {
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    flexShrink: 0,
  },
};

export default MemberAvatar;

