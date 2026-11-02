"""Optimiza originales locales sin activar imágenes o coordenadas sin revisar.
Uso: python tools/optimizar_imagenes.py
Requiere Pillow. Los originales se buscan por las rutas del manifiesto (PNG o JPEG).
"""
from pathlib import Path
import json
from PIL import Image, ImageOps
ROOT = Path(__file__).resolve().parents[1]
p = ROOT / 'assets/prehistoria/escenas.json'
data = json.loads(p.read_text())
for scene in data['scenes']:
    original = ROOT / scene['original']
    if not original.exists():
        print(scene['id'] + ': original no disponible')
        continue
    with Image.open(original) as raw:
        im = ImageOps.exif_transpose(raw).convert('RGB')
        w, h = im.size
        if abs(w / h - 16 / 9) > .015:
            raise ValueError(f'{original.name}: proporción {w}x{h}; revisar sin recortar contenido.')
        sizes = [x for x in (640, 960, 1440, 1920) if x <= w]
        if not sizes or (w < 1920 and sizes[-1] < w): sizes.append(w)
        variants = []
        for width in sizes:
            height = round(h * width / w)
            resized = im.resize((width, height), Image.Resampling.LANCZOS)
            for ext, fmt, quality in [('webp','WEBP',80),('jpg','JPEG',84)]:
                rel = f"assets/prehistoria/web/prehistoria-{scene['id']}-{width}.{ext}"
                out = ROOT / rel
                out.parent.mkdir(parents=True,exist_ok=True)
                options = {'quality':quality}
                if fmt == 'JPEG': options.update(optimize=True, progressive=True)
                if fmt == 'WEBP': options.update(method=6)
                resized.save(out, fmt, **options)
                variants.append(dict(src=rel,width=width,height=height,format=ext,bytes=out.stat().st_size))
        scene['variants'] = variants
        scene['imageStatus'] = 'optimizada-pendiente-revision'
        print(scene['id'] + ': variantes creadas; falta validar imagen, texto alternativo y zonas.')
p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
(ROOT/'assets/prehistoria/escenas.js').write_text('window.PrehistoriaScenes = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n')
