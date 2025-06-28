import React, { useEffect, useRef } from 'react';

interface InstagramEmbedProps {
  embedCode: string;
}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const INSTAGRAM_SCRIPT_ID = 'instagram-embed-script';
const INSTAGRAM_SCRIPT_URL = 'https://www.instagram.com/embed.js';

export const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ embedCode }) => {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderEmbed = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    if (embedRef.current) {
        // Use a temporary div to parse the script tag from the embed code,
        // as we only want the blockquote part.
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = embedCode;
        const blockquote = tempDiv.querySelector('.instagram-media');
        
        if (blockquote) {
            embedRef.current.innerHTML = ''; // Clear previous content
            embedRef.current.appendChild(blockquote);
        }
    }

    if (document.getElementById(INSTAGRAM_SCRIPT_ID)) {
      renderEmbed();
    } else {
      const script = document.createElement('script');
      script.id = INSTAGRAM_SCRIPT_ID;
      script.async = true;
      script.src = INSTAGRAM_SCRIPT_URL;
      script.onload = renderEmbed;
      document.body.appendChild(script);
    }
  }, [embedCode]);

  return <div ref={embedRef} className="w-full" />;
};