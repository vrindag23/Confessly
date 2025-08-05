import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
   extend: {
  colors: {
    primaryRed: "#EE2935",
    primaryBlue: "#4957ED",
    darkBg: "#252526",
    accentPurple: "#B74CFF",
    accentGold: "#F7D154",
  },
}

  },
  plugins: [],
}
export default config