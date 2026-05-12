# BCC Design Improvement Slides — Text Wireframe

## Slide 1: Intro / Opening

```text
[Full screen / Minimal opening]

[Top center]
BCC Logo

[Center]
Hi [name],

We tested the new BCC website.
Here’s what we learned.

[Below headline]
From the latest usability report, we translated the key findings into proposed design improvements for the 2026 redesign of bangkokcable.com.

[Bottom center]
[ Click to continue ]
```

Layout note:
- Logo, greeting, headline, description, and CTA are vertically aligned in the center.
- Keep this slide simple. It should feel like an entry point into the improvement screens, not the full report.

---

## Slide 2: From Findings to Design Improvements / Index

```text
[Top left]
From Findings to Design Improvements

[Below title]
Based on the previous usability findings, we translated key user pain points into focused UI improvement areas.

[Main content area / 2-column index grid]

[Card 01]
01
Search / Product Finding
Improve search flexibility for incomplete, inconsistent, or non-exact keywords.

[Card 02]
02
All Products & Filtering
Make the full product list easier to browse, filter, and switch categories.

[Card 03]
03
Product Detail / Specifications
Make key specification details and PDF downloads easier to access.

[Card 04]
04
Documents & Certifications
Make certificates and download files easier to identify, scan, filter, and access.

[Card 05]
05
Navigation / Information Architecture
Support key journeys from product discovery and specification lookup to certification access, downloads, and B2B distribution inquiries.

[Card 06]
06
Brand Story / Trust Building
Make the company story, corporate video, and credibility cues more visible and engaging.

[Bottom note]
Each section includes what we improved, why it matters, and a before/after screen comparison.
```

Layout note:
- Title and intro copy stay at the top.
- The 6 index cards sit in the same visual area as a clickable menu.
- Each card can link to its related slide.

---

## Slide 3: Search / Product Finding

```text
[Slide / Section Layout]

ROW 1: Improvement title card + Finding/Evidence + What to do
These 3 blocks are aligned in the same top row.

┌────────────────────────────┐   ┌────────────────────────────────────────────┐   ┌──────────────────────────────────┐
│ [BCC Logo]                 │   │ Finding                                    │   │ What to do                       │
│                 IMPROVEMENT│   │ • Users struggle to find products when     │   │ • Add fuzzy search for non-exact │
│ 01              01         │   │   the keyword is not typed exactly as      │   │   keywords                       │
│                            │   │   expected.                                │   │ • Support variations such as     │
│ Search &                   │   │ • Incomplete keywords, inconsistent        │   │   “600V”, “600 V”, “600 volt”   │
│ product                    │   │   spacing, abbreviations, or different     │   │ • Synonym matching for product   │
│ finding.                   │   │   wording can break results.               │   │   names and specs                │
│                            │   │                                            │   │ • Suggest related products when  │
│                            │   │ Evidence                                   │   │   no exact result is found       │
│                            │   │ ┌──────────┐ ┌──────────┐ ┌──────────┐   │   │ • Clearer search placeholder     │
│                            │   │ │ Impact   │ │Confidence│ │Difficulty│   │   │   and hint text                  │
│                            │   │ │ High     │ │ High     │ │ High     │   │   │                                  │
│                            │   │ └──────────┘ └──────────┘ └──────────┘   │   │                                  │
│                            │   │ < BACK TO INDEX                            │   │                                  │
└────────────────────────────┘   └────────────────────────────────────────────┘   └──────────────────────────────────┘

ROW 2: Before / After toggle
The toggle sits below the top content and above the website preview frame.

┌────────────┬────────────┐
│ Before     │ After      │
└────────────┴────────────┘

ROW 3: Website preview frame
This area is reserved for the actual website screenshot, screen recording, or prototype video.

┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                              │
│                                                                                              │
│                                                                                              │
│                              [ Website screenshot / prototype video ]                         │
│                                                                                              │
│                              Place the before/after screen here.                              │
│                                                                                              │
│                                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────┘

[Optional callouts on preview]
- Supports non-exact keywords
- Shows close matches
- Search by product name, voltage, or specification
```

Layout relationship:
- Title card, Finding/Evidence, and What to do are aligned in the same top row.
- Finding and Evidence are stacked in the middle column.
- Evidence cards are placed in one horizontal row under the Finding text.
- What to do is placed on the same row as Finding, aligned to the right.
- Before / After toggle is placed below the top content, aligned to the left of the website preview.
- Website preview is placed below the toggle and spans almost the full slide width.
- Website preview frame is intentionally left as a placeholder for screenshot or video content.

