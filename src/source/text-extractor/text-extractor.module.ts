import { Module } from "@nestjs/common";
import { PdfTextExtractor } from "./pdf-text-extractor.provider";
import { TextExtractorService } from "./text-extractor.service";

@Module({
    providers: [TextExtractorService, PdfTextExtractor],
    exports: [TextExtractorService],
})
export class TextExtractorModule {}
