import { Todos } from '@/components/Todos';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Notes</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Todos />
    </div>
  );
}
