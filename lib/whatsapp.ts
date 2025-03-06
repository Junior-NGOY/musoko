  // Fonction pour créer le lien WhatsApp
/*  export const createWhatsAppLink = (phone: string, productName: string) => {
    // Formatage du numéro de téléphone (suppression des espaces et ajout du préfixe international si nécessaire)
    const formattedPhone = phone.startsWith("+") ? phone.replace(/\s+/g, "") : `+${phone.replace(/\s+/g, "")}`

    // Message prédéfini
    const message = `Bonjour, je suis intéressé(e) par votre produit: ${productName}. Pouvez-vous me donner plus d'informations?`

    // Création du lien WhatsApp
    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
  } */
    export function createWhatsAppLink(phone: string, productName: string, productImage?: string, price?: number) {
      const message = encodeURIComponent(
        `Bonjour, je suis intéressé par votre produit :\n\n` +
        `*${productName}*\n` +
        `Prix: ${price} $\n` +
        `Image: ${productImage}\n\n` +
        `Je souhaiterais avoir plus d'informations.`
      );
      return `https://wa.me/${phone}?text=${message}`;
    }