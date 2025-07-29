import { Injectable } from '@nestjs/common';
import { TextExtractor } from './types/text-extractor.interface';
import pdfParse from 'pdf-parse';

@Injectable()
export class PdfTextExtractor implements TextExtractor {
    async extractText(fileBuffer: Buffer): Promise<string> {
        const parsedPdf = await pdfParse(fileBuffer);
        return parsedPdf.text;
    }
}
