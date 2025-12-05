# 📚 @beemood/libs - Shared Utility Libraries

This repository serves as a **monorepo** for a collection of core utility and infrastructural packages used across various applications within the ecosystem. These libraries encapsulate common patterns, shared logic, and foundational integrations to ensure consistency, reduce boilerplate, and accelerate development across all projects.

---

## 🛠 Technology Stack

This project is built and maintained using modern, robust technologies.

* **Runtime:** **Node.js**
* **Backend Framework:** **NestJS**
* **Frontend Framework:** **Angular**
* **Monorepo Tooling:** **Nx Workspace**
* **Testing Framework:** **Vitest**
* **Database Toolkit:** **Prisma**

---

## 📦 Core Packages

The following packages are included in this library collection, providing specialized functionality:

| Package Name | Description |
| :--- | :--- |
| **`console`** | Enhanced logging utilities for structured, context-aware, and colorized console output. |
| **`datetime`** | Utilities for date and time manipulation, formatting, and time zone handling. |
| **`errors`** | Standardized custom error classes and handlers for consistent error reporting across services. |
| **`names`** | Utilities for string case conversion (e.g., camelCase, snake\_case, PascalCase) and name generation. |
| **`nestjs`** | Core utilities, decorators, and providers specifically designed to enhance NestJS application development. |
| **`nestjs-prisma`** | A dedicated NestJS module for initializing, configuring, and injecting the Prisma Client. |
| **`prisma-extentions`** | Custom extensions and helpers for the Prisma Client to add reusable query logic or computed fields. |
| **`registry`** | A simple service for registering and retrieving configuration values, services, or module definitions at runtime. |
| **`types`** | A central package for defining and sharing common TypeScript type definitions, interfaces, and enums. |
| **`zod`** | Utilities for defining and validating data schemas using the **Zod** library. |

---

## 📖 Documentation

For full API documentation, installation guides, and usage examples for each package, please visit the dedicated documentation site:

[**https://beemood.github.io/libs**](https://beemood.github.io/libs)