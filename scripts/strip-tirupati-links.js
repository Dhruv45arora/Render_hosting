/**
 * Remove Tirupati Technologies links from CMS data files.
 * Only strips real markdown/HTML links — never skips from an unrelated `[`.
 */
const fs = require("fs");
const path = require("path");

const files = ["data/pages.ts", "data/blog.ts", "data/page-enrichments.ts"];

function stripMarkdownLinks(s) {
  let out = "";
  let i = 0;
  while (i < s.length) {
    if (s[i] === "[") {
      // Label must close with ](url) — label capped so we never jump across the file
      const maxLabel = 120;
      const slice = s.slice(i + 1, i + 1 + maxLabel);
      const labelEnd = slice.indexOf("]");
      if (labelEnd !== -1 && slice[labelEnd + 1] === "(") {
        const absLabelEnd = i + 1 + labelEnd; // index of ]
        const urlStart = absLabelEnd + 2; // after ](
        const urlEnd = s.indexOf(")", urlStart);
        if (urlEnd !== -1 && urlEnd - urlStart < 200) {
          const url = s.slice(urlStart, urlEnd);
          if (/^https:\/\/tirupati-technologies\.com/i.test(url)) {
            i = urlEnd + 1;
            continue;
          }
        }
      }
    }
    out += s[i];
    i += 1;
  }
  return out;
}

function stripHtmlAnchors(s) {
  // Non-greedy, same-line preferred; allow escaped quotes in TS strings
  return s.replace(
    /<a\b[^>]*href\s*=\s*(?:\\["']|["'])https:\/\/tirupati-technologies\.com[^"'\\]*(?:\\["']|["'])[^>]*>[^<]*<\/a>/gi,
    ""
  );
}

function cleanTails(s) {
  const tails = [
    /\s*does not hire bikes\./gi,
    /\s*does not rent vehicles\./gi,
    /\s*does not run the taxi\./gi,
    /\s*does not sell that seat\./gi,
    /\s*is not the booking desk\./gi,
    /\s*is not the wedding desk\./gi,
    /\s*is not a rental listing\./gi,
    /\s*is not the yatra desk\./gi,
    /\s*is not this route\./gi,
    /\s*is not the nameboard\./gi,
    /\s*is not the name board\./gi,
    /\s*is not the bike handover\./gi,
    /\s*is not the pickup desk\./gi,
    /\s*are not the handover counter\./gi,
    /\s*is not the SUV list\./gi,
    /\s*are not the rental terms\./gi,
    /\s*is not our cab desk\./gi,
    /\s*is outside this quote\./gi,
    /\s*is not a vehicle card\./gi,
    /\s*is not the fleet\./gi,
    /\s*is not that hub\./gi,
    /\s*are not the taxi quote\./gi,
    /\s*is a separate list\./gi,
    /\s*is a separate directory\./gi,
    /\s*is a different business\./gi,
    /\s*is a different company\./gi,
    /\s*is a different site\./gi,
    /\s*is a different firm\./gi,
    /\s*is a different desk\./gi,
    /\s*is a separate business\./gi,
    /\s*is a separate company\./gi,
    /\s*is unrelated to the fleet\./gi,
    /\s*is unrelated\./gi,
    /\s*is separate from the car\./gi,
    /\s*is separate\./gi,
    /\s*are a different site\./gi,
    /\s*sit on another site\./gi,
    /\s*is not the parking note\./gi,
    /\s*is not the booking advice\./gi,
    /\s*is not the circuit planner\./gi,
    /\s*are not a scooty comparison\./gi,
    /\s*is not this comparison\./gi,
    /\s*is not the driving note\./gi,
    /\s*is not the wedding fleet\./gi,
    /\s*is not the checklist\./gi,
    /\s*are not the riding rule\./gi,
    /\s*does not supply the van\./gi,
    /\s*is not the rate card\./gi,
    /\s*is not the exit meeting point\./gi,
    /\s*are not the walkaround\./gi,
    /\s*Tirupati Technologies is a different company\./gi,
    /\s*For the local technology studio[^.]*\./gi,
    /\s*To write to the technology studio instead, use\./gi,
    /\s*The technology studio's own form is\./gi,
    /\s*See\./g,
  ];
  let out = s;
  for (const p of tails) out = out.replace(p, "");
  out = out.replace(/ {2,}/g, " ");
  // Space before a single period inside prose (do NOT touch `...` spreads)
  out = out.replace(/ \.(?!\.)/g, ".");
  // Dangling connectors before a closing quote (no space: `and"`)
  out = out.replace(/,?\s+and\s*"/g, '."');
  out = out.replace(/,\s+\.(?!\.)/g, ".");
  out = out.replace(/,\s+not\./gi, ".");
  return out;
}

function clean(raw) {
  return cleanTails(stripHtmlAnchors(stripMarkdownLinks(raw)));
}

const root = path.resolve(__dirname, "..");
let failed = false;
for (const rel of files) {
  const file = path.join(root, rel);
  const before = fs.readFileSync(file, "utf8");
  const countBefore = (before.match(/tirupati-technologies/gi) || []).length;
  const after = clean(before);
  const countAfter = (after.match(/tirupati-technologies/gi) || []).length;
  fs.writeFileSync(file, after);
  console.log(`${rel}: tirupati ${countBefore} -> ${countAfter}`);
  if (countAfter > 0) failed = true;
  if (/sections:\s*"/.test(after)) {
    console.error(`BROKEN sections string in ${rel}`);
    failed = true;
  }
}

process.exit(failed ? 1 : 0);
