export function formatNumber(n: number | undefined | null): string {
  if (n == null) return '0';
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export async function downloadMedia(url: string, prefix: string = "AMZ_"): Promise<void> {
  try {
    // Attempt standard fetch + blob approach
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = blobUrl;
    
    // Deterime extension
    let ext = '.mp4';
    if (url.includes('.mp3') || url.includes('music')) ext = '.mp3';
    else if (url.includes('.webp')) ext = '.webp';
    else if (url.includes('.jpeg') || url.includes('.jpg')) ext = '.jpg';
    else if (url.includes('.png')) ext = '.png';
    else if (prefix.includes('Image')) ext = '.jpg'; // Fallback for image prefix

    a.download = `${prefix}${Date.now()}${ext}`;
    
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.warn("Blob download failed (likely CORS), falling back to new tab.", error);
    window.open(url, '_blank');
  }
}
