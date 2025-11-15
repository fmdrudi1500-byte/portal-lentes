/**
 * Gera um código único de 6 caracteres alfanuméricos
 * Formato: LLNNLL (L=letra, N=número)
 * Evita caracteres confusos: O/0, I/1, S/5
 * Caracteres permitidos: A-Z (exceto O, I, S) + 2-9
 */

const LETTERS = 'ABCDEFGHJKLMNPQRTUVWXYZ'; // 23 letras (sem O, I, S)
const NUMBERS = '23456789'; // 8 números (sem 0, 1)

export function generateUniqueCode(): string {
  let code = '';
  
  // Formato: LLNNLL
  // 2 letras
  code += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
  code += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
  
  // 2 números
  code += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));
  code += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));
  
  // 2 letras
  code += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
  code += LETTERS.charAt(Math.floor(Math.random() * LETTERS.length));
  
  return code;
}

export function validateCodeFormat(code: string): boolean {
  // Verifica se o código tem 6 caracteres
  if (code.length !== 6) return false;
  
  // Verifica formato LLNNLL
  const pattern = /^[A-Z]{2}[0-9]{2}[A-Z]{2}$/;
  return pattern.test(code.toUpperCase());
}

export function formatCode(code: string): string {
  // Remove espaços e converte para maiúsculas
  return code.replace(/\s/g, '').toUpperCase();
}
