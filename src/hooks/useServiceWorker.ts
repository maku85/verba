import { useEffect } from 'react';

export const useServiceWorker = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Registra il service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });

      // Gestisce gli aggiornamenti del service worker
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('New service worker activated');
        // Puoi mostrare un banner per informare l'utente di ricaricare la pagina
      });
    }
  }, []);
}; 