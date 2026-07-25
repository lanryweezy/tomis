'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Stack } from '@astryxdesign/core/Stack';

interface UploadResult {
  url: string;
  filename: string;
  folder: string;
  size: number;
  type: string;
}

interface ImageUploadProps {
  folder?: string;
  onUpload?: (result: UploadResult) => void;
  multiple?: boolean;
}

export default function ImageUpload({ folder = 'products', onUpload, multiple = false }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (files: FileList) => {
    setIsUploading(true);
    setError(null);

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.status === 'success') {
          setUploadedImages(prev => [...prev, data.data]);
          onUpload?.(data.data);
        } else {
          setError(data.error || 'Upload failed');
        }
      } catch {
        setError('Upload failed. Please try again.');
      }
    }

    setIsUploading(false);
  }, [folder, onUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleUpload(e.dataTransfer.files);
    }
  }, [handleUpload]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files);
    }
  }, [handleUpload]);

  return (
    <Stack gap={4}>
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? 'var(--color-text-accent, #1647B8)' : 'var(--color-border, #E7E5E4)'}`,
          backgroundColor: isDragging ? 'var(--color-background-blue, #0171E333)' : 'var(--color-background-muted, #F5F5F4)',
          padding: '2rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple={multiple}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <Stack gap={2} style={{ alignItems: 'center' }}>
          <div style={{ fontSize: '2rem' }}>{isUploading ? '⏳' : '📁'}</div>
          <Text type="body" weight="medium">
            {isUploading ? 'Uploading...' : 'Drag & drop images here'}
          </Text>
          <Text type="supporting" color="secondary">
            or click to browse. JPEG, PNG, WebP, AVIF. Max 5MB.
          </Text>
        </Stack>
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: '0.75rem', backgroundColor: 'var(--color-error-muted, #DC262615)', color: 'var(--color-error, #DC2626)', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <Stack gap={2}>
          <Text type="label" color="secondary">Uploaded Images</Text>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem' }}>
            {uploadedImages.map((img, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '1', backgroundColor: 'var(--color-background-muted, #F5F5F4)', overflow: 'hidden' }}>
                <img src={img.url} alt={img.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.25rem', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.6rem', textAlign: 'center' }}>
                  {img.filename}
                </div>
              </div>
            ))}
          </div>
        </Stack>
      )}
    </Stack>
  );
}
