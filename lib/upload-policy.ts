/**
 * Single source of truth for what may be uploaded.
 *
 * Imported by both the browser widget (app/components/FileUpload) and the
 * server actions that forward files to Liferay, so the two can never drift
 * apart. The client check is for usability; the server check is the control —
 * a request can always be crafted to bypass the browser.
 *
 * Deliberately plain constants rather than env vars: the limit is stated to
 * the user in the upload widget, so client and server must agree exactly.
 */

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg"] as const;

export const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
] as const;

/** The `accept` attribute value — keeps the file picker in step with the policy. */
export const ACCEPT_ATTRIBUTE = ALLOWED_EXTENSIONS.join(",");

export type UploadCheck = { ok: true } | { ok: false; message: string };

function extensionOf(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  return dot === -1 ? "" : fileName.slice(dot).toLowerCase();
}

/**
 * Validates the declared name, MIME type and size. Both are attacker-supplied
 * on a crafted request, so on the server this is paired with
 * hasAllowedSignature() below.
 */
export function checkUploadMeta(file: {
  name: string;
  type: string;
  size: number;
}): UploadCheck {
  if (!file.size) {
    return { ok: false, message: "الملف فارغ" };
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      message: `حجم الملف يتجاوز الحد المسموح (${Math.round(
        MAX_UPLOAD_BYTES / 1024 / 1024
      )} ميغابايت)`,
    };
  }

  const extension = extensionOf(file.name);
  const extensionAllowed = (ALLOWED_EXTENSIONS as readonly string[]).includes(
    extension
  );
  const mimeAllowed =
    !file.type ||
    (ALLOWED_MIME_TYPES as readonly string[]).includes(file.type.toLowerCase());

  if (!extensionAllowed || !mimeAllowed) {
    return {
      ok: false,
      message: "نوع الملف غير مدعوم — الصيغ المقبولة: PDF، PNG، JPG",
    };
  }

  return { ok: true };
}

/**
 * Content sniff: confirms the bytes match one of the permitted formats, so a
 * renamed executable is rejected even when its name and Content-Type look
 * legitimate.
 */
export function hasAllowedSignature(bytes: Uint8Array): boolean {
  const startsWith = (...signature: number[]) =>
    signature.every((byte, index) => bytes[index] === byte);

  // %PDF
  if (startsWith(0x25, 0x50, 0x44, 0x46)) return true;
  // PNG
  if (startsWith(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return true;
  // JPEG (JFIF / Exif / raw)
  if (startsWith(0xff, 0xd8, 0xff)) return true;

  return false;
}

/**
 * Full server-side check for a File pulled out of a FormData.
 */
export async function checkUploadedFile(file: unknown): Promise<UploadCheck> {
  if (!(file instanceof File)) {
    return { ok: false, message: "الملف غير صالح" };
  }

  const meta = checkUploadMeta(file);
  if (!meta.ok) return meta;

  const header = new Uint8Array(await file.slice(0, 8).arrayBuffer());

  if (!hasAllowedSignature(header)) {
    return {
      ok: false,
      message: "محتوى الملف لا يطابق الصيغة المسموح بها",
    };
  }

  return { ok: true };
}
