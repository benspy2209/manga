# TROUBLESHOOTING

## npm install échoue avec 403 Forbidden

Dans certains environnements (ex: sandbox Codex), l'accès au registry npm peut être bloqué par politique réseau.

### 1) Vérifier le registry npm actif
```bash
npm config get registry
```

### 2) Reconfigurer le registry officiel npm
```bash
npm config set registry https://registry.npmjs.org/
```

### 3) Vérifier/supprimer un proxy npm si nécessaire
```bash
npm config get proxy
npm config get https-proxy
npm config delete proxy
npm config delete https-proxy
```

### 4) Nettoyer le cache npm
```bash
npm cache clean --force
```

### 5) Relancer l'installation
```bash
npm install
```
