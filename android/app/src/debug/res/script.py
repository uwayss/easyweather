import os
from PIL import Image, ImageDraw, ImageFont

def add_debug_mark(image_path, text="*", color=(255, 0, 0), font_size=30):
    try:
        img = Image.open(image_path).convert("RGBA")
        draw = ImageDraw.Draw(img)
        width, height = img.size

        # Choose a font
        try:
            font = ImageFont.truetype("arial.ttf", font_size)
        except IOError:
            font = ImageFont.load_default()

        # Use textbbox to get the bounding box of the text
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]

        text_x = (width - text_width) // 2
        text_y = (height - text_height) // 2

        # Add a slightly transparent background
        bg_color = (255, 255, 255, 128)
        bg_padding = 5
        draw.rectangle(
            (text_x - bg_padding, text_y - bg_padding, text_x + text_width + bg_padding, text_y + text_height + bg_padding),
            fill=bg_color
        )

        draw.text((text_x, text_y), text, fill=color, font=font)
        img.save(image_path)
        print(f"Added debug mark to: {image_path}")

    except Exception as e:
        print(f"Error processing {image_path}: {e}")

if __name__ == "__main__":
    debug_res_path = "."
    mipmap_folders = [
        "mipmap-hdpi",
        "mipmap-mdpi",
        "mipmap-xhdpi",
        "mipmap-xxhdpi",
        "mipmap-xxxhdpi",
    ]

    font_sizes = {
        "mipmap-mdpi": 20,
        "mipmap-hdpi": 30,
        "mipmap-xhdpi": 40,
        "mipmap-xxhdpi": 60,
        "mipmap-xxxhdpi": 80,
    }

    for folder in mipmap_folders:
        folder_path = os.path.join(debug_res_path, folder)
        if os.path.isdir(folder_path):
            for filename in os.listdir(folder_path):
                if filename.endswith(".png") and "launcher" in filename:
                    image_path = os.path.join(folder_path, filename)
                    font_size = font_sizes.get(folder, 30)
                    add_debug_mark(image_path, text="*", color=(255, 0, 0), font_size=font_size)
                    # You can change the text to "debug" or "dev" if you prefer