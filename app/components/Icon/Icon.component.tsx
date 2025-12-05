interface IconProps {
  name: string;
  size: number;
  isMap?: boolean;
  onClick?: () => void;
}
export function IconComponent({ name, size = 20, isMap, onClick }: IconProps) {
  const href = isMap ? `/icons/map.svg` : `/icons/icons.svg#${name}`;

  return (
    <svg
      width={size}
      height={size}
      vectorEffect="non-scaling-stroke"
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    >
      <use href={href} />
    </svg>
  );
}

export default IconComponent;
