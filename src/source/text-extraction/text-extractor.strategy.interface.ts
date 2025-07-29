interface TextExtractorStrategy {
    extractText(fileBuffer: Buffer): Promise<string>;
}

export default TextExtractorStrategy;
