# 素材ファイルの差し替え方法

このフォルダ（`assets/`）に好きな画像や音声を配置することで、ホラー演出を自由にカスタマイズできます。

## 1. ホラー画像の差し替え
- **方法A（ファイル配置）**:
  - 用意した画像（PNG、JPG、GIF、WebP など）を `assets/scare.jpg` や `assets/scare.png` として保存します。
  - `index.html` の `<img id="scare-image" src="assets/scare.svg">` の部分を、配置したファイル名（例: `assets/scare.jpg`）に書き換えます。

- **方法B（URLパラメータで即時変更）**:
  - ファイルを直接書き換えなくても、URLの末尾に `?img=画像のURL` を付けるだけで即座に任意の画像に変更できます。
  - 例: `https://<username>.github.io/<repo>/?img=https://example.com/scary.png`

---

## 2. 叫び声・効果音の差し替え
- **方法A（ファイル配置）**:
  - 用意した音声ファイルを `assets/scream.mp3` として配置します。
  - 配置されている場合、Web Audio合成音よりも優先してこの音声が再生されます。

- **方法B（URLパラメータで指定）**:
  - URLの末尾に `?sound=音声のURL` を指定することで、任意のmp3やwav音声を鳴らせます。
  - 例: `https://<username>.github.io/<repo>/?sound=https://example.com/scream.mp3`

※ 音声ファイルが未配置またはブラウザによりブロックされた場合でも、内蔵の Web Audio API による恐怖合成音（悲鳴＋ディストーションノイズ）がフォールバックとして再生されます。
