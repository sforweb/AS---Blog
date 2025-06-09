import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Formata uma data para um formato legível
 * @param dateString Data em formato string (ISO)
 * @returns Data formatada (ex: "Hoje", "Ontem", "3 dias atrás" ou "02 de junho de 2023")
 */
export function formatDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  
  if (isToday(date)) {
    return 'Hoje';
  }
  
  if (isYesterday(date)) {
    return 'Ontem';
  }
  
  const diffInDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 7) {
    return formatDistanceToNow(date, { 
      addSuffix: true, 
      locale: ptBR 
    });
  }
  
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

/**
 * Formata uma data para ser usada em atributos datetime
 * @param date Data a ser formatada
 * @returns String no formato YYYY-MM-DD
 */
export function formatDateAttribute(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return format(d, 'yyyy-MM-dd');
}

/**
 * Formata uma data para exibição curta (ex: "02/06/2023")
 * @param date Data a ser formatada
 * @returns String formatada
 */
export function formatShortDate(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'dd/MM/yyyy');
}

/**
 * Formata uma data e hora para exibição
 * @param date Data a ser formatada
 * @returns String formatada (ex: "02/06/2023 às 14:30")
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}
