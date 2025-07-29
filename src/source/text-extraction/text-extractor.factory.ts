// import DocTextExtractor from './doc-text-extractor';
import PdfTextExtractor from './pdf-text-extractor';
import TextExtractorStrategy from './text-extractor.strategy.interface';

const map = new Map<string, TextExtractorStrategy>([
    ['application/pdf', new PdfTextExtractor()],
    // ['application/msword', new DocTextExtractor()],
]);

function getTextExtractorInstance(mimetype: string): TextExtractorStrategy {
    const strategyInstance = map.get(mimetype);
    if (!strategyInstance) {
        throw new Error(`No strategy for mimetype: ${mimetype}`);
    }
    return strategyInstance;
}

export default getTextExtractorInstance;
