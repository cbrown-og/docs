const fs = require('fs');
const path = require('path');

const docsDir = './docs'; // Point this to your scraped files folder

function getNavigation(dir) {
  const items = fs.readdirSync(dir);
  return items.map(item => {
    const fullPath = path.join(dir, item);
    const relativePath = path.relative('./', fullPath).replace('.mdx', '');
    
    if (fs.statSync(fullPath).isDirectory()) {
      return {
        group: item.charAt(0).toUpperCase() + item.slice(1),
        pages: getNavigation(fullPath)
      };
    } else if (item.endsWith('.mdx')) {
      return relativePath;
    }
  }).filter(Boolean);
}

const nav = getNavigation(docsDir);
console.log(JSON.stringify(nav, null, 2));