(() => {
  const params = new URLSearchParams(window.location.search);
  const customImg = params.get('img');
  const customSound = params.get('sound');
  const delaySec = parseFloat(params.get('delay') || '0');

  const container = document.getElementById('jumpscare-container');
  const scareImg = document.getElementById('scare-image');
  const audio = document.getElementById('scare-audio');
  const clickTrigger = document.getElementById('click-trigger');

  if (customImg) {
    scareImg.src = customImg;
  }
  if (customSound) {
    audio.src = customSound;
  }

  // --- 音声再生処理 ---
  function playAudio() {
    audio.volume = 1.0;
    const promise = audio.play();
    if (promise !== undefined) {
      promise.catch(() => {
        // 自動再生ポリシーで保留された場合は、次のクリック/タッチで再生される
      });
    }

    // スマホのバイブレーション
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([300, 100, 300, 100, 500]);
      } catch (e) {}
    }
  }

  // --- 全画面表示要求 ---
  function requestFullScreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  }

  // --- 発動処理 ---
  function launch() {
    container.style.display = 'flex';
    playAudio();
  }

  if (delaySec > 0) {
    container.style.display = 'none';
    setTimeout(launch, delaySec * 1000);
  } else {
    launch();
  }

  // 画面のどこかを触った時（自動再生解除 & フルスクリーン化）
  const handleUserAction = () => {
    playAudio();
    requestFullScreen();
  };

  ['click', 'touchstart', 'mousedown', 'keydown'].forEach(evt => {
    window.addEventListener(evt, handleUserAction, { passive: true });
  });

  if (clickTrigger) {
    clickTrigger.addEventListener('click', handleUserAction);
    clickTrigger.addEventListener('touchstart', handleUserAction);
  }
})();
