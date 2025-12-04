import IconComponent from '../Icon/Icon.component';
import css from './FeatureTag.module.css';

interface Props {
  label: string;
  icon: string;
}

export function FeatureTag({ label, icon }: Props) {
  return (
    <div className={css.tag}>
      <IconComponent name={icon} size={16} />
      <span>{label}</span>
    </div>
  );
}
