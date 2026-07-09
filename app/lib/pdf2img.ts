export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        if (typeof window === "undefined") {
            return {
                imageUrl: "",
                file: null,
                error: "PDF conversion can only run in the browser",
            };
        }

        if (file.type !== "application/pdf") {
            return {
                imageUrl: "",
                file: null,
                error: "Selected file is not a PDF",
            };
        }

        const pdfjsLib = await import("pdfjs-dist");
        const pdfWorker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");

        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker.default;

        const arrayBuffer = await file.arrayBuffer();
        const pdfData = new Uint8Array(arrayBuffer);

        const pdf = await pdfjsLib.getDocument({
            data: pdfData,
            useSystemFonts: true,
        }).promise;

        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
            return {
                imageUrl: "",
                file: null,
                error: "Failed to create canvas context",
            };
        }

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        const renderTask = page.render({
            canvas,
            canvasContext: context,
            viewport,
        });

        await renderTask.promise;

        const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob(resolve, "image/png", 0.95);
        });

        if (!blob) {
            return {
                imageUrl: "",
                file: null,
                error: "Failed to create image blob from PDF page",
            };
        }

        const originalName = file.name.replace(/\.pdf$/i, "");
        const imageFile = new File([blob], `${originalName}.png`, {
            type: "image/png",
        });

        return {
            imageUrl: URL.createObjectURL(blob),
            file: imageFile,
        };
    } catch (err) {
        console.error("PDF conversion failed:", err);

        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${err instanceof Error ? err.message : String(err)}`,
        };
    }
}