---

## Slide 4: All Products & Filtering

```text
[Slide / Section Layout]

ROW 1: Improvement title card + Finding/Evidence + What to do
These 3 blocks are aligned in the same top row.

┌────────────────────────────┐   ┌────────────────────────────────────────────┐   ┌──────────────────────────────────┐
│ [BCC Logo]                 │   │ Finding                                    │   │ What to do                       │
│                 IMPROVEMENT│   │ • Users may need to browse the full        │   │ • Add an All Products entry      │
│ 02              02         │   │   product list and move across categories. │   │   point                          │
│                            │   │ • A complex product catalogue needs        │   │ • Allow users to switch product  │
│ All Products               │   │   strong filtering, but the interface      │   │   categories in place            │
│ & Filtering.               │   │   should still feel easy to scan.          │   │ • Add grouped filters such as    │
│                            │   │                                            │   │   product group, voltage, cable  │
│                            │   │ Evidence                                   │   │   type, and market               │
│                            │   │ ┌──────────┐ ┌──────────┐ ┌──────────┐   │   │ • Add applied filter chips       │
│                            │   │ │ Impact   │ │Confidence│ │Difficulty│   │   │ • Add result count and clear     │
│                            │   │ │ High     │ │ Medium   │ │ Medium   │   │   │   reset filter action            │
│                            │   │ └──────────┘ └──────────┘ └──────────┘   │   │                                  │
│                            │   │ < BACK TO INDEX                            │   │                                  │
└────────────────────────────┘   └────────────────────────────────────────────┘   └──────────────────────────────────┘

ROW 2: Before / After toggle

┌────────────┬────────────┐
│ Before     │ After      │
└────────────┴────────────┘

ROW 3: Website preview frame

┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                              │
│                                                                                              │
│                                                                                              │
│                              [ Website screenshot / prototype video ]                         │
│                                                                                              │
│                              Place the before/after screen here.                              │
│                                                                                              │
│                                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────┘

[Optional callouts on preview]
- Switch categories without going back
- Filter complex product lists more easily
- Clear applied filters and result count
```

Layout relationship:
- Title card, Finding/Evidence, and What to do are aligned in the same top row.
- Finding and Evidence are stacked in the middle column.
- Evidence cards are placed in one horizontal row under the Finding text.
- Before / After toggle sits below the top row.
- Website preview frame spans almost the full slide width and is reserved for screenshot or video content.

---

## Slide 5: Product Detail / Specifications

```text
[Slide / Section Layout]

ROW 1: Improvement title card + Finding/Evidence + What to do
These 3 blocks are aligned in the same top row.

┌────────────────────────────┐   ┌────────────────────────────────────────────┐   ┌──────────────────────────────────┐
│ [BCC Logo]                 │   │ Finding                                    │   │ What to do                       │
│                 IMPROVEMENT│   │ • Users need to access specifications      │   │ • Add a PDF download button near │
│ 03              03         │   │   quickly.                                 │   │   the specification table         │
│                            │   │ • Key details may exist in PDFs, but they  │   │ • Bring important PDF details    │
│ Product Detail             │   │   should also be easier to find directly   │   │   into the webpage where possible│
│ / Specifications.          │   │   on the product page.                     │   │ • Improve specification table    │
│                            │   │                                            │   │   readability, especially on     │
│                            │   │ Evidence                                   │   │   mobile                         │
│                            │   │ ┌──────────┐ ┌──────────┐ ┌──────────┐   │   │ • Add shortcuts to Specification,│
│                            │   │ │ Impact   │ │Confidence│ │Difficulty│   │   │   Cable Weight, and Download     │
│                            │   │ │ Medium   │ │ High     │ │ Low      │   │   │ • Add “Download full specification”│
│                            │   │ └──────────┘ └──────────┘ └──────────┘   │   │                                  │
│                            │   │ < BACK TO INDEX                            │   │                                  │
└────────────────────────────┘   └────────────────────────────────────────────┘   └──────────────────────────────────┘

ROW 2: Before / After toggle

┌────────────┬────────────┐
│ Before     │ After      │
└────────────┴────────────┘

ROW 3: Website preview frame

┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                              │
│                                                                                              │
│                                                                                              │
│                              [ Website screenshot / prototype video ]                         │
│                                                                                              │
│                              Place the before/after screen here.                              │
│                                                                                              │
│                                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────┘

[Optional callouts on preview]
- PDF download near specification table
- Key specs available on-page
- Shortcut to important technical sections
```

