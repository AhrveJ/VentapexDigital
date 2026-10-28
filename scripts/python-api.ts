import { spawn } from 'node:child_process';
import type { Plugin } from 'vite';

/** Starts server/contact_app.py alongside `npm run dev`; Vite proxies /api/contact to it. */
export function pythonApi(port: string): Plugin {
  return {
    name: 'python-contact-api',
    apply: 'serve',
    configureServer(server) {
      // Set PYTHON=py (or a full path) in your shell if `python` isn't on PATH
      const child = spawn(process.env.PYTHON ?? 'python', ['server/contact_app.py'], {
        stdio: 'inherit',
        env: { ...process.env, DEV_API_PORT: port },
      });
      child.on('error', (err) => console.error('[contact] could not start Python:', err.message));
      const stop = () => child.kill();
      server.httpServer?.once('close', stop);
      process.once('exit', stop);
    },
  };
}
