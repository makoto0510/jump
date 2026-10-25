(() => {
  const params = new URLSearchParams(window.location.search);
  const trapMode = params.get('trap') || 'play'; // 'play', 'heartstopper', 'blank', 'none'
  const isDirect = params.get('direct') === 'true' || trapMode === 'none';
  const customImg = params.get('img');
  const customSound = params.get('sound');
  const customTitle = params.get('title');

  const trapScreen = document.getElementById('trap-screen');
  const playTrap = document.getElementById('play-trap');
  const hsTrap = document.getElementById('heartstopper-trap');
  const jumpscareContainer = document.getElementById('jumpscare-container');
  const scareImage = document.getElementById('scare-image');
  const audio = document.getElementById('scare-audio');

  if (customTitle) {
    document.title = customTitle;
  }
  if (customImg) {
    scareImage.src = customImg;
  }
  if (customSound) {
    audio.src = customSound;
  }

  // --- トラップ画面の初期化 ---
  if (trapMode === 'heartstopper') {
    playTrap.style.display = 'none';
    hsTrap.style.display = 'flex';
  } else if (trapMode === 'blank') {
    playTrap.style.display = 'none';
    hsTrap.style.display = 'none';
  }

  // --- ジャンプスケア発動関数 ---
  let isTriggered = false;

  function triggerJumpscare() {
    if (isTriggered) return;
    isTriggered = true;

    // トラップ画面を消し、ホラー画面を表示
    if (trapScreen) {
      trapScreen.style.display = 'none';
    }
    jumpscareContainer.style.display = 'flex';

    // 叫び声音声を最大音量で再生（タップ直後なので確実に再生される）
    audio.volume = 1.0;
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Audio play error:', err);
      });
    }

    // 全画面表示の試行
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }

    // スマホのバイブレーション
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([300, 100, 300, 100, 500, 200, 500]);
      } catch (e) {}
    }
  }

  // --- 発動の登録 ---
  if (isDirect) {
    // ダイレクトモード: 最初から画像を表示
    trapScreen.style.display = 'none';
    jumpscareContainer.style.display = 'flex';

    // 読み込み直後に音声再生を試行
    audio.play().catch(() => {
      // 自動再生がブロックされた場合は初回タップで再生
      const playOnTap = () => {
        audio.play();
        window.removeEventListener('click', playOnTap);
        window.removeEventListener('touchstart', playOnTap);
      };
      window.addEventListener('click', playOnTap);
      window.addEventListener('touchstart', playOnTap);
    });
  } else {
    // トラップモード（デフォルト）: 画面のどこかを触った瞬間に即発動！
    ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
      window.addEventListener(evt, triggerJumpscare, { once: true, passive: true });
    });
  }
})();
