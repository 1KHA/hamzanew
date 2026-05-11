import React, { useState, useRef, useId } from "react";
import "./FileUpload.css";
import "@/app/styles/Button.css";

// --- Icons ---
const Icon = ({
  name,
  size = 20,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) => {
  const styles = { width: size, height: size };

  if (name === "file-upload") {
    return (
      <svg
        {...styles}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    );
  }
  if (name === "alert-circle") {
    return (
      <svg
        {...styles}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
  }
  if (name === "checkmark-circle-02") {
    return (
      <svg
        {...styles}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M9 11l3 3L22 4" />
      </svg>
    );
  }
  if (name === "multiplication-sign") {
    return (
      <svg
        {...styles}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    );
  }
  return null;
};

// --- Loading Spinner ---
const Loading = ({ size = "tiny" }: { size?: "tiny" | "small" | "medium" }) => {
  return (
    <svg
      className={`animate-spin ${size === "tiny" ? "w-4 h-4" : "w-6 h-6"}`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="#E6E6E6" strokeWidth="4" />
      <path d="M4 12a8 8 0 018-8v8H4z" fill="#3B82F6" />
    </svg>
  );
};

// --- Types ---
export interface UploadedFile {
  name: string;
  uploadStatus: "pending" | "uploading" | "complete" | "error";
  progress?: number;
  errorMessage?: string;
  file?: File; // Store the actual file object if needed
}

export interface FileUploadProps {
  id?: string;
  name?: string;
  accept?: string;
  multiple?: boolean;
  title?: string;
  fileTypesText?: string;
  actionName?: string;
  maximumFilesSize?: number; // in bytes
  disabled?: boolean;
  showIcon?: boolean;
  style?: React.CSSProperties;

  // Callbacks
  getUploadedFile?: (files: UploadedFile[]) => void;
  uploadFileOverSize?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emitDeleteFile?: (file: UploadedFile, index: number) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  id: propId,
  name: propName,
  accept,
  multiple,
  title = " ",
  fileTypesText = "Maximum file size allowed is 2MB, supported file formats include .jpg, .png, and .pdf.",
  actionName = "Browse Files",
  maximumFilesSize,
  disabled = false,
  showIcon = true,
  style,
  getUploadedFile,
  uploadFileOverSize,
  onChange,
  emitDeleteFile,
}) => {
  const generatedId = useId();
  const id = propId || generatedId;
  const name = propName || generatedId;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragState, setDragState] = useState(false);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (onChange) onChange(event);

    const input = event.target;
    const selectedFiles = input.files;

    processFiles(selectedFiles);
  };

  const isAccepted = (file: File): boolean => {
    if (!accept) return true;
    const patterns = accept.split(",").map((p) => p.trim().toLowerCase());
    const fileType = file.type.toLowerCase();
    const fileExt = "." + file.name.split(".").pop()!.toLowerCase();
    return patterns.some((p) => {
      if (p.startsWith(".")) return fileExt === p;
      if (p.endsWith("/*")) return fileType.startsWith(p.slice(0, -1));
      return fileType === p;
    });
  };

  const friendlyAccept = (): string => {
    if (!accept) return "";
    return accept
      .split(",")
      .map((p) => {
        p = p.trim();
        if (p.startsWith(".")) return p.replace(".", "").toUpperCase();
        if (p === "image/*") return "صور (jpg, png, gif, …)";
        if (p === "application/pdf") return "PDF";
        const ext = p.split("/")[1];
        return ext ? ext.toUpperCase() : p;
      })
      .join("، ");
  };

  const processFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const newItems: UploadedFile[] = [];

    for (const f of Array.from(fileList)) {
      if (!isAccepted(f)) {
        newItems.push({
          name: f.name,
          uploadStatus: "error",
          errorMessage: `نوع الملف غير مدعوم — الصيغ المقبولة: ${friendlyAccept()}`,
          file: f,
        });
      } else if (maximumFilesSize && f.size > maximumFilesSize) {
        if (uploadFileOverSize) uploadFileOverSize();
        newItems.push({
          name: f.name,
          uploadStatus: "error",
          errorMessage: `حجم الملف يتجاوز الحد المسموح (${Math.round(maximumFilesSize / 1024 / 1024)} ميغابايت)`,
          file: f,
        });
      } else {
        newItems.push({ name: f.name, uploadStatus: "complete", file: f });
      }
    }

    const newFiles = [...files, ...newItems];
    setFiles(newFiles);
    if (getUploadedFile) getUploadedFile(newFiles);
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled) return;

    setDragState(false);
    const droppedFiles = event.dataTransfer.files;
    processFiles(droppedFiles);
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled) return;
    setDragState(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (disabled) return;
    setDragState(false);
  };

  const handleDeleteFile = (index: number, file: UploadedFile) => {
    const newFiles = [...files.slice(0, index), ...files.slice(index + 1)];
    setFiles(newFiles);
    if (emitDeleteFile) emitDeleteFile(file, index);
    // Also update the parent if getUploadedFile is used to sync state
    if (getUploadedFile) getUploadedFile(newFiles);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const renderFile = (file: UploadedFile, index: number) => {
    if (file.uploadStatus === "error") {
      return (
        <div key={index} className="file-upload__file-item--error">
          <div className="file-upload__file-item">
            <span className="file-upload__file-status file-upload__file-status--error">
              <Icon name="alert-circle" size={20} />
            </span>
            <span className="file-upload__file-name">{file.name}</span>
            <button
              className="btn btn--close btn--icon btn--sm"
              onClick={() => handleDeleteFile(index, file)}
            >
              <span className="btn-icon">
                <Icon name="multiplication-sign" size={20} />
              </span>
            </button>
          </div>
          <div className="file-upload__file-item-msg">
            {file.errorMessage
              ? file.errorMessage
              : "Here goes the helper text."}
          </div>
        </div>
      );
    }

    return (
      <div key={index} className="file-upload__file-item">
        <span
          className={`file-upload__file-status file-upload__file-status--${file.uploadStatus}`}
        >
          {file.uploadStatus === "uploading" && file.progress && (
            <Loading size="tiny" />
          )}
          {file.uploadStatus === "complete" && (
            <Icon name="checkmark-circle-02" size={20} />
          )}
          {
            file.uploadStatus === "pending" && (
              <div style={{ width: 20 }}></div>
            ) /* Placeholder for alignment */
          }
        </span>
        <span className="file-upload__file-name">{file.name}</span>
        <button
          className="btn btn--close btn--icon btn--sm"
          onClick={() => handleDeleteFile(index, file)}
        >
          <span className="btn-icon">
            <Icon name="multiplication-sign" size={20} />
          </span>
        </button>
      </div>
    );
  };

  return (
    <div
      className={`file-upload ${dragState ? "file-upload--drag-over" : ""} ${disabled ? "file-upload--disabled" : ""}`}
      style={style}
    >
      <input
        type="file"
        id={id}
        name={name}
        className="file-upload__input"
        accept={accept}
        multiple={multiple}
        aria-hidden="true"
        onChange={handleFileSelection}
        ref={fileInputRef}
      />
      <div
        className="file-upload__drop-area"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={(e) => {
          if (e.target === e.currentTarget) triggerFileInput();
        }}
      >
        {showIcon && (
          <span className="file-upload__icon">
            <Icon name="file-upload" size={32} />
          </span>
        )}
        <div className="file-upload__content">
          <p className="file-upload__instructions">{title}</p>
          <p className="file-upload__formats">{fileTypesText}</p>
        </div>
        <button
          className="dga-btn dga-btn--md dga-btn--secondary-outline"
          aria-label={actionName}
          disabled={dragState || disabled}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            triggerFileInput();
          }}
        >
          <span className="dga-btn-label">{actionName}</span>
        </button>
      </div>

      <div className="file-upload__files-list">
        {files.map((file, index) => renderFile(file, index))}
      </div>
    </div>
  );
};
export default FileUpload;