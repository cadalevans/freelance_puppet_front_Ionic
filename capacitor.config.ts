import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'freelance_puppet',
  webDir: 'www',
  plugins: {
    Stripe: {
      publishableKey: "pk_test_51Qc9yTPdPnsmJ4f7WlPAoT0ujYdkD0X5oMW5T7oiWGp1Gg3xkh6JWAqZK6R4T6sEE7xQ4N5cfqqSrPFVJaNCx84i00iWsCgPl2", // Replace with your actual key
    },
  },
};

export default config;
