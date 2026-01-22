import React from 'react';

interface IconElement {
  size?: number;
  color?: string;
  className?: string;
}

interface KanbanIconProps extends IconElement {
  icon: React.FC;
}

const KanbanIcon = ({
  icon,
  size = 24,
  color = 'black',
  className = '',
}: KanbanIconProps) => {
  return (
    <>
      {React.createElement<IconElement>(icon, {
        size,
        color,
        className,
      })}
    </>
  );
};

export default KanbanIcon;
