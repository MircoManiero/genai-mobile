
from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size, filename):
    # Create a new image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Create gradient background
    for i in range(size):
        for j in range(size):
            # Distance from center
            center = size // 2
            dist = ((i - center) ** 2 + (j - center) ** 2) ** 0.5
            max_dist = center
            
            if dist <= max_dist:
                # Create circular gradient from blue to purple
                ratio = dist / max_dist
                r = int(85 + ratio * (120 - 85))  # 85 to 120
                g = int(118 + ratio * (86 - 118))  # 118 to 86
                b = int(255 + ratio * (214 - 255))  # 255 to 214
                img.putpixel((i, j), (r, g, b, 255))
    
    # Add AI symbol (brain/chip pattern)
    center = size // 2
    
    # Draw neural network pattern
    if size >= 40:
        # Draw nodes
        node_size = max(2, size // 40)
        nodes = [
            (center - size//4, center - size//6),
            (center + size//4, center - size//6),
            (center, center),
            (center - size//4, center + size//6),
            (center + size//4, center + size//6),
        ]
        
        # Draw connections
        line_width = max(1, size // 80)
        for i, node1 in enumerate(nodes):
            for j, node2 in enumerate(nodes[i+1:], i+1):
                draw.line([node1, node2], fill=(255, 255, 255, 180), width=line_width)
        
        # Draw nodes
        for node in nodes:
            draw.ellipse([node[0]-node_size, node[1]-node_size, 
                         node[0]+node_size, node[1]+node_size], 
                        fill=(255, 255, 255, 255))
    
    # Add sparkle effect for smaller sizes
    if size < 40:
        sparkle_size = max(1, size // 20)
        sparkles = [
            (center - size//3, center - size//4),
            (center + size//3, center - size//4),
            (center, center + size//3),
        ]
        for sparkle in sparkles:
            draw.ellipse([sparkle[0]-sparkle_size, sparkle[1]-sparkle_size,
                         sparkle[0]+sparkle_size, sparkle[1]+sparkle_size],
                        fill=(255, 255, 255, 255))
    
    # Round the corners for iOS style
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    corner_radius = size // 5
    mask_draw.rounded_rectangle([0, 0, size, size], corner_radius, fill=255)
    
    # Apply the mask
    img.putalpha(mask)
    
    return img

# Create directory if it doesn't exist
icon_dir = "ios/genaimobile/Images.xcassets/AppIcon.appiconset"
os.makedirs(icon_dir, exist_ok=True)

# Generate all required icon sizes
icons = [
    (40, "icon-20@2x.png"),
    (60, "icon-20@3x.png"),
    (58, "icon-29@2x.png"),
    (87, "icon-29@3x.png"),
    (80, "icon-40@2x.png"),
    (120, "icon-40@3x.png"),
    (120, "icon-60@2x.png"),
    (180, "icon-60@3x.png"),
    (1024, "icon-1024.png"),
]

print("Generating app icons...")
for size, filename in icons:
    icon = create_icon(size, filename)
    filepath = os.path.join(icon_dir, filename)
    icon.save(filepath, "PNG")
    print(f"Created {filename} ({size}x{size})")

print("All icons generated successfully!")
