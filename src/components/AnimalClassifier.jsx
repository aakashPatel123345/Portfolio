import { useRef, useState } from 'react';
import '../styles/components/animal-classifier.css';

const MODEL_URL = '/models/animal-classifier/model_int8.onnx';
const CLASS_NAMES_URL = '/models/animal-classifier/class_names.json';
const ORT_CDN_URL = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.19.2/dist/ort.min.js';
const MEAN = [0.485, 0.456, 0.406];
const STD = [0.229, 0.224, 0.225];

let ortScriptPromise = null;
function loadOrt() {
  if (window.ort) return Promise.resolve(window.ort);
  if (!ortScriptPromise) {
    ortScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = ORT_CDN_URL;
      script.onload = () => resolve(window.ort);
      script.onerror = () => reject(new Error('Failed to load onnxruntime-web'));
      document.head.appendChild(script);
    });
  }
  return ortScriptPromise;
}

let sessionPromise = null;
function loadSession() {
  if (!sessionPromise) {
    sessionPromise = loadOrt().then(async (ort) => {
      const [session, classNames] = await Promise.all([
        ort.InferenceSession.create(MODEL_URL, { executionProviders: ['wasm'] }),
        fetch(CLASS_NAMES_URL).then((r) => r.json()),
      ]);
      return { ort, session, classNames };
    });
  }
  return sessionPromise;
}

function softmax(logits) {
  const max = Math.max(...logits);
  const exps = logits.map((l) => Math.exp(l - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

function preprocess(img, canvas) {
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, 224, 224);
  const { data } = ctx.getImageData(0, 0, 224, 224);
  const plane = 224 * 224;
  const chw = new Float32Array(3 * plane);
  for (let i = 0; i < plane; i += 1) {
    const r = data[i * 4] / 255;
    const g = data[i * 4 + 1] / 255;
    const b = data[i * 4 + 2] / 255;
    chw[i] = (r - MEAN[0]) / STD[0];
    chw[plane + i] = (g - MEAN[1]) / STD[1];
    chw[2 * plane + i] = (b - MEAN[2]) / STD[2];
  }
  return chw;
}

export default function AnimalClassifier() {
  const [status, setStatus] = useState('idle'); // idle | loading-model | classifying | done | error
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [ranked, setRanked] = useState(null);
  const [inferenceMs, setInferenceMs] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  async function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    setError(null);
    setRanked(null);
    setPreview(URL.createObjectURL(file));

    try {
      setStatus((s) => (s === 'idle' ? 'loading-model' : s));
      const { ort, session, classNames } = await loadSession();

      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Could not read that image'));
        img.src = URL.createObjectURL(file);
      });

      setStatus('classifying');
      const chw = preprocess(img, canvasRef.current);
      const tensor = new ort.Tensor('float32', chw, [1, 3, 224, 224]);
      const t0 = performance.now();
      const outputs = await session.run({ input: tensor });
      setInferenceMs(Math.round(performance.now() - t0));

      const probs = softmax(Array.from(outputs.logits.data));
      const rankedProbs = probs
        .map((p, i) => ({ name: classNames[i], p }))
        .sort((a, b) => b.p - a.p)
        .slice(0, 3);

      setRanked(rankedProbs);
      setStatus('done');
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setStatus('error');
    }
  }

  function onDrop(e) {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div className="animal-classifier">
      <p className="animal-classifier__blurb">
        Runs entirely client-side via ONNX Runtime Web — nothing is uploaded anywhere.
      </p>

      <div
        className={`animal-classifier__drop${dragOver ? ' animal-classifier__drop--over' : ''}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
        }}
      >
        {preview ? (
          <img src={preview} alt="Uploaded preview" className="animal-classifier__preview" />
        ) : (
          <span className="mono-label">CLICK OR DROP AN IMAGE</span>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="visually-hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      <canvas ref={canvasRef} width="224" height="224" className="visually-hidden" />

      <div className="animal-classifier__status mono-label">
        {status === 'loading-model' && 'Loading model (~11MB, first time only)...'}
        {status === 'classifying' && 'Running inference...'}
        {status === 'done' && inferenceMs != null && `Inference took ${inferenceMs}ms`}
        {status === 'error' && <span className="animal-classifier__error">{error}</span>}
      </div>

      {ranked && (
        <div className="animal-classifier__result">
          <div className="animal-classifier__top">
            {ranked[0].name} <span className="mono-data">{(ranked[0].p * 100).toFixed(1)}%</span>
          </div>
          {ranked.map(({ name, p }) => (
            <div className="animal-classifier__bar-row" key={name}>
              <span className="animal-classifier__bar-label mono-label">{name}</span>
              <span className="animal-classifier__bar-track">
                <span className="animal-classifier__bar-fill" style={{ width: `${p * 100}%` }} />
              </span>
              <span className="animal-classifier__bar-pct mono-data">{(p * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
