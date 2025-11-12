'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface BadgeCodeBlockProps {
  code: string;
}

export function BadgeCodeBlock({ code }: BadgeCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium">HTML Code</label>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy HTML
            </>
          )}
        </button>
      </div>
      <pre className="bg-accent border border-border rounded-lg p-4 overflow-x-auto">
        <code className="text-sm font-mono text-foreground break-all whitespace-pre-wrap">
          {code}
        </code>
      </pre>
    </div>
  );
}
