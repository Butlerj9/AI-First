// Enhanced markdown renderer with support for all heading levels
window.renderMarkdown = function(markdown) {
    if (!markdown) return '';
    
    // Process the markdown in steps to handle different elements properly
    let html = markdown;
    
    // Step 1: Preserve code blocks
    const codeBlocks = [];
    html = html.replace(/```([\s\S]*?)```/g, function(match) {
        const id = codeBlocks.length;
        codeBlocks.push(match);
        return `CODE_BLOCK_${id}`;
    });
    
    // Step 2: SPECIAL HANDLING FOR TABLES - Process tables first to avoid interference
    // More robust pattern for finding markdown tables
    const findTables = () => {
        const result = [];
        const lines = html.split('\n');
        let inTable = false;
        let currentTable = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            // Check if this line could be part of a table (starts and ends with pipe)
            if (line.startsWith('|') && line.endsWith('|')) {
                if (!inTable) {
                    inTable = true;
                }
                currentTable.push(lines[i]); // Keep original line with spacing
            } else if (inTable) {
                // We were in a table but this line doesn't match
                if (currentTable.length >= 3) { // Valid table needs at least header, separator, and one data row
                    result.push(currentTable.join('\n'));
                }
                currentTable = [];
                inTable = false;
            }
        }
        
        // Handle case where table is at the end of the document
        if (inTable && currentTable.length >= 3) {
            result.push(currentTable.join('\n'));
        }
        
        return result;
    };
    
    const tables = findTables();
    
    // Replace each table with HTML
    tables.forEach(tableText => {
        const rows = tableText.split('\n');
        let tableHTML = '<div class="overflow-x-auto my-6"><table class="min-w-full border-collapse border border-gray-300">\n';
        
        // Process rows
        let inHeader = true;
        
        rows.forEach((row, rowIndex) => {
            // Skip separator rows (contain only |, -, :, and spaces)
            if (row.match(/^\|[\s\-:\|]+\|$/)) {
                inHeader = false;
                return;
            }
            
            // Extract cells - split by |, remove first and last empty items
            let cells = row.split('|').slice(1, -1);
            
            // Start appropriate section (thead or tbody)
            if (rowIndex === 0 || (rowIndex === 1 && inHeader)) {
                tableHTML += '<thead>\n<tr>\n';
            } else if (rowIndex === 1 || (rowIndex === 2 && !inHeader)) {
                tableHTML += '<tbody>\n<tr>\n';
            } else {
                tableHTML += '<tr>\n';
            }
            
            // Process cells
            cells.forEach(cell => {
                cell = cell.trim();
                if (inHeader) {
                    // Remove ** from header cells
                    cell = cell.replace(/\*\*(.*?)\*\*/g, '$1');
                    tableHTML += `<th class="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold">${cell}</th>\n`;
                } else {
                    tableHTML += `<td class="border border-gray-300 px-4 py-2">${cell}</td>\n`;
                }
            });
            
            // Close row
            tableHTML += '</tr>\n';
            
            // Close header if needed
            if (rowIndex === 0 && !inHeader) {
                tableHTML += '</thead>\n';
            }
        });
        
        // Close final section
        if (inHeader) {
            tableHTML += '</thead>\n';
        } else {
            tableHTML += '</tbody>\n';
        }
        
        tableHTML += '</table></div>';
        
        // Replace the original table with HTML table
        // Escape special characters for regex replacement
        const escapedTableText = tableText
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            .replace(/\n/g, '\\n');
        
        const tableRegex = new RegExp(escapedTableText, 'g');
        html = html.replace(tableRegex, tableHTML);
    });
    
    // Step 3: Handle all heading levels properly
    html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-blue-800 mb-6 mt-8">$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-blue-800 mt-8 mb-4" id="$1">$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold text-blue-700 mt-6 mb-2" id="$1">$1</h3>');
    html = html.replace(/^#### (.*$)/gm, '<h4 class="text-lg font-semibold text-blue-600 mt-4 mb-1" id="$1">$1</h4>');
    html = html.replace(/^##### (.*$)/gm, '<h5 class="text-base font-semibold text-blue-500 mt-3 mb-1" id="$1">$1</h5>');
    html = html.replace(/^###### (.*$)/gm, '<h6 class="text-sm font-semibold text-blue-500 mt-3 mb-1" id="$1">$1</h6>');
    
    // Step 4: Pre-processing for the numbered list with subheadings pattern
    html = html.replace(/^(\d+)\.\s+(.*?):\s*$/gm, function(match, number, title) {
        return `<!--NUMBERED_HEADING_${number}--><h4 class="font-bold mt-4 mb-2">${number}. ${title}:</h4>`;
    });
    
    // Step 5: Process bullet lists
    let lines = html.split('\n');
    let inList = false;
    let listHtml = '';
    let processedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Check if this is a bullet point
        if (line.match(/^\s*[\-\*]\s+/)) {
            // If we're not already in a list, start one
            if (!inList) {
                listHtml = '<ul class="list-disc pl-5 space-y-2 mb-4">\n';
                inList = true;
            }
            
            // Process the bullet point content
            const content = line.replace(/^\s*[\-\*]\s+/, '');
            
            // Special handling for bullet points that are actually subheadings
            if (content.match(/^[A-Z].*?:$/)) {
                // This looks like a subheading (e.g., "Vector database persistence:")
                listHtml += `<li class="font-bold">${content}</li>\n`;
            } else {
                // Normal bullet point
                listHtml += `<li>${content}</li>\n`;
            }
        } else {
            // Not a bullet point - if we were in a list, close it
            if (inList) {
                listHtml += '</ul>';
                processedLines.push(listHtml);
                inList = false;
                listHtml = '';
            }
            
            // Add the non-bullet line
            processedLines.push(line);
        }
    }
    
    // If we're still in a list at the end, close it
    if (inList) {
        listHtml += '</ul>';
        processedLines.push(listHtml);
    }
    
    // Reassemble the processed lines
    html = processedLines.join('\n');
    
    // Step 6: Handle the specific numbered pattern in the document
    html = html.replace(/<!--NUMBERED_HEADING_(\d+)--><h4.*?<\/h4>\s*<ul/g, function(match, number) {
        return match.replace('<ul', `<div class="ml-6"><ul`);
    });
    html = html.replace(/<\/ul>\s*<!--NUMBERED_HEADING_/g, '</ul></div>\n<!--NUMBERED_HEADING_');
    
    // Special handling for the last list in the section
    html = html.replace(/<\/ul>\s*(<h|$)/g, '</ul></div>\n$1');
    
    // Step 7: Handle paragraphs (non-heading, non-list lines)
    html = html.replace(/^(?!<h|<ul|<ol|<li|<\/ul|<\/ol|<table|<\/table|<tr|<\/tr|<td|<th|<tbody|<thead|<!--NUMBERED_HEADING|<div|<\/div|$)(.*$)/gm, '<p class="mb-4">$1</p>');
    
    // Step 8: Style enhancements
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');
    html = html.replace(/^\-\-\-$/gm, '<hr class="my-6 border-t border-gray-300">');
    
    // Step 9: Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
    
    // Step 10: Restore code blocks
    html = html.replace(/CODE_BLOCK_(\d+)/g, function(match, id) {
        const code = codeBlocks[parseInt(id)]
            .replace(/```(\w*)\n([\s\S]*?)```/g, (match, language, code) => {
                return `<pre class="bg-gray-100 p-4 rounded overflow-x-auto mb-4"><code class="language-${language || 'text'}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
            });
        return code;
    });
    
    // Final cleanup - remove any leftover markers and fix potential issues
    html = html.replace(/<!--NUMBERED_HEADING_\d+-->/g, '');
    
    // Handle potential duplicate closing divs
    html = html.replace(/<\/div>\s*<\/div>/g, '</div>');
    
    // One last attempt to ensure all "heading + list" patterns are properly formatted
    html = html.replace(/<h4[^>]*>(\d+\..*?)<\/h4>\s*<ul/g, 
                         '<h4 class="font-bold mt-4 mb-2">$1</h4>\n<div class="ml-6"><ul');
    
    return html;
}