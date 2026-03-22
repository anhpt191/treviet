import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Define the shape of our content
export interface ContentData {
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
    reservationText?: string;
    reservationLink?: string;
    orderText?: string;
    orderLink?: string;
    backgroundImage: string;
    logoImage: string;
    openingHours: string;
  };
  about: {
    title: string;
    subtitle: string;
    text1: string;
    text2: string;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
  };
  menu: {
    title: string;
    subtitle: string;
    buttonText: string;
    items: Array<{
      id: number;
      name: string;
      description: string;
      price: string;
      image: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    image: string;
    address: {
      street: string;
      city: string;
    };
    phone: string;
    email: string;
    googleMapsLink: string;
    openingHours: {
      weekdays: string;
      weekdayHours: string;
      weekendHours: string;
      closedDay: string;
    };
  };
  spices: {
    title: string;
    subtitle: string;
    image: string;
  };
}

// Default Content
const defaultContent: ContentData = {
  seo: {
    title: "Home",
    description: "TreViet - Authentische vietnamesische Küche in Zwickau. Genießen Sie frische Zutaten und traditionelle Gerichte in einem gemütlichen Ambiente.",
    keywords: "TreViet, Vietnamese Restaurant, Zwickau, Asian Food, Pho, Bun Cha"
  },
  hero: {
    title: "TreViet",
    subtitle: "Cuisine Vietnamese",
    buttonText: "Reservieren",
    reservationText: "TISCH RESERVIEREN",
    reservationLink: "#reservation",
    orderText: "ONLINE BESTELLEN",
    orderLink: "#",
    backgroundImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?q=80&w=2070&auto=format&fit=crop",
    logoImage: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
    openingHours: "Montag: 17:00 - 22:00 Uhr | Di-So: 11:00 - 15:00 & 17:00 - 22:00 Uhr"
  },
  about: {
    title: "Asiatische Momente",
    subtitle: "Tradition & Moderne",
    text1: "TreViet, das ist: für einen Moment dem Alltag entfliehen und vietnamesisch genießen. Dabei steht das Wohl des Gastes ganz vorne an. Wir verwenden nur frische Zutaten, weil diese die Grundvoraussetzung für ein eindrucksvolles Geschmackserlebnis sind.",
    text2: "Das Fleisch wird sorgfältig vorbereitet und gegrillt. Feine exotische Kräuter und Gewürze geben den Gerichten ihre besondere Note. Das alles wird stimmungsvoll serviert in einem ansprechend asiatischen Ambiente.",
    image1: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
    image2: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1892&auto=format&fit=crop",
    image3: "https://images.unsplash.com/photo-1511910849309-0dffb8785146?q=80&w=1974&auto=format&fit=crop",
    image4: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2029&auto=format&fit=crop",
    image5: "https://images.unsplash.com/photo-1503764654157-72d979d9af2f?q=80&w=2074&auto=format&fit=crop"
  },
  menu: {
    title: "Empfehlungen",
    subtitle: "Unsere Spezialitäten",
    buttonText: "Vollständige Speisekarte",
    items: [
      {
        id: 1,
        name: "Pho Bo",
        description: "Reisbandnudelsuppe mit Rindfleisch, frischen Kräutern und Sojasprossen",
        price: "14,90 €",
        image: "https://images.unsplash.com/photo-1511910849309-0dffb8785146?q=80&w=1974&auto=format&fit=crop"
      },
      {
        id: 2,
        name: "Bun Cha",
        description: "Gegrilltes Schweinefleisch mit Reisnudeln, Salat und Nuoc Cham Sauce",
        price: "15,50 €",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2029&auto=format&fit=crop"
      },
      {
        id: 3,
        name: "Goi Cuon",
        description: "Frische Sommerrollen mit Garnelen, Schweinefleisch, Salat und Kräutern",
        price: "7,90 €",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1892&auto=format&fit=crop"
      },
      {
        id: 4,
        name: "Com Rang",
        description: "Gebratener Reis mit Gemüse, Ei und wahlweise Hühnchen oder Rind",
        price: "12,90 €",
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=2525&auto=format&fit=crop"
      }
    ]
  },
  contact: {
    title: "Reservierung",
    subtitle: "Dein Tisch wartet auf dich",
    image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=2070&auto=format&fit=crop",
    address: {
      street: "Peter-Breuer-Strasse 25",
      city: "08056 Zwickau"
    },
    phone: "+49 3731 7731377",
    email: "info@treviet.de",
    googleMapsLink: "https://maps.app.goo.gl/LVwyEtQpjAj9nc6L6?g_st=ifm",
    openingHours: {
      weekdays: "Di - So",
      weekdayHours: "11:00 - 15:00",
      weekendHours: "17:00 - 22:00",
      closedDay: "Montag: 17:00 - 22:00"
    }
  },
  spices: {
    title: "Originale Zutaten",
    subtitle: "Frische, Tradition & Geschmack",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"
  }
};

interface ContentContextType {
  content: ContentData;
  updateContent: (newContent: ContentData) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  // Load from Supabase or localStorage on mount
  useEffect(() => {
    const loadContent = async () => {
      let loadedData = null;

      // Try Supabase first
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from('site_content')
            .select('data')
            .eq('id', 1)
            .single();
          
          if (data?.data) {
            loadedData = data.data;
          }
        } catch (error) {
          console.error("Supabase fetch error:", error);
        }
      }

      // Fallback to localStorage
      if (!loadedData) {
        const savedContent = localStorage.getItem('treviet_content');
        if (savedContent) {
          try {
            loadedData = JSON.parse(savedContent);
          } catch (e) {
            console.error("Failed to parse saved content", e);
          }
        }
      }

      if (loadedData) {
        // Merge saved content with defaultContent to ensure all fields exist
        const mergedContent = {
          ...defaultContent,
          ...loadedData,
          seo: { ...defaultContent.seo, ...loadedData.seo },
          hero: { ...defaultContent.hero, ...loadedData.hero },
          about: { ...defaultContent.about, ...loadedData.about },
          menu: { ...defaultContent.menu, ...loadedData.menu },
          contact: { ...defaultContent.contact, ...loadedData.contact, address: { ...defaultContent.contact.address, ...loadedData.contact?.address }, openingHours: { ...defaultContent.contact.openingHours, ...loadedData.contact?.openingHours } },
          spices: { ...defaultContent.spices, ...loadedData.spices },
        };
        setContent(mergedContent);
      }
      setIsLoading(false);
    };

    loadContent();
  }, []);

  const updateContent = async (newContent: ContentData) => {
    setContent(newContent);
    // Always save to localStorage as a backup
    localStorage.setItem('treviet_content', JSON.stringify(newContent));
    
    // Save to Supabase if configured
    if (supabase) {
      try {
        await supabase
          .from('site_content')
          .upsert({ id: 1, data: newContent });
      } catch (error) {
        console.error("Failed to save to Supabase:", error);
      }
    }
  };

  const resetContent = async () => {
    setContent(defaultContent);
    localStorage.removeItem('treviet_content');
    
    if (supabase) {
      try {
        await supabase
          .from('site_content')
          .upsert({ id: 1, data: defaultContent });
      } catch (error) {
        console.error("Failed to reset in Supabase:", error);
      }
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {!isLoading && children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
