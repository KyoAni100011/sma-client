import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as dotenv from 'dotenv';

dotenv.config(); 

export default defineConfig({
  plugins: [react()],
  server: {
    watch : {
      usePolling : true,
    }
  },
});
