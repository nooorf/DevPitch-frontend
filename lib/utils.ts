import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatDate(date: string | Date) {
  if(!date) return 'Invalid date';

  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  if(isNaN(parsedDate.getTime())) return 'Invalid date';
  
  return new Date(date).toLocaleDateString(
    'en-US',
    {  month: 'long', day: 'numeric' , year: 'numeric'}
  )
}
