# Manga Forge Studio — Director Engine (V1 locale)

Manga Forge Studio devient un studio de réalisation manga IA avec un **DirectorEngine** et un workflow local robuste.

## État V1 locale
- ✅ Workflow storyboard ➜ génération ➜ export.
- ✅ Mode démo complet sans OpenAI / Supabase / Cloudinary.
- ⚠️ Supabase est **désactivé** en V1 locale (mock de persistance local uniquement).

## Tester en 2 minutes
```bash
npm install
npm run dev
```
1. Ouvrir `http://localhost:3000`.
2. Cliquer sur **Charger une démo Matteo vs Hugo**.
3. Cliquer sur **Générer storyboard réalisateur**.
4. Modifier les dialogues si besoin.
5. Cliquer sur **Générer planches mock**.
6. Cliquer sur **Exporter PDF**.

## Variables d’environnement
Créer un `.env.local` à partir de `.env.example`.

- `OPENAI_API_KEY=` (optionnel : si absent, l’application passe en mode démo)
- `CLOUDINARY_CLOUD_NAME=` (optionnel)
- `CLOUDINARY_API_KEY=` (optionnel)
- `CLOUDINARY_API_SECRET=` (optionnel)

## Limites actuelles
- Persistance distante Supabase non active en V1 locale.
- Cohérence visage avancée (photo reference matching) reste un prochain chantier.

## Limitation environnement Codex
- Le registry npm est bloqué par politique réseau dans cet environnement.
- `npm install` peut échouer avec `403 Forbidden` sur des packages normaux (ex: `@types/node`).
- Ce comportement n’est **pas** une erreur applicative du projet.
- Le build n’a pas pu être exécuté dans cet environnement à cause de ce blocage réseau.
- Tester en local avec :
```bash
npm install && npm run dev
```
- Voir aussi `TROUBLESHOOTING.md`.

## APIs
- `POST /api/storyboard` : storyboard piloté par DirectorEngine.
- `POST /api/generate` : rendu image depuis storyboard validé (ou mock card en mode démo).
- `POST /api/export` : export PDF/PNG.
