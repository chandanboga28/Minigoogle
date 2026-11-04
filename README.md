# Mini Google 1998

A retro search engine simulation built for an AI lab demonstrating the evolution of web search ranking:
- **The Old Way (1997):** Simple keyword density counting (vulnerable to keyword stuffing and spam).
- **The Surfer Way (1998):** Larry Page and Sergey Brin's PageRank algorithm modeled via a **Random Surfer** across a graph of 1,000 web pages.

---

## 🚀 Features

- **Single-File Architecture:** All HTML, CSS, and JavaScript are bundled inside `index.html`. No servers, no npm packages, and no external dependencies.
- **Random Surfer Simulation:**
  - Simulates 100,000 moves across 1,000 connected web pages.
  - 15% damping factor / teleportation probability (surfer jumps to a random page).
  - 85% probability of following an outbound link from the current page.
  - Normalized surfer scores sum up to exactly 100.0%.
- **Side-by-Side Comparison:**
  - **Left column:** 1997 Keyword Counting ranking.
  - **Right column:** 1998 PageRank / Random Surfer ranking with inbound link counters (`Links in: N`).
- **Spam Demotion Demonstration:** Shows how keyword-stuffed spam pages (e.g., `pizza-pizza-pizza.com`, `cricket-cricket-cricket.com`) top the 1997 ranking but sink to the bottom under 1998 PageRank due to lack of inbound citations.
- **Search History:**
  - Persisted in browser `localStorage`.
  - Reverse chronological order (latest search first).
  - Deduplication (re-searching a term moves it to the top).
  - One-click re-search and "Clear History" support.
- **Rerun Simulation:** "🎲 Run the surfer again" button re-executes the 100,000-step simulation dynamically in real time.

---

## 💻 How to Run

Simply open `index.html` in any modern web browser:

```bash
open index.html
```

Or double-click `index.html` in your file explorer.

