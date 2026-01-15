import React from 'react';

interface IconElement {
  size?: number | string;
  color?: string;
}

interface KanbanIconProps extends IconElement {
  icon: React.FC;
}

const KanbanIcon = ({ icon, size = 24, color = 'black' }: KanbanIconProps) => {
  return (
    <>
      {React.createElement<IconElement>(icon, {
        size,
        color,
      })}
    </>
  );
};

export default KanbanIcon;
