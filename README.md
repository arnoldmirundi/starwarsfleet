# Star Wars Fleet

A modern Angular 21 single-page application that displays Star Wars starship data in a responsive, editable, infinitely scrolling data grid.

The project was built as a front-end technical assessment using Angular, TypeScript, TailwindCSS, and AG Grid.

---

# Features

- Responsive single-page layout
- Infinite scrolling data grid
- Client-side cached pagination
- Search/filter functionality
- Editable grid cells
- Column resizing
- Error handling with retry support
- Responsive horizontal scrolling
- Modern Apple-inspired UI styling
- Angular Signals state management
- AG Grid virtualization and rendering optimizations

---

# Tech Stack

- Angular 21
- TypeScript
- TailwindCSS
- AG Grid Community
- Angular Signals
- RxJS

---

# Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project directory:

```bash
cd starwars-fleet
```

Install dependencies:

```bash
npm install
```

---

# Running the Application

Start the development server:

```bash
ng serve
```

Open:

```bash
http://localhost:4200
```

The application automatically reloads whenever source files are modified.

---

# Building the Application

To build the project:

```bash
ng build
```

Production artifacts will be generated inside:

```bash
dist/
```

---

# Running Tests

Run all tests:

```bash
ng test
```

The project includes:
- Service tests
- Grid/component tests

---

# SWAPI Resource Used

The application uses the **Starships** resource.

Primary intended API:

```bash
https://swapi.dev/api/starships
```

Fallback API used during development:

```bash
https://swapi.info/api/starships
```

---

# API Fallback Note

The assessment specifies usage of:

```bash
https://swapi.dev/
```

with server-side pagination using:

```bash
?page=
```

During development, `swapi.dev` was unavailable and unstable.

To ensure the application remained functional and demonstrable, the project uses:

```bash
https://swapi.info/api/starships
```

as a SWAPI-compatible fallback source.

Unlike `swapi.dev`, `swapi.info` returns the complete starships array instead of paginated `{ results }` responses.

To preserve the required UX and architecture:
- pagination behavior is simulated inside the Angular store/service layer
- infinite scrolling still works as required
- pages are cached in memory
- rows append seamlessly during scrolling
- no loading indicators appear during scroll loading

No write operations are sent to any API.

---

# Infinite Scroll Implementation

Infinite scrolling is implemented inside the `Starships` service.

Behavior:
- Initial starships are loaded when the application starts
- Additional rows are appended automatically when the user scrolls near the bottom of the AG Grid viewport
- Rows are loaded seamlessly without any spinner, skeleton, or “loading more” indicator
- Page chunks are cached using an in-memory `Map<number, Starship[]>`
- Duplicate page fetching is prevented

Because `swapi.info` returns the full dataset, pagination is simulated client-side using:
- `currentPage`
- `pageSize`
- `slice()`

This preserves the intended infinite-scroll UX while avoiding overfetching during scrolling.

---

# Editable Cells

The following column is editable:

- `Name`

Editing behavior:
- Double-click a cell to begin editing
- Press `Enter` to confirm edits
- Clicking outside the cell confirms edits
- Pressing `Escape` cancels editing

Edits are stored only in Angular client-side state using Signals.

No updates are sent to SWAPI.

The edited values are managed inside:

```bash
src/app/services/starships.ts
```

through:

```ts
updateStarships()
```

---

# Column Resizing

Column resizing is implemented using AG Grid Community.

Implementation:
- Each column uses:

```ts
resizable: true
```

- Width updates are applied immediately during drag interactions
- Horizontal scrolling is automatically enabled on smaller screens

This keeps the grid usable on narrow viewports.

---

# Search / Filtering

The global search input filters rows by:
- starship name

Behavior:
- filtering updates instantly while typing
- filtering is case-insensitive
- an empty state is displayed if no rows match

---

# Error Handling

If the API request fails:
- an error message is displayed
- a retry button is shown

Retrying triggers a fresh data load.

---

# Responsive Design

The layout is responsive and optimized for:
- desktop
- tablet
- narrow viewports

Responsive behavior includes:
- flexible layout sizing
- full-height viewport grid
- horizontal grid scrolling
- responsive search bar sizing

---

# State Management

The application uses Angular Signals for state management.

Signals manage:
- starships
- loading state
- error state
- pagination state
- search filtering

---

# Third-Party Packages Used

## AG Grid Community

Used for:
- virtualization
- high-performance rendering
- editable cells
- column resizing
- responsive data grid behavior

Packages:

```bash
ag-grid-angular
ag-grid-community
```

## TailwindCSS

Used for:
- responsive layout
- utility styling
- typography
- spacing
- modern UI implementation

---

# Trade-offs and Limitations

## SWAPI Availability

The main trade-off is the use of `swapi.info` instead of `swapi.dev`.

Reason:
- `swapi.dev` was unavailable during development

Because of this:
- true server-side pagination could not be demonstrated directly
- pagination is simulated client-side

However:
- the infinite-scroll UX remains the same
- caching behavior is preserved
- scrolling remains seamless
- overfetching during scrolling is avoided

## Persistence

Edits are stored only in memory.

Refreshing the page resets all edits.

## Backend

This is a front-end-only implementation with no persistence layer or authentication.

---

# Tests Included

## Service Test

Tests:
- pagination logic
- combining page chunks
- infinite-scroll append behavior

File:

```bash
src/app/services/starships.spec.ts
```

## Grid / Component Test

Tests:
- editable grid cell behavior
- client-side state updates

File:

```bash
src/app/components/fleet/fleet.spec.ts
```

---

# Project Structure

```bash
src/app/
├── components/
│   └── fleet/
├── models/
├── services/
├── app.ts
├── app.routes.ts
```

---

# Author

Arnold Mirundi