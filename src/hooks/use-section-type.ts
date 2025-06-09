import { useEffect, useRef, useState } from 'react';

type SectionType = 'a' | 'b';

// Mantém o estado global das seções
let lastSectionType: SectionType | null = null;
let sectionCounter = 0;

export function useSectionType(isFirstSection: boolean = false) {
  const [sectionType, setSectionType] = useState<SectionType>('a');
  const initializedRef = useRef(false);

  useEffect(() => {
    // Evita múltiplas inicializações
    if (initializedRef.current) return;
    
    if (isFirstSection) {
      // Reseta o contador quando a primeira seção é montada
      sectionCounter = 0;
      lastSectionType = null;
    }

    // Define o tipo da seção baseado no contador
    const newType: SectionType = sectionCounter % 2 === 0 ? 'a' : 'b';
    setSectionType(newType);
    lastSectionType = newType;
    sectionCounter++;
    initializedRef.current = true;

    return () => {
      // Limpa quando a seção é desmontada
      if (isFirstSection) {
        sectionCounter = 0;
        lastSectionType = null;
        initializedRef.current = false;
      }
    };
  }, [isFirstSection]);

  return sectionType;
}
