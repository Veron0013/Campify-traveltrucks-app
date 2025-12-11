'use client';

import { ScaleLoader } from 'react-spinners';
import css from './Loader.module.css';
import { useEffect, type CSSProperties } from 'react';
import { LOADING_MAIN_MESSAGE } from './lib/vars';
import { useCampersStore } from './stores/campersListStore';

const Loading = () => {
  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#17862c',
  };

  const setListLoading = useCampersStore(s => s.setListLoading);

  useEffect(() => {
    setListLoading(true);
    return () => {
      setListLoading(false);
    };
  }, [setListLoading]);

  return (
    //<div className={`${css.wrapper} ${css.fullWrapp}`}>
    <div className={`${css.wrapper}`}>
      <ScaleLoader
        color="#475467"
        loading={true}
        cssOverride={override}
        //size={150}
        aria-label="Loading...."
        data-testid="loader"
      />
      <span className={css.text}>{LOADING_MAIN_MESSAGE}</span>
    </div>
  );
};

export default Loading;
