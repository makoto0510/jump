(() => {
  // --- URLパラメータの取得 ---
  const params = new URLSearchParams(window.location.search);
  const customImg = params.get('img');
  const customSound = params.get('sound');
  const customText = params.get('text');
  const noShake = params.get('shake') === 'false';
  const noStrobe = params.get('strobe') === 'false';
  const delaySec = parseFloat(params.get('delay') || '0');

  const scareContainer = document.getElementById('jumpscare-container');
  const scareImg = document.getElementById('scare-image');
  const scareText = document.getElementById('scare-text');
  const strobeOverlay = document.getElementById('strobe-overlay');
  const imageWrapper = document.getElementById('image-wrapper');
  const audioElement = document.getElementById('scare-audio');
  const clickTrigger = document.getElementById('click-trigger');

  // カスタム設定の適用
  if (customImg) {
    scareImg.src = customImg;
  }
  if (customText) {
    scareText.textContent = customText;
  }
  if (noShake) {
    imageWrapper.classList.remove('shake-extreme');
  }
  if (noStrobe) {
    strobeOverlay.style.display = 'none';
  }

  // --- Web Audio API による恐怖合成音（フォールバック用） ---
  let audioCtx = null;
  let isSoundStarted = false;

  function createSynthesizedScream() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audioCtx = new AudioContext();

      // メインゲイン（大音量）
      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.9, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);

      // ディストーション（歪み）
      const distortion = audioCtx.createWaveShaper();
      function makeDistortionCurve(amount) {
        const k = typeof amount === 'number' ? amount : 50;
        const n_samples = 44100;
        const curve = new Float32Array(n_samples);
        const deg = Math.PI / 180;
        for (let i = 0; i < n_samples; ++i) {
          const x = (i * 2) / n_samples - 1;
          curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
        }
        return curve;
      }
      distortion.curve = makeDistortionCurve(400);
      distortion.oversample = '4x';
      distortion.connect(masterGain);

      // 不協和音オシレーター1（悲鳴のような高周波の鋸歯状波）
      const osc1 = audioCtx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(1400, audioCtx.currentTime + 0.3);
      osc1.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 1.2);
      osc1.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 2.0);

      // 不協和音オシレーター2（低音の轟音）
      const osc2 = audioCtx.createOscillator();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc2.frequency.linearRampToValueAtTime(80, audioCtx.currentTime + 2.0);

      // ホワイトノイズ（耳障りな突発ノイズ）
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const noiseFilter = audioCtx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1000;
      noiseFilter.Q.value = 3;

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(distortion);

      osc1.connect(distortion);
      osc2.connect(distortion);

      osc1.start();
      osc2.start();
      whiteNoise.start();
    } catch (e) {
      console.error('Web Audio API error:', e);
    }
  }

  // --- サウンド再生のトリガー ---
  function triggerSound() {
    if (isSoundStarted) return;
    isSoundStarted = true;

    // スマホ端末等のバイブレーション
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([300, 100, 300, 100, 500, 200, 500]);
      } catch (e) {}
    }

    // 外部音声ファイルの再生試行
    let playedExternal = false;
    if (customSound) {
      audioElement.src = customSound;
    }
    audioElement.volume = 1.0;
    const playPromise = audioElement.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          playedExternal = true;
        })
        .catch(() => {
          // 外部ファイルの再生失敗またはブロック時はWeb Audio合成音を使用
          createSynthesizedScream();
        });
    } else {
      createSynthesizedScream();
    }
  }

  // --- 全画面表示の要求 ---
  function requestFullScreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  }

  // --- ジャンプスケアの起動 ---
  function launchJumpscare() {
    scareContainer.style.display = 'flex';
    triggerSound();
  }

  // 遅延がある場合の処理
  if (delaySec > 0) {
    scareContainer.style.display = 'none';
    setTimeout(launchJumpscare, delaySec * 1000);
  } else {
    launchJumpscare();
  }

  // --- 画面操作時のフォールバック（自動再生ポリシー解除 & フルスクリーン化） ---
  const handleInteraction = () => {
    triggerSound();
    requestFullScreen();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  ['click', 'touchstart', 'mousedown', 'keydown'].forEach(evt => {
    window.addEventListener(evt, handleInteraction, { once: false });
  });

  if (clickTrigger) {
    clickTrigger.addEventListener('click', handleInteraction);
    clickTrigger.addEventListener('touchstart', handleInteraction);
  }
})();
