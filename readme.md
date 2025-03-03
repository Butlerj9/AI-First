# Enhanced AI-First Development Portal

A comprehensive web application that displays your AI-First development materials with all visual elements properly rendered, including interactive charts, diagrams, and formatted documentation.

## Features

- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Charts**: Visualizes all metrics from your dashboard components
- **Mermaid Diagrams**: Renders workflow diagrams with proper formatting
- **Table of Contents**: Navigable sidebar with links to document sections
- **Tabbed Interface**: Easy navigation between different content types
- **Markdown Rendering**: Properly formats your documentation with headings, lists, tables, etc.

## Installation

### Prerequisites

- Python 3.7 or higher
- Flask

### Setup Instructions

1. Create a directory structure for the project:

```bash
mkdir -p ai-first-portal/static/js
mkdir -p ai-first-portal/templates
mkdir -p ai-first-portal/data
```

2. Copy the source files to their respective locations:

   - Copy `app.py` to `ai-first-portal/`
   - Copy `templates/index.html` to `ai-first-portal/templates/`
   - Copy `static/js/app.js` to `ai-first-portal/static/js/`
   - Copy your data files to `ai-first-portal/data/`:
     - `ai-first.md`
     - `ai-first-dashboard.tsx`
     - `ai-first-implementation.tsx`
     - `development-comparison.tsx`
     - `traditional-workflow.mermaid`
     - `ai-assisted-workflow.mermaid`
     - `ai-first-workflow.mermaid`

3. Install Flask:

```bash
pip install flask
```

4. Run the application:

```bash
cd ai-first-portal
python app.py
```

5. Open your browser and navigate to `http://localhost:5000`

## Troubleshooting

If you encounter issues with the application:

### Charts Not Rendering

Make sure your browser can access the following CDN resources:
- `https://unpkg.com/react@18/umd/react.production.min.js`
- `https://unpkg.com/react-dom@18/umd/react-dom.production.min.js`
- `https://unpkg.com/recharts@2.10.4/umd/Recharts.js`

If these are blocked in your environment, the application will fall back to simpler D3-based charts.

### Mermaid Diagrams Not Rendering

Ensure your browser can access:
- `https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js`

If there are issues with Mermaid rendering, check browser console for errors.

### Content Not Loading

Make sure all files are in the correct locations and have the right names:
- Data files should be in the `data` directory
- File names should match exactly (case-sensitive)

## Customization

You can customize the appearance of the portal by:

### Modifying CSS Styles

Edit the `<style>` section in `templates/index.html` to change colors, fonts, spacing, etc.

### Adding Additional Tabs

To add a new tab:
1. Add a new button in the tabs section of `templates/index.html`
2. Create a new template for your tab content
3. Add a new case in the `loadTabContent` function in `static/js/app.js`

### Linking from Documentation to Visuals

You can add links from your markdown document to specific tabs or visualizations:

1. Edit your markdown file to include links like:
   ```markdown
   [See the dashboard](#dashboard)
   [View development comparison](#comparison)
   ```

2. Modify the `app.js` file to handle these links:
   ```javascript
   // Add this to the initOverviewTab function
   document.querySelectorAll('#markdown-content a[href^="#"]').forEach(anchor => {
       anchor.addEventListener('click', function (e) {
           e.preventDefault();
           const targetId = this.getAttribute('href').substring(1);
           const tabButton = document.getElementById(`tab-${targetId}`);
           if (tabButton) {
               tabButton.click();
           }
       });
   });
   ```

## Project Structure

```
ai-first-portal/
├── app.py                    # Flask server
├── static/
│   └── js/
│       └── app.js            # Client-side JavaScript
├── templates/
│   └── index.html            # HTML template
└── data/
    ├── ai-first.md           # Main documentation
    ├── ai-first-dashboard.tsx        # Dashboard components
    ├── ai-first-implementation.tsx   # Implementation strategies
    ├── development-comparison.tsx    # Approach comparison
    ├── traditional-workflow.mermaid  # Traditional workflow diagram
    ├── ai-assisted-workflow.mermaid  # AI-assisted workflow diagram
    └── ai-first-workflow.mermaid     # AI-first workflow diagram
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.