import { Injectable } from '@nestjs/common';
import { TextExtractor } from './types/text-extractor.interface';
import type {
    PDFDocumentProxy,
    TextItem,
    TextMarkedContent,
} from 'pdfjs-dist/types/src/display/api';

@Injectable()
export class PdfTextExtractor implements TextExtractor {
    async extractText(fileBuffer: Buffer): Promise<string> {
        const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

        const pdfDocument = await pdfjs.getDocument({ data: new Uint8Array(fileBuffer) })
            .promise;
        let fullText = '';

        for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
            const page = await pdfDocument.getPage(pageNum);
            const textContent = await page.getTextContent();

            const linesMap: Record<number, string[]> = {};
            textContent.items.forEach((item: TextItem | TextMarkedContent) => {
                const element = item as TextItem;
                const y = Math.round(Number(element.transform[5]));
                if (!linesMap[y]) linesMap[y] = [];
                linesMap[y].push(element.str);
            });

            const sortedYs = Object.keys(linesMap)
                .map(Number)
                .sort((a, b) => b - a); // top to bottom
            sortedYs.forEach((y) => {
                const lineText = linesMap[y].join(' ').trim();
                if (lineText) fullText += lineText + '<br>';
            });
        }

        return fullText;
    }
}
