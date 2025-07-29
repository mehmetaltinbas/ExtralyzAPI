import TextExtractorStrategy from './text-extractor.strategy.interface';
import pdfParse from 'pdf-parse';

class PdfTextExtractor implements TextExtractorStrategy {
    async extractText(fileBuffer: Buffer): Promise<string> {
        const parsedPdf = await pdfParse(fileBuffer);
        return parsedPdf.text;
    }
}

export default PdfTextExtractor;
