from PIL import Image
import os

# File settings
input_file = "icon.png"
output_file = "icon_512.png"
target_size = (512, 512)

# Check if the file exists
if not os.path.exists(input_file):
    print(f"❌ '{input_file}' not found in the current directory.")
else:
    # Open and resize the image
    with Image.open(input_file) as img:
        if img.size != (1024, 1024):
            print(f"⚠️ Warning: '{input_file}' is not 1024x1024, it is {img.size}. Proceeding anyway.")
        
        img_resized = img.resize(target_size, Image.LANCZOS)
        img_resized.save(output_file, optimize=True)
        print(f"✅ Saved '{output_file}' as a 512x512 image.")
