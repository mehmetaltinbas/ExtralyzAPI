import { Injectable } from '@nestjs/common';
import { TextExtractor } from './types/text-extractor.interface';
import { PdfTextExtractor } from './pdf-text-extractor.provider';
// import DocTextExtractor from './doc-text-extractor';

// const map = new Map<string, TextExtractor>([
//     ['application/pdf', new PdfTextExtractor()],
//     // ['application/msword', new DocTextExtractor()],
// ]);

// function getTextExtractorInstance(mimetype: string): TextExtractor {
//     const strategyInstance = map.get(mimetype);
//     if (!strategyInstance) {
//         throw new Error(`No strategy for mimetype: ${mimetype}`);
//     }
//     return strategyInstance;
// }

// export default getTextExtractorInstance;

@Injectable()
export class TextExtractorService {
    private readonly extractorMap: Map<string, TextExtractor>;

    constructor(private pdfTextExtractor: PdfTextExtractor) {
        this.extractorMap = new Map([
            ['application/pdf', this.pdfTextExtractor],
        ]);
    }

    resolveExtractor(mimetype: string): TextExtractor {
        const strategyInstance = this.extractorMap.get(mimetype);
        if (!strategyInstance) throw new Error(`No strategy for mimetype: ${mimetype}`);
        return strategyInstance;
    }
}