from pathlib import Path
import re
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).resolve().parents[1]
css = (root / 'assets/evidence.css').read_text(encoding='utf-8')
block = re.search(r'body\.theme-main\{([^}]*)\}', css).group(1)
vals = dict(re.findall(r'(--[\w-]+):\s*(#[0-9a-fA-F]{6})', block))

def rgb(name, fallback):
    v = vals.get(name, fallback).lstrip('#')
    return tuple(int(v[i:i+2], 16) for i in (0, 2, 4))

ink = rgb('--ink', '#102f49')
muted = rgb('--muted', '#526a78')
teal = rgb('--teal', '#087a76')
line = rgb('--line', '#d8e3e8')
wash = rgb('--wash', '#f2f6f7')
img = Image.new('RGB', (1200, 630), wash)
d = ImageDraw.Draw(img)
fonts = Path('/usr/share/fonts/truetype/dejavu')
bold = ImageFont.truetype(str(fonts/'DejaVuSans-Bold.ttf'), 56)
title = ImageFont.truetype(str(fonts/'DejaVuSans-Bold.ttf'), 34)
sub = ImageFont.truetype(str(fonts/'DejaVuSans.ttf'), 25)
label = ImageFont.truetype(str(fonts/'DejaVuSans-Bold.ttf'), 22)
body = ImageFont.truetype(str(fonts/'DejaVuSans.ttf'), 20)
small = ImageFont.truetype(str(fonts/'DejaVuSans.ttf'), 16)
d.rectangle((0,0,1200,10), fill=teal)
d.rounded_rectangle((58,58,1142,572), radius=28, fill='white', outline=line, width=2)
d.text((102,104),'BHOC',font=bold,fill=ink)
d.text((102,188),'Scientific Evidence & Research Platform',font=title,fill=ink)
d.text((102,244),'Precision Oxygen Therapeutics',font=sub,fill=teal)
d.line((102,304,1098,304),fill=line,width=2)
d.text((102,342),'WHAT THIS LINK OPENS',font=label,fill=teal)
d.multiline_text((102,390),'Source-linked evidence on BHOC and HBOC, oxygen delivery,\nveterinary medicine, transplantation and human-use research.',font=body,fill=muted,spacing=11)
badge='evidence.bhoctherapeutics.com'
bw=d.textbbox((0,0),badge,font=small)[2]
bx=1098-bw
d.rounded_rectangle((bx-18,507,1098,545),radius=16,fill=wash,outline=line,width=1)
d.text((bx,516),badge,font=small,fill=teal)
out=root/'assets/bhoc-evidence-social-preview.png'
img.save(out,'PNG',optimize=True)
print(out)
