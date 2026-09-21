"""
Script simples para converter imagens PNG/JPEG para WebP,
comparando o tamanho antes e depois.

Como usar:
1. Coloque este script dentro da pasta img/ do seu projeto
2. Rode: pip install Pillow (uma única vez)
3. Rode: python converter-webp.py
"""
import os
from PIL import Image

PASTA_IMAGENS = "."  # pasta atual (img/)
QUALIDADE = 80  # 0-100: 80 é um bom equilíbrio entre qualidade e tamanho

for arquivo in os.listdir(PASTA_IMAGENS):
    if arquivo.lower().endswith((".png", ".jpg", ".jpeg")):
        caminho_original = os.path.join(PASTA_IMAGENS, arquivo)
        nome_base = os.path.splitext(arquivo)[0]
        caminho_webp = os.path.join(PASTA_IMAGENS, f"{nome_base}.webp")

        tamanho_antes = os.path.getsize(caminho_original)

        imagem = Image.open(caminho_original)
        # Converte para RGB se necessário (WebP não aceita paleta indexada)
        if imagem.mode in ("P", "RGBA"):
            imagem = imagem.convert("RGBA")

        imagem.save(caminho_webp, "WEBP", quality=QUALIDADE)

        tamanho_depois = os.path.getsize(caminho_webp)
        reducao = (1 - tamanho_depois / tamanho_antes) * 100

        print(f"{arquivo}: {tamanho_antes/1024:.1f} KB -> {nome_base}.webp: {tamanho_depois/1024:.1f} KB (redução de {reducao:.0f}%)")
