---
description: Coding Standards & Rules for {{TECH_STACK}} (e.g., Python 3.12.10 + FastAPI 0.116.0)
globs: {{FILE_GLOBS}} (e.g., *.py)
alwaysApply: true
---

000-base

## Estructura y convenciones principales
- Implementar el backend usando {{FRAMEWORK}} (e.g., Python con FastAPI)
- Seguir la estructura recomendada por {{FRAMEWORK}} para proyectos
- Usar {{DATABASE}} como base de datos y {{ORM}} como ORM (e.g., PostgreSQL y SQLAlchemy)
- Todas las claves API deben cifrarse en reposo usando {{ENCRYPTION_LIBRARY}} (e.g., Cryptography)
- La autenticación debe realizarse con {{AUTH_METHOD}} (e.g., JWT tokens)
- Implementar rate limiting usando el middleware de {{FRAMEWORK}}
- Usar {{TYPING}} en todo el código (e.g., type hints en Python)
- Seguir la guía de estilo {{STYLE_GUIDE}} (e.g., PEP 8)
- Documentar todos los endpoints con {{DOC_FORMAT}} (e.g., OpenAPI)
- Usar {{ASYNC_PATTERN}} para todas las operaciones de entrada/salida (e.g., async/await)
- Escribir pruebas unitarias para la lógica de negocio