import Tesseract from 'tesseract.js';
import stringSimilarity from 'string-similarity';
import { BrowserMultiFormatReader } from '@zxing/library';

export async function extractText(file) {
  const { data: { text } } = await Tesseract.recognize(file, 'spa');
  return text;
}

export function isOfficialText(text) {
  const normalized = text.toLowerCase();
  const keywords = [
    "universidad",
    "nacional",
    "experimental",
    "tachira",
    "secretaria",
    "estudiante",
    "unet",
    "vig",
    "vcto"
  ];

  return keywords.every(keyword => {
    const similarity = stringSimilarity.compareTwoStrings(normalized, keyword);
    return similarity > 0.6 || normalized.includes(keyword);
  });
}

export async function readBarcode(file) {
  const reader = new BrowserMultiFormatReader();
  try {
    const result = await reader.decodeFromImageUrl(URL.createObjectURL(file));
    return result.getText();
  } catch {
    return null;
  }
}
