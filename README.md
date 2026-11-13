# C.g Conference 2027 · 3D Museum Walkthrough
React + Three.js (react-three-fiber, drei) + WebGL, Vite build, optional Node/Express server.

    npm install
    npm run dev        # local dev
    npm run build      # outputs dist/
    npm start          # Node server serving dist/ (PORT env supported)

GitHub Pages: push to `main`, then Settings > Pages > Source: GitHub Actions.
Content lives in `src/data.js`; the 3D layout in `src/geo.js` and `src/Scene.jsx`.