Layout relationship:
- This slide follows the same 3-block top row pattern.
- The middle column explains the finding and evidence.
- The right column lists practical UI changes.
- The preview should focus on the spec table, section shortcut, and PDF download area.

---

## Slide 6: Documents & Certifications

```text
[Slide / Section Layout]

ROW 1: Improvement title card + Finding/Evidence + What to do
These 3 blocks are aligned in the same top row.

┌────────────────────────────┐   ┌────────────────────────────────────────────┐   ┌──────────────────────────────────┐
│ [BCC Logo]                 │   │ Finding                                    │   │ What to do                       │
│                 IMPROVEMENT│   │ • Users can have difficulty identifying    │   │ • Add clear titles to every      │
│ 04              04         │   │   which file or certificate they need.     │   │   download and certificate card  │
│                            │   │ • Generic cards without titles, categories,│   │ • Add file category such as      │
│ Documents                  │   │   or descriptions make files harder to     │   │   Catalog, Certificate, or       │
│ & Certifications.          │   │   scan before opening.                     │   │   Product Sheet                  │
│                            │   │                                            │   │ • Add metadata such as file type,│
│                            │   │ Evidence                                   │   │   category, and updated date     │
│                            │   │ ┌──────────┐ ┌──────────┐ ┌──────────┐   │   │ • Add short descriptions         │
│                            │   │ │ Impact   │ │Confidence│ │Difficulty│   │   │ • Add search or filters for      │
│                            │   │ │ High     │ │ High     │ │ Low      │   │   │   document type                  │
│                            │   │ └──────────┘ └──────────┘ └──────────┘   │   │                                  │
│                            │   │ < BACK TO INDEX                            │   │                                  │
└────────────────────────────┘   └────────────────────────────────────────────┘   └──────────────────────────────────┘

ROW 2: Before / After toggle

┌────────────┬────────────┐
│ Before     │ After      │
└────────────┴────────────┘

ROW 3: Website preview frame

┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                              │
│                                                                                              │
│                                                                                              │
│                              [ Website screenshot / prototype video ]                         │
│                                                                                              │
│                              Place the before/after screen here.                              │
│                                                                                              │
│                                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────┘

[Optional callouts on preview]
- Clear document title
- Category and file type visible
- Filter by document type
```

Layout relationship:
- Keep the evidence cards in the middle column under Finding.
- The right column should stay action-focused.
- The preview should show document cards that are scannable without opening the file.

---

## Slide 7: Navigation / Information Architecture

```text
[Slide / Section Layout]

ROW 1: Improvement title card + Finding/Evidence + What to do
These 3 blocks are aligned in the same top row.

┌────────────────────────────┐   ┌────────────────────────────────────────────┐   ┌──────────────────────────────────┐
│ [BCC Logo]                 │   │ Finding                                    │   │ What to do                       │
│                 IMPROVEMENT│   │ • Users need clearer paths for product     │   │ • Restructure navigation around  │
│ 05              05         │   │   discovery, specification lookup,         │   │   key user tasks                 │
│                            │   │   certification access, downloads, and     │   │ • Add clearer menu items or      │
│ Navigation /               │   │   B2B distribution inquiries.              │   │   shortcuts to Products,         │
│ Information                │   │ • Users should not need to guess where     │   │   Certifications, and Downloads │
│ Architecture.              │   │   content belongs.                         │   │ • Make it easier to move between │
│                            │   │                                            │   │   product discovery, specs,      │
│                            │   │ Evidence                                   │   │   certificates, and downloads    │
│                            │   │ ┌──────────┐ ┌──────────┐ ┌──────────┐   │   │ • Add a clearer path for B2B     │
│                            │   │ │ Impact   │ │Confidence│ │Difficulty│   │   │   distribution inquiries         │
│                            │   │ │ High     │ │ Medium   │ │ Medium   │   │   │                                  │
│                            │   │ └──────────┘ └──────────┘ └──────────┘   │   │                                  │
│                            │   │ < BACK TO INDEX                            │   │                                  │
└────────────────────────────┘   └────────────────────────────────────────────┘   └──────────────────────────────────┘

ROW 2: Before / After toggle

┌────────────┬────────────┐
│ Before     │ After      │
└────────────┴────────────┘

ROW 3: Website preview frame

┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                              │
│                                                                                              │
│                                                                                              │
│                              [ Website screenshot / prototype video ]                         │
│                                                                                              │
│                              Place the before/after screen here.                              │
│                                                                                              │
│                                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────┘

[Optional callouts on preview]
- Navigation based on user tasks
- Clearer B2B distribution path
- Faster access to product and document journeys
```

