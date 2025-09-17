---
description: Seguridad para {{TECH_STACK}}
globs: {{FILE_GLOBS}}
alwaysApply: false
---

002-security

## Seguridad
- Cifrar todas las claves API en reposo usando {{ENCRYPTION_LIBRARY}} (e.g., Cryptography)
- Implementar autenticación con {{AUTH_METHOD}} (e.g., JWT tokens)
- Aplicar rate limiting usando el middleware de {{FRAMEWORK}}
- Nunca exponer claves o secretos en el código fuente