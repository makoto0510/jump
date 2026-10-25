# 素材ファイルについて

本プロジェクトには、参考元（`akulsaju/heartstopper`）の素材が標準で組み込まれています。

- **現在のホラー画像**: `assets/jumpscareImage.jpg`
- **現在の叫び声音声**: `assets/jumpscareSound.mp3`

別の画像や音声に変更したい場合は、以下の手順で差し替えることができます。

## 1. ホラー画像の差し替え
- **方法A（ファイル配置）**:
  - 用意した画像（PNG、JPG、GIF、WebP など）をこのフォルダに配置します。
  - `index.html` の `<img id="scare-image" src="assets/jumpscareImage.jpg">` の部分を、配置したファイル名（例: `assets/scare.jpg`）に書き換えます。

- **方法B（URLパラメータで即時変更）**:
  - ファイルを直接書き換えなくても、URLの末尾に `?img=画像のURL` を付けるだけで即座に任意の画像に変更できます。
  - 例: `https://<username>.github.io/<repo>/?img=https://example.com/scary.png`

---

## 2. 叫び声・効果音の差し替え
- **方法A（ファイル配置）**:
  - 用意した音声ファイルを `assets/jumpscareSound.mp3` に上書き配置するか、別名で保存して `index.html` の `<source src="...">` を書き換えます。

- **方法B（URLパラメータで指定）**:
  - URLの末尾に `?sound=音声のURL` を指定することで、任意のmp3やwav音声を鳴らせます。
  - 例: `https://<username>.github.io/<repo>/?sound=https://example.com/scream.mp3`

※ 音声ファイルが未配置またはブラウザによりブロックされた場合でも、内蔵の Web Audio API による恐怖合成音（悲鳴＋ディストーションノイズ）がフォールバックとして再生されます。