Layout relationship:
- The top row explains the navigation problem and proposed direction before users see the menu screen.
- The preview can show desktop navigation, menu structure, or sitemap-style interaction.
- Callouts should focus on key entry points, not every menu item.

---

## Slide 8: Brand Story / Trust Building

```text
[Slide / Section Layout]

ROW 1: Improvement title card + Finding/Evidence + What to do
These 3 blocks are aligned in the same top row.

┌────────────────────────────┐   ┌────────────────────────────────────────────┐   ┌──────────────────────────────────┐
│ [BCC Logo]                 │   │ Finding                                    │   │ What to do                       │
│                 IMPROVEMENT│   │ • The website feels more modern, but       │   │ • Enlarge the corporate video    │
│ 06              06         │   │   company credibility and brand history    │   │   area                           │
│                            │   │   can still be communicated more clearly.  │   │ • Make the company story section │
│ Brand Story /              │   │ • The corporate video can work harder as   │   │   more prominent                 │
│ Trust Building.            │   │   a trust-building asset if it is more     │   │ • Add clearer company history,   │
│                            │   │   visible.                                 │   │   founding year, experience, and │
│                            │   │                                            │   │   milestones                     │
│                            │   │ Evidence                                   │   │ • Use factory, team, project, or │
│                            │   │ ┌──────────┐ ┌──────────┐ ┌──────────┐   │   │   quality process visuals        │
│                            │   │ │ Impact   │ │Confidence│ │Difficulty│   │   │ • Improve spacing, typography,   │
│                            │   │ │ Medium   │ │ Medium   │ │ Low      │   │   │   and hierarchy                  │
│                            │   │ └──────────┘ └──────────┘ └──────────┘   │   │                                  │
│                            │   │ < BACK TO INDEX                            │   │                                  │
└────────────────────────────┘   └────────────────────────────────────────────┘   └──────────────────────────────────┘

ROW 2: Before / After toggle

┌────────────┬────────────┐
│ Before     │ After      │
└────────────┴────────────┘

ROW 3: Website preview frame

┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                              │
│                                                                                              │
│                                                                                              │
│                              [ Website screenshot / prototype video ]                         │
│                                                                                              │
│                              Place the before/after screen here.                              │
│                                                                                              │
│                                                                                              │
└──────────────────────────────────────────────────────────────────────────────────────────────┘

[Optional callouts on preview]
- Larger corporate video area
- Company history is easier to notice
- Stronger credibility cues
```

Layout relationship:
- Keep this slide from feeling like only a “bigger video” fix.
- The preview should frame the video, history, milestones, and credibility cues as one trust-building section.
- Website preview frame is intentionally left as a placeholder for screenshot or video content.

---

## Slide 9: Final Summary

```text
[Top left]
What the Improved Experience Solves

[Main content area / Summary grid]

[Summary item 01]
Easier product search
Flexible search helps users find products with incomplete or non-exact keywords.

[Summary item 02]
Easier product browsing
All Products and filters help users explore complex product lists without going back and forth.

[Summary item 03]
Easier specification access
Key specs, section shortcuts, and PDF downloads are easier to find on product detail pages.

[Summary item 04]
Easier document discovery
Certificates and download files become easier to scan, filter, and identify.

[Summary item 05]
Easier journey navigation
Navigation supports product, document, certification, and B2B journeys more clearly.

[Summary item 06]
Easier trust building
Company story, video, and credibility cues help users understand BCC’s experience and scale.

[Closing line]
The improvements focus on reducing search friction, improving product discovery, and making technical information easier to access and easier to trust.

[Bottom actions]
[ Back to index ]
```

Layout note:
- Use this slide as a clean closing summary.
- The 6 summary items can mirror the index from Slide 2, but with outcome-focused wording.

---


```text
[Top left]
Slide number / Task area title

[Hero statement]
One clear sentence that explains the improvement outcome.

[Main layout]

[Left panel]
Finding / Problem
What users struggled with.

What to Do
Key improvement actions.

Data / Evidence
Metric or finding from the previous task list.

[Impact chips]
Impact: High / Medium / Low | Confidence: High / Medium / Low | Difficulty: High / Medium / Low

[Right panel]
[Before / After toggle]
Before | After

[Website preview frame]
Reserved for screen image or video

[Callout labels]
2–3 labels pointing to the improved UI.

[Bottom]
← Back to index
```

Recommended chip order:
Impact first, then Confidence, then Difficulty.

