const fs = require('fs');
const path = require('path');

const mdPath = path.join(__dirname, '../../chapter-02-brain-teasers.md');
const content = fs.readFileSync(mdPath, 'utf-8');

const problemBlocks = content.split('### Problem:').slice(1);

const problems = problemBlocks.map((block, idx) => {
  const lines = block.trim().split('\n');
  const title = lines[0].trim();
  
  // Very simple parsing for the MVP
  const setupParts = block.split('**Setup:**');
  let setup = '';
  let solution = '';

  // Some problems use "Question:" instead of "**Setup:**"
  if (setupParts.length > 1) {
     setup = setupParts[1].split('**Solution:**')[0].trim();
  } else {
     const altSetup = block.split('**Question:**');
     if (altSetup.length > 1) {
         setup = altSetup[1].split('**Solution:**')[0].trim();
     }
  }

  const solutionParts = block.split('**Solution:**');
  if (solutionParts.length > 1) {
     solution = solutionParts[1].split('---')[0].trim();
  } else {
      // "Solution (by strong induction):" variation
      const altSol = block.split('**Solution');
      if (altSol.length > 1) {
          solution = altSol[1].split('---')[0].replace(/^[^:]*:/, '').trim();
      }
  }

  return {
    uid: "ch02-p" + (idx + 1),
    chapter: 2,
    section: "2", 
    title: title.replace(/\*+/g, ''),
    setup: setup,
    solution: solution,
    tags: ["brain-teaser"],
    difficulty: "medium",
  };
});

const outPath = path.join(__dirname, '../seed.json');
fs.writeFileSync(outPath, JSON.stringify(problems, null, 2));

console.log(`Successfully parsed ${problems.length} problems!`);
console.log(`Please run: cd my-expo-app && npx convex import problems seed.json`);
