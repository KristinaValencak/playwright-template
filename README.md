# Playwright + Cucumber BDD Framework

This repository contains a reusable UI test automation framework designed for client projects.

It is built with:

- **Playwright** for browser automation  
- **Cucumber** for Behavior-Driven Development (BDD) scenarios (`.feature` files)  
- Structured test lifecycle using **Hooks** and shared **World context**  
- Optional **Page Object Model (POM)** for scalable and maintainable test logic  

---

## Prerequisites

Ensure the following are installed:

- Node.js 18+ (Node.js 20+ recommended)  
- npm 9+  
- Access to the target environment (test, staging, or production URL)  

---

## Installation

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Optional (Linux environments):

```bash
npx playwright install --with-deps
```

---

## Environment Configuration

Create a `.env` file based on `.env.example` and configure it according to your environment:

```env
BASE_URL=https://your-domain.com
HEADLESS=true
SLOWMO_MS=0
BROWSER=chromium
DEMO_MODE=false
VIDEO=false
IGNORE_HTTPS_ERRORS=false
```

### Environment Variables

- `BASE_URL` – Base URL used for test navigation  
- `HEADLESS` – Runs browser in headless (`true`) or visible (`false`) mode  
- `SLOWMO_MS` – Delay between actions (in milliseconds)  
- `BROWSER` – Supported values: `chromium`, `firefox`, `webkit`  
- `DEMO_MODE` – Enables human-like interaction behavior  
- `VIDEO` – Enables recording of test execution  
- `IGNORE_HTTPS_ERRORS` – Allows testing environments with custom/self-signed certificates  
- `CUCUMBER_TAGS` – Optional filter for running specific scenarios  

---

## Running Tests

### Default execution

```bash
npm test
```

Runs all available test scenarios.

---

### Headed mode (visible browser)

```bash
npm run test:headed
```

---

### Demo mode (with interaction delays and video)

```bash
npm run test:demo
```

---

### Debug mode

```bash
npm run test:debug
```

---

### Running specific scenarios

**PowerShell**

```powershell
$env:CUCUMBER_TAGS='@smoke and not @wip'
npm test
```

**Windows CMD**

```bat
set CUCUMBER_TAGS=@smoke and not @wip && npm test
```

---

## Project Structure

```text
Playwright/
├─ config/
│  └─ env.js
├─ features/
│  └─ *.feature
├─ steps/
│  └─ *.js
├─ support/
│  ├─ hooks.js
│  └─ world.js
├─ utils/
│  ├─ actions.js
│  └─ humanActions.js
├─ .env.example
├─ cucumber.cjs
├─ playwright.config.js
└─ package.json
```

---

## Framework Architecture

- **features/** – Contains Gherkin-based test scenarios  
- **steps/** – Implements step definitions (Given / When / Then)  
- **support/world.js** – Shared scenario context (`browser`, `context`, `page`)  
- **support/hooks.js** – Manages browser lifecycle and failure handling  
- **config/env.js** – Centralized environment configuration  

This structure ensures clear separation of concerns and maintainability.

---

## Reporting

Test execution generates the following artifacts:

- Cucumber report: `cucumber-report.json`  
- Failure screenshots: `test-results/screenshots/`  
- Video recordings (if enabled): `test-results/videos/`  

Screenshots are automatically captured on test failure.

---

## Notes

- The framework is environment-independent and easily adaptable  
- Test scenarios can be extended based on project requirements  
- Supports tagging and selective execution for flexible test runs  