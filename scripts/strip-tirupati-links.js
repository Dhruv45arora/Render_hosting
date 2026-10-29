const fs = require("fs");
const path = require("path");

const files = ["data/pages.ts", "data/blog.ts", "data/page-enrichments.ts"];

function clean(raw) {
  let out = raw;
  // Markdown links
  out = out.replace(/\[[^\]]*\]\(https:\/\/tirupati-technologies\.com[^)]*\)/gi, "");
  // HTML anchors (plain or TS-escaped quotes)
  out = out.replace(/<a[^>]*href=\\?["']https:\/\/tirupati-technologies\.com[^"'\\]*\\?["'][^>]*>[^<]*<\/a>/gi, "");

  const leftover = [
    / See \./g,
    / For the local technology studio[^.]*\./g,
    / Tirupati Technologies is a different company\./gi,
    / The road is Mussoorie, and \./g,
    / The lake town is Nainital, and \./g,
    / The hop is in Dehradun, and \./g,
    / The station is in Dehradun, and \./g,
    / ISBT here is Dehradun, and \./g,
    / Arrive by bus with bags\? We meet near ISBT with a car or Innova for Dehradun hotels, Mussoorie or Rishikesh — same desk as our Clock Tower fleet\. \./g,
    / Jolly Grant serves Dehradun, and \./g,
    / The climb is to Mussoorie, and \./g,
    / The town is Dehradun, and \./g,
    / Packages are for Dehradun, and \./g,
    / The ghats are in Haridwar, and \./g,
    / Town notes: and \./g,
    / Town notes: \./g,
    / These rates are for Dehradun rentals, not \./g,
    / The grid is the Dehradun fleet, and \./g,
    / Trips leave from Dehradun, and \./g,
    / To write to the technology studio instead, use \./g,
    / The technology studio's own form is \./g,
    / is a separate business\./g,
    / is a separate company\./g,
    / is a different company\./g,
    / is a different site\./g,
    / is a different firm\./g,
    / is a different desk\./g,
    / is unrelated to the fleet\./g,
    / is unrelated\./g,
    / is separate from the car\./g,
    / is separate\./g,
    / are a different site\./g,
    / sit on another site\./g,
    / does not rent vehicles\./g,
    / does not hire bikes\./g,
    / does not run the taxi\./g,
    / does not sell that seat\./g,
    / is not the booking desk\./g,
    / is not the wedding desk\./g,
    / is not a rental listing\./g,
    / is not the yatra desk\./g,
    / is not this route\./g,
    / is not the nameboard\./g,
    / is not the bike handover\./g,
    / is not the pickup desk\./g,
    / are not the handover counter\./g,
    / is not the SUV list\./g,
    / are not the rental terms\./g,
    / is not our cab desk\./g,
    / is outside this quote\./g,
    / is not a vehicle card\./g,
    / is not the fleet\./g,
    / is not that hub\./g,
    / are not the taxi quote\./g,
    / is a separate list\./g,
    / is a different business\./g,
    / is not the parking note\./g,
    / is not the booking advice\./g,
    / is not the circuit planner\./g,
    / are not a scooty comparison\./g,
    / is not this comparison\./g,
    / is not the driving note\./g,
    / is not the wedding fleet\./g,
    / is not the name board\./g,
    / Dehradun's studio page is a different business\./gi,
    / The studio serving Dehradun does not sell that seat\./gi,
    / The Mussoorie town page is not the parking note\./gi,
    / The Rishikesh town page is not the booking advice\./gi,
    / This Dehradun technology studio is not the circuit planner\./gi,
    / Notes on the Dehradun studio are not a scooty comparison\./gi,
    / The Haridwar town page is not this comparison\./gi,
    / The Nainital town page is not the driving note\./gi,
    / Mussoorie's studio page is not the wedding fleet\./gi,
    / Dehradun's office listing is not the name board\./gi,
    / \[Their Mussoorie listing\] is a different site\./gi,
    / \[the Dehradun studio profile\] is not the fleet\./gi,
    / \[The Dehradun technology desk\] is not that hub\./gi,
    / \[Dehradun web studio notes\] are not the taxi quote\./gi,
    / is not the checklist\./gi,
    / are not the riding rule\./gi,
    / does not supply the van\./gi,
    / is a separate directory\./gi,
    / is not the rate card\./gi,
    / is not the exit meeting point\./gi,
    / are not the walkaround\./gi,
  ];

  for (const p of leftover) out = out.replace(p, "");

  // Punctuation cleanup
  out = out.replace(/ {2,}/g, " ");
  out = out.replace(/ \./g, ".");
  out = out.replace(/\.\.+/g, ".");
  out = out.replace(/,\./g, ".");
  out = out.replace(/;\./g, ".");
  out = out.replace(/ and \./g, ".");
  out = out.replace(/, and\./g, ".");
  out = out.replace(/,\s*\./g, ".");
  out = out.replace(/\.\s*\./g, ".");
  // trailing ", and" / " and" before closing tags
  out = out.replace(/,?\s+and\s*(<\/p>)/gi, ".$1");
  out = out.replace(/,?\s+and\s*"$/gm, '."');
  // "rates are for Dehradun rentals, not." -> "rates are for Dehradun rentals."
  out = out.replace(/, not\./gi, ".");
  out = out.replace(/ not\./gi, ".");
  return out;
}

const root = path.resolve(__dirname, "..");
for (const rel of files) {
  const file = path.join(root, rel);
  const before = fs.readFileSync(file, "utf8");
  const countBefore = (before.match(/tirupati-technologies/gi) || []).length;
  const after = clean(before);
  const countAfter = (after.match(/tirupati-technologies/gi) || []).length;
  fs.writeFileSync(file, after);
  console.log(`${rel}: ${countBefore} -> ${countAfter}`);
}
