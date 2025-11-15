// utils/clockGenerator.ts - Update the generateClockSVG function
export const generateClockSVG = (time: string, size: number = 100): string => {
  const [hourStr, minuteStr] = time.split(':');
  const hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);
  
  const normalizedHour = hour % 12 || 12;
  const minuteRotation = (minute * 6) - 90;
  const hourRotation = ((normalizedHour * 30) + (minute * 0.5)) - 90;
  
  const svgContent = `
    <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Clock face -->
      <circle cx="50" cy="50" r="45" fill="white" stroke="#333" stroke-width="2"/>
      
      <!-- Hour markers -->
      ${Array.from({ length: 12 }).map((_, i) => {
        const angle = i * 30;
        const rad = angle * Math.PI / 180;
        const x1 = 50 + 35 * Math.sin(rad);
        const y1 = 50 - 35 * Math.cos(rad);
        const x2 = 50 + 40 * Math.sin(rad);
        const y2 = 50 - 40 * Math.cos(rad);
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#333" stroke-width="2"/>`;
      }).join('')}
      
      <!-- Numbers -->
      ${Array.from({ length: 12 }).map((_, i) => {
        const number = i === 0 ? 12 : i;
        const angle = i * 30;
        const rad = angle * Math.PI / 180;
        const x = 50 + 30 * Math.sin(rad);
        const y = 50 - 30 * Math.cos(rad);
        return `<text x="${x}" y="${y + 3}" text-anchor="middle" alignment-baseline="middle" font-size="8" font-family="Arial, sans-serif">${number}</text>`;
      }).join('')}
      
      <!-- Minute hand -->
      <line 
        x1="50" y1="50" 
        x2="${50 + 35 * Math.cos(minuteRotation * Math.PI / 180)}" 
        y2="${50 + 35 * Math.sin(minuteRotation * Math.PI / 180)}" 
        stroke="#333" 
        stroke-width="2"
        stroke-linecap="round"
      />
      
      <!-- Hour hand -->
      <line 
        x1="50" y1="50" 
        x2="${50 + 25 * Math.cos(hourRotation * Math.PI / 180)}" 
        y2="${50 + 25 * Math.sin(hourRotation * Math.PI / 180)}" 
        stroke="#333" 
        stroke-width="3"
        stroke-linecap="round"
      />
      
      <!-- Center dot -->
      <circle cx="50" cy="50" r="3" fill="#333"/>
    </svg>
  `.replace(/\s+/g, ' ').trim();

  // Convert to Data URL
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`;
};