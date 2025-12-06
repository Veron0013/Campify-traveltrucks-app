import { CamperData } from '@/app/services/api/api.types';
import css from './CamperDetails.module.css';
import { CARD_FEATURES_CONFIG, FORM_CONFIG } from '@/app/types/filter.types';
import { FeatureTag } from '../../FeatureTag/FeatureTag';
import MessageNoInfo from '../../MessageNoInfo/MessageNoInfo';

interface Props {
  camper: CamperData;
}

function FeaturesList({ camper }: Props) {
  const formInfo = FORM_CONFIG[camper.form].label;

  const formatUnitValue = (value: string): string => {
    return value.replace(/(\d)([a-zA-Z])/g, '$1 $2');
  };

  if (!camper)
    return <MessageNoInfo buttonText="Home page" text="No fetures found. Maybe you can try later." route="/" />;

  return (
    <div className={css.featuresBlock}>
      <div className={css.features}>
        {CARD_FEATURES_CONFIG.filter(f => camper[f.key] !== undefined && camper[f.key] !== false).map(f => (
          <FeatureTag key={f.key} icon={f.icon(camper[f.key] as never)} label={f.label(camper[f.key] as never)} />
        ))}
      </div>
      <div className={css.featuresDetails}>
        <h4 className={css.blockTitle}>Vehicle type</h4>
        <div className={css.divider}></div>
        <dl className={css.details}>
          <div className={css.row}>
            <dt>Form</dt>
            <dd>{formInfo}</dd>
          </div>

          <div className={css.row}>
            <dt>Length</dt>
            <dd>{formatUnitValue(camper.length)}</dd>
          </div>

          <div className={css.row}>
            <dt>Width</dt>
            <dd>{formatUnitValue(camper.width)}</dd>
          </div>

          <div className={css.row}>
            <dt>Height</dt>
            <dd>{formatUnitValue(camper.height)}</dd>
          </div>

          <div className={css.row}>
            <dt>Tank</dt>
            <dd>{formatUnitValue(camper.tank)}</dd>
          </div>

          <div className={css.row}>
            <dt>Consumption</dt>
            <dd>{camper.consumption}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default FeaturesList;
