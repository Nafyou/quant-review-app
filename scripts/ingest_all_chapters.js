const fs = require('fs');
const path = require('path');

const repoPath = path.join(__dirname, '../../reference-repo');
const files = fs.readdirSync(repoPath).filter(f => f.startsWith('chapter') && f.endsWith('.md'));

let allProblems = [];
let problemCounter = 1;

files.forEach(file => {
  const content = fs.readFileSync(path.join(repoPath, file), 'utf-8');
  
  // Extract Chapter Number
  const match = file.match(/chapter[-_](\d+)/);
  const chapterNum = match ? parseInt(match[1], 10) : 0;
  
  // We split by standard headers or bold headers marking problems
  // chapter 2 uses: "### Problem: Trailing Zeros"
  // chapter 3 uses: "**Problem — Expected Value Using Integration**" or "**Problem A — ∫ ln(x) dx**"
  
  // Normalize the splitters into a unique token
  const normalized = content.replace(/(### Problem:|\*\*Problem[^*\n]*[—\-:]+)/g, '|||PROBLEM_SPLIT|||');
  const blocks = normalized.split('|||PROBLEM_SPLIT|||').slice(1); // Drop the intro text
  
  blocks.forEach((block) => {
    const lines = block.trim().split('\n');
    let title = lines[0].replace(/\*\*/g, '').trim(); // Remove trailing ** from chapter 3 titles
    
    let setup = '';
    let solution = '';

    // Look for "**Question:**" or "**Setup:**"
    const setupParts = block.split(/\*\*(?:Question|Setup):\*\*/);
    if (setupParts.length > 1) {
       setup = setupParts[1].split(/\*\*Solution[^*\n]*\*\*/)[0].trim();
    } else {
       // fallback: everything before "Solution:"
       setup = block.split(/\*\*Solution[^*\n]*\*\*/)[0].replace(lines[0], '').trim();
    }

    const solParts = block.split(/\*\*Solution[^*\n]*\*\*/);
    if (solParts.length > 1) {
       solution = solParts[1].split('---')[0].trim(); // Cut off at horizontal rule if exists
    } else {
       solution = "No solution found.";
    }

    const uid = `ch${chapterNum.toString().padStart(2, '0')}-p${problemCounter++}`;

    allProblems.push({
      uid,
      chapter: chapterNum,
      section: chapterNum.toString(),
      title,
      setup,
      solution,
      tags: ["quant", `chapter-${chapterNum}`],
      difficulty: "medium", // Default
    });
  });
});

const outPath = path.join(__dirname, '../seed.json');
fs.writeFileSync(outPath, JSON.stringify(allProblems, null, 2));

console.log(`Successfully parsed ${allProblems.length} problems across ${files.length} chapters!`);
