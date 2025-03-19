from PIL import Image
import os

# Configurations
BACKUP_FOLDER = "originals/"
TARGET_HEIGHT = 360  # Keep only the central 360px in height
WEBP_QUALITY = 85  # WebP lossy compression quality

# Ensure backup folder exists
os.makedirs(BACKUP_FOLDER, exist_ok=True)

# Process each JPG in the folder
for filename in os.listdir("."):
    if filename.lower().endswith(".jpg"):
        img_path = filename
        backup_path = os.path.join(BACKUP_FOLDER, filename)
        new_path = filename.replace(".jpg", ".webp")
        
        # Backup the original image
        os.rename(img_path, backup_path)
        
        # Open image
        img = Image.open(backup_path)
        width, height = img.size
        
        # Crop to central 360px height
        if height > TARGET_HEIGHT:
            top = (height - TARGET_HEIGHT) // 2
            bottom = top + TARGET_HEIGHT
            img = img.crop((0, top, width, bottom))
        
        # Convert to WebP
        img.save(new_path, "WEBP", quality=WEBP_QUALITY, optimize=True)
        
        print(f"Processed: {filename} -> {new_path}")

print("✅ Optimization complete! Check your folder.")
