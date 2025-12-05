'use client';
import { useRouter } from 'next/navigation';
import styles from './MessageNoInfo.module.css';
import { Button } from '../Button/Button';

interface MessageNoInfoProps {
  text: string;
  buttonText: string;
  route?: string;
  onClick?: () => void;
}

export default function MessageNoInfo({ text, buttonText, route = '/', onClick }: MessageNoInfoProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) return onClick();

    router.back();
    setTimeout(() => router.push(route), 50);
  };

  return (
    <div className={styles.message_wrapper}>
      <div className={styles.message_container}>
        <p className={styles.message_text}>{text}</p>

        <Button type="button" label={buttonText} variant="loadMore" onClick={handleClick} />
      </div>
    </div>
  );
}
