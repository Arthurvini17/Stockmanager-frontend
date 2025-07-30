import { redirect } from 'next/navigation';

import Header from "./components/Header.jsx";


export default function Home() {
  return (
    redirect('/Dashboard')
  );
}
