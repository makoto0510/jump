# Jumpscare Webpage (Direct Horror Launcher)

https://github.com/akulsaju/heartstopper （ReemanS/heartstopper）を参考に制作された、**リンクをクリックした瞬間にダイレクトでホラー画像と恐怖演出が全画面に発動する** GitHub Pages 対応の Web ページです。

ボタンのクリックを挟まず、URLを開いた瞬間に強烈な恐怖演出（激しい画面振動、ストロボ点滅、ズーム、叫び声・ノイズ合成音）が直撃します。

---

## 🌟 特徴
- **参考元の画像＆音声を標準搭載**: `akulsaju/heartstopper` の画像（`jumpscareImage.jpg`）と音声（`jumpscareSound.mp3`）をそのまま組み込んでいます。
- **ダイレクト発動**: ページを開いた瞬間にダイレクトにホラー演出が全画面で展開されます。
- **ゼロ依存・静的構成**: バニラ HTML / CSS / JavaScript で構成されており、GitHub Pages にプッシュするだけで即座に公開できます。
- **自動再生ポリシー対応**: ブラウザのオーディオ自動再生制限を考慮し、Web Audio API 合成音 ＋ 初回タップ/操作時フルスクリーン＆大音量フォールバックを実装。
- **柔軟なURLカスタマイズ**: コードを編集しなくても、URLパラメータだけで画像・音声・遅延秒数などを自由自在に変更可能。

---

## 🚀 GitHub Pages への公開手順 (約3分)

以下の手順で、`https://<あなたのユーザー名>.github.io/<リポジトリ名>/` のリンクを作成できます。

### ステップ 1: GitHub で新しいリポジトリを作成
1. [GitHub](https://github.com/) にログインし、右上の「＋」アイコンから **「New repository」** を選択します。
2. リポジトリ名を入力します（例: `heartstopper` や `surprise` など）。
3. Public（公開）を選択し、**「Create repository」** をクリックします。

### ステップ 2: ローカルファイルをプッシュ
ターミナルでこのプロジェクトディレクトリにて以下を実行します。

```bash
git add .
git commit -m "Initial commit for direct jumpscare page"
git branch -M main
git remote add origin https://github.com/<あなたのGitHubユーザー名>/<リポジトリ名>.git
git push -u origin main
```

### ステップ 3: GitHub Pages を有効化
1. 作成した GitHub リポジトリのページを開き、上部タブの **「Settings」**（設定）をクリック。
2. 左メニューの **「Pages」** を選択。
3. **「Build and deployment」** の **「Branch」** を `None` から **`main`**（または `master`）、フォルダを **`/ (root)`** に設定し、**「Save」** をクリック。
4. 1〜2分待つと、上部に以下のようなURLが表示されます：
   ```
   https://<あなたのGitHubユーザー名>.github.io/<リポジトリ名>/
   ```
   このリンクを踏むと、ダイレクトで恐怖演出が発動します！

---

## ⚙️ URLパラメータによるカスタマイズ

URL の末尾にパラメータを付けることで、コードを変更することなく演出をカスタマイズできます。

| パラメータ | 説明 | 例 |
|---|---|---|
| `img` | 表示するホラー画像のURLを指定 | `?img=https://example.com/scary.png` |
| `sound` | 再生する音声ファイルのURLを指定 | `?sound=https://example.com/scream.mp3` |
| `text` | 画面下部にフラッシュ表示する文字 | `?text=みいつけた` |
| `delay` | 発動までの遅延秒数（指定秒数後に急にドッキリ） | `?delay=3`（3秒後に出現） |
| `strobe` | ストロボ（光点滅）をオフにする（光過敏対策） | `?strobe=false` |
| `shake` | 画面の振動エフェクトをオフにする | `?shake=false` |

**使用例**:
```
https://<username>.github.io/<repo>/?delay=2&text=うしろ
```

---

## 🎨 素材ファイルのローカル差し替え方法

自分の好きな画像や音声をあらかじめ埋め込んでおきたい場合は、[`assets/README.md`](assets/README.md) をご覧ください。
- **画像**: `assets/scare.svg` を自分の画像（`assets/scare.jpg` 等）に差し替え、`index.html` の `src` を書き換えるだけです。
- **音声**: `assets/scream.mp3` を配置するだけで、自動的に優先再生されます。

---

## ⚠️ 注意事項・免責事項
- **健康上の注意**: 激しい画面点滅（ストロボ）や大音量が含まれます。光過敏性発作（てんかん）の既往がある方や心臓の弱い方、小さな子どもには見せないよう十分注意してください。
- いたずら目的で使用する場合は、相手との関係性や体調を十分に考慮し、自己責任でご利用ください。
