import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Date and Time formatting utilities
export const formatDate = (dateString) => {
  if (!dateString) return 'NA';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'NA';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'NA';
  }
};

export const formatTime = (timeString) => {
  if (!timeString) return 'NA';
  
  try {
    // Handle different time formats
    let time;
    
    // If it's already a Date object or ISO string
    if (timeString instanceof Date || timeString.includes('T')) {
      time = new Date(timeString);
    } else {
      // If it's just a time string like "14:01:27.347912"
      const [hours, minutes, seconds] = timeString.split(':');
      time = new Date();
      time.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));
    }
    
    if (isNaN(time.getTime())) return 'NA';
    
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'NA';
  }
};

export const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return 'NA';
  
  try {
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) return 'NA';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  } catch (error) {
    console.error('Error formatting datetime:', error);
    return 'NA';
  }
};