#!/usr/bin/env python3
"""
Flat Directory Copier

This script copies all files from the current directory and its subdirectories
into a single 'flat' directory, overwriting any existing files with the same name.
"""

import os
import shutil
import sys

def flatten_directory():
    # Get the current directory (where the script is running)
    current_dir = os.path.dirname(os.path.abspath(__file__)) if os.path.dirname(os.path.abspath(__file__)) else "."
    
    # Define the target flat directory
    flat_dir = os.path.join(current_dir, "flat")
    
    # Create the flat directory if it doesn't exist
    if not os.path.exists(flat_dir):
        os.makedirs(flat_dir)
        print(f"Created target directory: {flat_dir}")
    
    # Keep track of stats
    total_files = 0
    copied_files = 0
    skipped_files = 0
    errors = 0
    
    # Walk through the directory tree
    for root, dirs, files in os.walk(current_dir):
        # Skip the flat directory itself to avoid infinite recursion
        if os.path.samefile(root, flat_dir):
            continue
            
        for file in files:
            total_files += 1
            source_path = os.path.join(root, file)
            target_path = os.path.join(flat_dir, file)
            
            # Skip this script itself
            if os.path.samefile(source_path, os.path.abspath(__file__)):
                skipped_files += 1
                continue
                
            try:
                # Copy the file, overwriting if it exists
                shutil.copy2(source_path, target_path)
                copied_files += 1
                print(f"Copied: {source_path} -> {target_path}")
                
                # Handle name collisions (files with the same name from different directories)
                # If there are multiple files with the same name, they'll overwrite each other
                
            except (shutil.SameFileError, PermissionError, OSError) as e:
                errors += 1
                print(f"Error copying {source_path}: {e}", file=sys.stderr)
    
    # Print summary
    print("\nSummary:")
    print(f"Total files found: {total_files}")
    print(f"Files copied: {copied_files}")
    print(f"Files skipped: {skipped_files}")
    print(f"Errors encountered: {errors}")
    print(f"All files have been copied to: {flat_dir}")

if __name__ == "__main__":
    flatten_directory()