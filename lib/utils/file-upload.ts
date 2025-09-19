import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function saveUploadedFile(
    file: File,
    folder: string = "uploads"
): Promise<string> {
    try {
        const maxSize = 1 * 1024 * 1024; // 1MB in bytes
        if (file.size > maxSize) {
            throw new Error("File size must be less than 1MB");
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = join(process.cwd(), "public", folder);
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }

        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileExtension = file.name.split(".").pop();
        const fileName = `${timestamp}-${randomString}.${fileExtension}`;

        const filePath = join(uploadsDir, fileName);

        await writeFile(filePath, buffer);

        return `/${folder}/${fileName}`;
    } catch (error) {
        console.error("Error saving file:", error);
        throw new Error("Failed to save file");
    }
}

export function deleteUploadedFile(filePath: string): void {
    try {
        if (filePath && filePath.startsWith("/")) {
            const fullPath = join(process.cwd(), "public", filePath);
            if (existsSync(fullPath)) {
                require("fs").unlinkSync(fullPath);
            }
        }
    } catch (error) {
        console.error("Error deleting file:", error);
    }
}
