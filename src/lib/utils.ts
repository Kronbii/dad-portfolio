import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Unconfirmed facts are visible in development (and with SHOW_VERIFY=1), never in production. */
export const showVerify = process.env.NODE_ENV !== 'production' || process.env.SHOW_VERIFY === '1'
