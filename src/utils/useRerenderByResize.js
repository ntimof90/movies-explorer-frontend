import { useEffect, useState } from 'react';

export default function useRerenderByResize(initialRender) {
  const [view, setView] = useState({});

  const handleResize = () => {
    if (window.innerWidth >= 1297) setView({ cardsLimit: 12, addCards: 3 });
    if (window.innerWidth >= 850 && window.innerWidth < 1297) setView({ cardsLimit: 8, addCards: 2 });
    if (window.innerWidth < 850) setView({ cardsLimit: 5, addCards: 2 })
  }

  const rerenderResult = (initialRender <= view.cardsLimit)
    ? initialRender
    : initialRender.slice(0, view.cardsLimit)

  const handleMoreClick = () => {
    setView({...view, cardsLimit: view.cardsLimit + view.addCards})
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    handleResize();
  }, [initialRender])

  return { rerenderResult, handleMoreClick };
}