---
description: GitHub Pagesへのデプロイ方法
---

# GitHub Pagesへのデプロイワークフロー

このワークフローは、静的サイトをGitHub Pagesにデプロイする手順を説明します。

## 前提条件
- GitHubアカウントを持っていること
- GitHubで新しいリポジトリを作成済みであること

## デプロイ手順

### 1. Gitリポジトリの初期化（初回のみ）
```bash
git init
```

### 2. ファイルをステージング
// turbo
```bash
git add .
```

### 3. 初回コミット
// turbo
```bash
git commit -m "Initial commit: Instagram coloring page shop"
```

### 4. メインブランチの名前を確認/変更（必要に応じて）
```bash
git branch -M main
```

### 5. GitHubリモートリポジトリを追加
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**注意**: `YOUR_USERNAME`と`YOUR_REPO_NAME`を実際の値に置き換えてください。

### 6. GitHubにプッシュ
```bash
git push -u origin main
```

### 7. GitHub Pagesの設定

1. GitHubリポジトリのページにアクセス
2. **Settings** タブをクリック
3. 左サイドバーの **Pages** をクリック
4. **Source** セクションで以下を選択：
   - Branch: `main`
   - Folder: `/ (root)`
5. **Save** をクリック

### 8. デプロイの確認

数分後、以下のURLでサイトが公開されます：
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## 更新のデプロイ

サイトを更新した後、以下のコマンドで変更をデプロイできます：

```bash
git add .
git commit -m "Update: 変更内容の説明"
git push
```

GitHub Pagesは自動的に最新の変更を反映します（通常1-2分程度）。

## トラブルシューティング

### サイトが表示されない場合
1. GitHub Pagesの設定が正しいか確認
2. リポジトリが公開（Public）になっているか確認
3. `index.html`がルートディレクトリにあるか確認

### 画像やCSSが読み込まれない場合
相対パスを使用していることを確認してください。GitHub Pagesでは絶対パスは動作しない場合があります。
