import { MessageCircle } from 'lucide-react';

const MarketingScroll = () => {
  return (
    <div className="marketing-scroll overflow-hidden">
      <div className="animate-scroll-medium whitespace-nowrap flex items-center">
        <span>
          🚚 Livraison rapide à domicile | Paiement à la livraison | Commandez facilement sur WhatsApp
          <a 
            href="https://wa.me/243853222299" 
            className="whatsapp-number"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="inline h-4 w-4 mr-1" />
            +243 853 222 299
          </a>
          | Produits de qualité garantie | Service client disponible 24/7 | Votre satisfaction est notre priorité 🛍️
        </span>
      </div>
    </div>
  );
};

export default MarketingScroll;