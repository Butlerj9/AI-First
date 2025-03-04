from flask import Flask, render_template, send_from_directory, jsonify, request
import os
import json
import re
import logging
import traceback

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler('app.log')
    ]
)

app = Flask(__name__, static_folder='static', template_folder='templates')
logger = app.logger

# Root directory containing all our files
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
STATIC_DIR = os.path.join(BASE_DIR, 'static')
TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')

# Log important directory paths on startup
logger.info(f"BASE_DIR: {BASE_DIR}")
logger.info(f"DATA_DIR: {DATA_DIR}")
logger.info(f"STATIC_DIR: {STATIC_DIR}")
logger.info(f"TEMPLATE_DIR: {TEMPLATE_DIR}")

# Ensure the data directory exists
try:
    os.makedirs(DATA_DIR, exist_ok=True)
    logger.info(f"DATA_DIR exists or was created: {DATA_DIR}")
except Exception as e:
    logger.error(f"Failed to create DATA_DIR: {str(e)}")

# Create a dictionary to map file extensions to their content types
CONTENT_TYPES = {
    '.md': 'text/markdown',
    '.tsx': 'application/typescript',
    '.mermaid': 'text/plain',
    '.txt': 'text/plain',
    '.json': 'application/json',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.html': 'text/html'
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
        try:
            with open(markdown_file, 'r', encoding='utf-8') as f:
                content = f.read()
                headings = extract_headings(content)
            logger.info(f"Successfully loaded markdown file with {len(headings)} headings")
        except Exception as e:
            logger.error(f"Error loading markdown file: {str(e)}")
    else:
        logger.warning(f"Markdown file not found: {markdown_file}")
        # List all files in the data directory for debugging
        try:
            if os.path.exists(DATA_DIR):
                files = os.listdir(DATA_DIR)
                logger.info(f"Files in DATA_DIR: {files}")
        except Exception as e:
            logger.error(f"Error listing files in DATA_DIR: {str(e)}")
    
    return render_template('index.html', headings=headings)

@app.route('/api/files')
def list_files():
    """List all available files"""
    files = []
    try:
        # List files in data directory
        if os.path.exists(DATA_DIR):
            for filename in os.listdir(DATA_DIR):
                file_path = os.path.join(DATA_DIR, filename)
                if os.path.isfile(file_path):
                    extension = os.path.splitext(filename)[1]
                    files.append({
                        'name': filename,
                        'type': CONTENT_TYPES.get(extension, 'text/plain'),
                        'size': os.path.getsize(file_path)
                    })
            logger.info(f"Listed {len(files)} files in data directory")
        else:
            logger.error(f"DATA_DIR does not exist: {DATA_DIR}")
            return jsonify({'error': 'Data directory not found'}), 404
    except Exception as e:
        logger.error(f"Error listing files: {str(e)}")
        return jsonify({'error': str(e)}), 500
    
    return jsonify(files)

@app.route('/api/markdown')
def get_markdown():
    """Get the markdown content with processed headings"""
    markdown_file = os.path.join(DATA_DIR, 'ai-first.md')
    
    if not os.path.isfile(markdown_file):
        logger.error(f"Markdown file not found: {markdown_file}")
        return jsonify({'error': 'Markdown file not found'}), 404
    
    try:
        with open(markdown_file, 'r', encoding='utf-8') as f:
            content = f.read()
            processed_content = preprocess_markdown(content)
            headings = extract_headings(content)
        
        logger.info(f"Successfully processed markdown file: {len(content)} characters")
        return jsonify({
            'content': processed_content,
            'headings': headings
        })
    except Exception as e:
        logger.error(f"Error reading markdown file: {str(e)}")
        return jsonify({'error': f'Error reading markdown file: {str(e)}'}), 500

def find_mermaid_file(base_name):
    """Try to find a mermaid file with different extensions"""
    extensions = ['.mermaid', '.txt']
    
    for ext in extensions:
        file_path = os.path.join(DATA_DIR, f"{base_name}{ext}")
        if os.path.isfile(file_path):
            return file_path, ext
    
    return None, None

@app.route('/api/files/<path:filename>')
def get_file(filename):
    """Get the contents of a specific file"""
    try:
        # Handle .mermaid file extensions or potential .txt versions
        if filename.endswith('.mermaid'):
            base_name = filename[:-8]  # Remove .mermaid extension
            file_path, ext = find_mermaid_file(base_name)
            
            if file_path:
                logger.info(f"Found mermaid file: {file_path}")
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                return content, 200, {'Content-Type': 'text/plain; charset=utf-8'}
            else:
                logger.error(f"Mermaid file not found: {filename}")
                return jsonify({'error': 'Mermaid file not found'}), 404
        
        # For other files, use regular path
        safe_filename = os.path.basename(filename)
        file_path = os.path.join(DATA_DIR, safe_filename)
        
        if not os.path.isfile(file_path):
            logger.error(f"File not found: {file_path}")
            return jsonify({'error': 'File not found'}), 404
        
        extension = os.path.splitext(safe_filename)[1]
        content_type = CONTENT_TYPES.get(extension, 'text/plain')
        
        return send_from_directory(DATA_DIR, safe_filename, mimetype=content_type)
    
    except Exception as e:
        logger.error(f"Error serving file {filename}: {str(e)}")
        return jsonify({'error': f'Error serving file: {str(e)}'}), 500

@app.route('/static/<path:filename>')
def serve_static(filename):
    """Explicitly serve static files"""
    try:
        # Determine the correct subdirectory
        if filename.startswith('js/'):
            subdir = 'js'
            subpath = filename[3:]  # Remove 'js/' prefix
        elif filename.startswith('css/'):
            subdir = 'css'
            subpath = filename[4:]  # Remove 'css/' prefix
        else:
            # Serve directly from static folder
            return send_from_directory(STATIC_DIR, filename)
        
        # Serve from the appropriate subdirectory
        subdir_path = os.path.join(STATIC_DIR, subdir)
        logger.info(f"Serving static file from {subdir}: {subpath}")
        return send_from_directory(subdir_path, subpath)
    
    except Exception as e:
        logger.error(f"Error serving static file {filename}: {str(e)}")
        return jsonify({'error': f'Error serving static file: {str(e)}'}), 500

@app.route('/data/<path:filename>')
def serve_data_file(filename):
    """Directly serve files from the data directory"""
    try:
        return send_from_directory(DATA_DIR, filename)
    except Exception as e:
        logger.error(f"Error serving data file {filename}: {str(e)}")
        return jsonify({'error': f'Error serving data file: {str(e)}'}), 500

@app.route('/test_mermaid_page')
def test_mermaid_page():
    """Serve a test page that directly loads mermaid files"""
    try:
        # Use Flask's render_template function instead of manually reading the file
        return render_template('test_mermaid.html')
    except Exception as e:
        logger.error(f"Error serving test mermaid page: {str(e)}")
        return f"<html><body><h1>Error loading test page</h1><p>{str(e)}</p></body></html>"

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
    try:
        diagrams = []
        
        # Try to find diagrams with either .mermaid or .txt extension
        diagram_bases = ['traditional-workflow', 'ai-assisted-workflow', 'ai-first-workflow']
        
        for base_name in diagram_bases:
            file_path, ext = find_mermaid_file(base_name)
            if file_path:
                # Extract name from base_name
                name = base_name.replace('-', ' ').title()
                # Use original .mermaid extension in the file property for API consistency
                diagrams.append({
                    'name': name,
                    'file': f"{base_name}.mermaid"
                })
        
        if not diagrams:
            # If no diagrams found, return default list
            diagrams = [
                {'name': 'Traditional Workflow', 'file': 'traditional-workflow.mermaid'},
                {'name': 'AI-Assisted Workflow', 'file': 'ai-assisted-workflow.mermaid'},
                {'name': 'AI-First Workflow', 'file': 'ai-first-workflow.mermaid'}
            ]
            logger.warning("No diagram files found, using default list")
        else:
            logger.info(f"Found {len(diagrams)} diagram files")
        
    except Exception as e:
        logger.error(f"Error listing diagrams: {str(e)}")
        # Fall back to default list
        diagrams = [
            {'name': 'Traditional Workflow', 'file': 'traditional-workflow.mermaid'},
            {'name': 'AI-Assisted Workflow', 'file': 'ai-assisted-workflow.mermaid'},
            {'name': 'AI-First Workflow', 'file': 'ai-first-workflow.mermaid'}
        ]
    
    return jsonify(diagrams)

@app.route('/check_file_access')
def check_file_access():
    """Debug endpoint to check file access permissions"""
    results = {
        "base_dir": BASE_DIR,
        "data_dir": DATA_DIR,
        "static_dir": STATIC_DIR,
        "template_dir": TEMPLATE_DIR,
        "data_dir_exists": os.path.exists(DATA_DIR),
        "static_dir_exists": os.path.exists(STATIC_DIR),
        "template_dir_exists": os.path.exists(TEMPLATE_DIR),
        "data_files": [],
        "static_dirs": [],
        "template_files": []
    }
    
    # Check data files
    if os.path.exists(DATA_DIR):
        try:
            results["data_files"] = os.listdir(DATA_DIR)
        except Exception as e:
            results["data_files_error"] = str(e)
    
    # Check static directories
    if os.path.exists(STATIC_DIR):
        try:
            results["static_dirs"] = os.listdir(STATIC_DIR)
            # Check js and css subdirectories
            js_dir = os.path.join(STATIC_DIR, 'js')
            css_dir = os.path.join(STATIC_DIR, 'css')
            if os.path.exists(js_dir):
                results["js_files"] = os.listdir(js_dir)
            if os.path.exists(css_dir):
                results["css_files"] = os.listdir(css_dir)
        except Exception as e:
            results["static_dirs_error"] = str(e)
    
    # Check template files
    if os.path.exists(TEMPLATE_DIR):
        try:
            results["template_files"] = os.listdir(TEMPLATE_DIR)
        except Exception as e:
            results["template_files_error"] = str(e)
    
    # Check specific files
    try:
        md_file = os.path.join(DATA_DIR, 'ai-first.md')
        results["md_file_exists"] = os.path.exists(md_file)
        if os.path.exists(md_file):
            results["md_file_size"] = os.path.getsize(md_file)
            results["md_file_readable"] = os.access(md_file, os.R_OK)
    except Exception as e:
        results["md_file_error"] = str(e)
    
    # Check mermaid files
    for base_name in ['traditional-workflow', 'ai-assisted-workflow', 'ai-first-workflow']:
        file_path, ext = find_mermaid_file(base_name)
        if file_path:
            try:
                results[f"{base_name}_exists"] = True
                results[f"{base_name}_extension"] = ext
                results[f"{base_name}_size"] = os.path.getsize(file_path)
                results[f"{base_name}_readable"] = os.access(file_path, os.R_OK)
                # Read first 100 chars
                with open(file_path, 'r', encoding='utf-8') as f:
                    results[f"{base_name}_sample"] = f.read(100)
            except Exception as e:
                results[f"{base_name}_error"] = str(e)
        else:
            results[f"{base_name}_exists"] = False
    
    return jsonify(results)

@app.route('/test_mermaid')
def test_mermaid():
    """Test endpoint to directly show mermaid files content"""
    results = {}
    
    for base_name in ['traditional-workflow', 'ai-assisted-workflow', 'ai-first-workflow']:
        file_path, ext = find_mermaid_file(base_name)
        if file_path:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    results[base_name] = f.read()
            except Exception as e:
                results[base_name] = f"Error: {str(e)}"
        else:
            results[base_name] = f"File not found: {base_name}.mermaid or {base_name}.txt"
    
    # Format as plain text
    response_text = "\n\n===========================\n\n".join(
        [f"{name}:\n\n{content}" for name, content in results.items()]
    )
    
    return response_text, 200, {'Content-Type': 'text/plain; charset=utf-8'}

# Error handlers for better debugging
@app.errorhandler(404)
def page_not_found(e):
    logger.error(f"404 error: {request.path}")
    return jsonify({"error": "Resource not found", "path": request.path}), 404

@app.errorhandler(500)
def server_error(e):
    logger.error(f"500 error: {str(e)}")
    logger.error(traceback.format_exc())
    return jsonify({"error": "Internal server error", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)