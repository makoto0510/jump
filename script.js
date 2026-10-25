(() => {
  const params = new URLSearchParams(window.location.search);
  const customImg = params.get('img');
  const customSound = params.get('sound');
  const customTitle = params.get('title');

  const trapScreen = document.getElementById('trap-screen');
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

  let isTriggered = false;

  function triggerJumpscare() {
    if (isTriggered) return;
    isTriggered = true;

    // 黒画面を消し、ホラー画像を表示
    if (trapScreen) {
      trapScreen.style.display = 'none';
    }
    jumpscareContainer.style.display = 'flex';

    // 音声を最大音量で再生
    audio.volume = 1.0;
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Playback error:', err);
      });
    }

    // 全画面表示の試行
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }

    // スマホ端末のバイブレーション
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([300, 100, 300, 100, 500, 200, 500]);
      } catch (e) {}
    }
  }

  // 自動再生が許可されている環境なら、即座に画像と音を発動
  audio.play().then(() => {
    triggerJumpscare();
  }).catch(() => {
    // 自動再生が制限されている環境:
    // 画面のどこかを触った瞬間に完全同時に発動
    ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
      window.addEventListener(evt, triggerJumpscare, { once: true, passive: true });
    });
  });
})();
