from flask import Flask, render_template, send_from_directory, jsonify, request
import os
import json
import re

app = Flask(__name__, static_folder='static', template_folder='templates')

# Root directory containing all our files
DATA_DIR = 'data'

# Ensure the data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

# Create a dictionary to map file extensions to their content types
CONTENT_TYPES = {
    '.md': 'text/markdown',
    '.tsx': 'application/typescript',
    '.mermaid': 'text/plain',
    '.json': 'application/json'
}

# Function to extract headings from markdown for TOC
def extract_headings(markdown_text):
    headings = []
    lines = markdown_text.split('\n')
    for line in lines:
        if line.startswith('## '):
            # Get the heading text and create an ID from it
            heading_text = line[3:].strip()
            heading_id = heading_text.lower().replace(' ', '-').replace(':', '').replace(',', '')
            # Remove any remaining special characters
            heading_id = re.sub(r'[^a-z0-9-]', '', heading_id)
            headings.append({
                'text': heading_text,
                'id': heading_id,
                'level': 2
            })
        elif line.startswith('### '):
            heading_text = line[4:].strip()
            heading_id = heading_text.lower().replace(' ', '-').replace(':', '').replace(',', '')
            heading_id = re.sub(r'[^a-z0-9-]', '', heading_id)
            headings.append({
                'text': heading_text,
                'id': heading_id,
                'level': 3
            })
    return headings

# Preprocess the markdown content to add IDs to headings
def preprocess_markdown(markdown_text):
    lines = markdown_text.split('\n')
    processed_lines = []
    
    for line in lines:
        if line.startswith('## '):
            heading_text = line[3:].strip()
            heading_id = heading_text.lower().replace(' ', '-').replace(':', '').replace(',', '')
            heading_id = re.sub(r'[^a-z0-9-]', '', heading_id)
            processed_lines.append(f'<h2 id="{heading_id}" class="text-2xl font-bold text-blue-800 mt-8 mb-4">{heading_text}</h2>')
        elif line.startswith('### '):
            heading_text = line[4:].strip()
            heading_id = heading_text.lower().replace(' ', '-').replace(':', '').replace(',', '')
            heading_id = re.sub(r'[^a-z0-9-]', '', heading_id)
            processed_lines.append(f'<h3 id="{heading_id}" class="text-xl font-semibold text-blue-700 mt-6 mb-2">{heading_text}</h3>')
        else:
            processed_lines.append(line)
            
    return '\n'.join(processed_lines)

@app.route('/')
def index():
    """Render the main application page"""
    # Check if main markdown file exists
    markdown_file = os.path.join(DATA_DIR, 'ai-first.md')
    headings = []
    
    if os.path.exists(markdown_file):
        with open(markdown_file, 'r', encoding='utf-8') as f:
            content = f.read()
            headings = extract_headings(content)
    
    return render_template('index.html', headings=headings)

@app.route('/api/files')
def list_files():
    """List all available files"""
    files = []
    for filename in os.listdir(DATA_DIR):
        file_path = os.path.join(DATA_DIR, filename)
        if os.path.isfile(file_path):
            extension = os.path.splitext(filename)[1]
            files.append({
                'name': filename,
                'type': CONTENT_TYPES.get(extension, 'text/plain'),
                'size': os.path.getsize(file_path)
            })
    return jsonify(files)

@app.route('/api/markdown')
def get_markdown():
    """Get the markdown content with processed headings"""
    markdown_file = os.path.join(DATA_DIR, 'ai-first.md')
    if not os.path.isfile(markdown_file):
        return jsonify({'error': 'Markdown file not found'}), 404
    
    with open(markdown_file, 'r', encoding='utf-8') as f:
        content = f.read()
        processed_content = preprocess_markdown(content)
        headings = extract_headings(content)
        
    return jsonify({
        'content': processed_content,
        'headings': headings
    })

@app.route('/api/files/<path:filename>')
def get_file(filename):
    """Get the contents of a specific file"""
    file_path = os.path.join(DATA_DIR, filename)
    if not os.path.isfile(file_path):
        return jsonify({'error': 'File not found'}), 404
    
    extension = os.path.splitext(filename)[1]
    content_type = CONTENT_TYPES.get(extension, 'text/plain')
    
    return send_from_directory(DATA_DIR, filename, mimetype=content_type)

@app.route('/api/components')
def list_components():
    """List all React components"""
    components = [
        {'name': 'AiFirstDashboard', 'file': 'ai-first-dashboard.tsx'},
        {'name': 'AIFirstImplementation', 'file': 'ai-first-implementation.tsx'},
        {'name': 'DevelopmentComparison', 'file': 'development-comparison.tsx'}
    ]
    return jsonify(components)

@app.route('/api/diagrams')
def list_diagrams():
    """List all Mermaid diagrams"""
    diagrams = [
        {'name': 'Traditional Workflow', 'file': 'traditional-workflow.mermaid'},
        {'name': 'AI-Assisted Workflow', 'file': 'ai-assisted-workflow.mermaid'},
        {'name': 'AI-First Workflow', 'file': 'ai-first-workflow.mermaid'}
    ]
    return jsonify(diagrams)

if __name__ == '__main__':
    app.run(debug=True, port=5000)