// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faAtom, 
//   faSliders, 
//   faTerminal, 
//   faDice, 
//   faPalette, 
//   faBolt, 
//   faEye, 
//   faDownload, 
//   faClockRotateLeft,
//   faWandMagicSparkles,
//   faExpand,
//   faCube,
//   faMinus,
//   faLock,
//   faFileSignature,
//   faPaintbrush,
//   faBrain,
//   faGears
// } from '@fortawesome/free-solid-svg-icons';
// import './App.css';

// const PRESET_STYLES = [
//   { label: '✨ Raw', value: '' },
//   { label: '📷 Realism', value: ', 8k resolution, photorealistic, cinematic lighting, ultra-detailed' },
//   { label: '🌆 Cyberpunk', value: ', cyberpunk style, neon lights, highly detailed futuristic city theme, octane render' },
//   { label: '🎨 Anime', value: ', anime style, studio ghibli, vibrant colors, trending on artstation, masterpiece' },
//   { label: '💎 3D Render', value: ', 3d render, octane render, unreal engine 5, soft shadows, volumetric lighting' },
// ];

// const SURPRISE_PROMPTS = [
//   "A futuristic cybernetic engineer working on glowing holographic code in a neon workstation",
//   "An ethereal dragon floating through a synthwave neon-lit futuristic metropolis",
//   "Cinematic portrait of an astronaut looking at a floating crystal monolith on a purple planet",
//   "A cozy futuristic workstation filled with biomechanical plants and mechanical gadgets"
// ];

// export default function App() {
//   const [prompt, setPrompt] = useState('');
//   const [selectedStyle, setSelectedStyle] = useState('');
//   const [width, setWidth] = useState(1024);
//   const [height, setHeight] = useState(1024);
//   const [loading, setLoading] = useState(false);
//   const [enhancing, setEnhancing] = useState(false);
//   const [hudStep, setHudStep] = useState(0);
//   const [currentImage, setCurrentImage] = useState(null);
//   const [error, setError] = useState('');
//   const [history, setHistory] = useState([]);

//   const pipelineSteps = [
//     { title: "1. Prompt Ingestion", icon: faFileSignature },
//     { title: "2. Style Matrix", icon: faPaintbrush },
//     { title: "3. Neural Synthesis", icon: faBrain }
//   ];

//   const handleSurpriseMe = () => {
//     const random = SURPRISE_PROMPTS[Math.floor(Math.random() * SURPRISE_PROMPTS.length)];
//     setPrompt(random);
//   };

//   const handleEnhancePrompt = async () => {
//     if (!prompt.trim()) return;
//     setEnhancing(true);

//     try {
//       const response = await fetch('http://localhost:5000/api/enhance-prompt', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt })
//       });

//       const data = await response.json();
//       if (data.success && data.enhanced_prompt) {
//         setPrompt(data.enhanced_prompt);
//       }
//     } catch (err) {
//       console.error("Failed to enhance prompt", err);
//     } finally {
//       setEnhancing(false);
//     }
//   };

//   const handleGenerate = async (e) => {
//     e.preventDefault();
//     if (!prompt.trim()) return;

//     setLoading(true);
//     setHudStep(0);
//     setError('');

//     const stepInterval = setInterval(() => {
//       setHudStep((prev) => (prev < 2 ? prev + 1 : prev));
//     }, 1500);

//     const fullPrompt = prompt + selectedStyle;

//     try {
//       const response = await fetch('http://localhost:5000/api/generate', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt: fullPrompt, width: Number(width), height: Number(height) })
//       });

//       const data = await response.json();

//       if (data.success && data.image) {
//         const imgSrc = `data:image/png;base64,${data.image}`;
//         setCurrentImage(imgSrc);
//         setHistory(prev => [{ src: imgSrc, promptText: prompt }, ...prev]);
        
//         document.getElementById('viewport-section')?.scrollIntoView({ behavior: 'smooth' });
//       } else {
//         setError(data.error || 'Failed to generate image.');
//       }
//     } catch (err) {
//       setError('Network error. Ensure your Flask server is running on port 5000.');
//     } finally {
//       clearInterval(stepInterval);
//       setLoading(false);
//     }
//   };

//   const handleDownload = () => {
//     if (!currentImage) return;
//     const a = document.createElement('a');
//     a.href = currentImage;
//     a.download = `nexus-art-${Date.now()}.png`;
//     a.click();
//   };

//   const handleFullscreen = () => {
//     if (!currentImage) return;
//     const win = window.open();
//     win.document.write(`<img src="${currentImage}" style="width:100vw;height:100vh;object-fit:contain;background:#050811;">`);
//   };

//   return (
//     <div className="app-container">
//       {/* Background Glows */}
//       <div className="glow-orb orb-1"></div>
//       <div className="glow-orb orb-2"></div>

//       {/* Header Navbar */}
//       <header className="navbar">
//         <div className="brand">
//           <FontAwesomeIcon icon={faAtom} className="brand-icon" />
//           <span className="brand-title">NEXUS<span>AI</span></span>
//           <span className="version-tag">PRO ENGINE</span>
//         </div>
//         <div className="system-status">
//           <span className="pulse-dot"></span>
//           <span>FLUX CORE: ONLINE</span>
//         </div>
//       </header>

//       {/* Pipeline Banner */}
//       <section className="pipeline-banner">
//         <div className="pipeline-title">
//           <span className="three-dots"></span>
//           <span>SYNTHESIS WORKFLOW PIPELINE</span>
//         </div>
//         <div className="pipeline-workflow">
//           {pipelineSteps.map((step, idx) => (
//             <React.Fragment key={idx}>
//               <div className={`workflow-node ${loading && hudStep === idx ? 'active' : ''}`}>
//                 <div className="node-icon">
//                   <FontAwesomeIcon icon={step.icon} />
//                 </div>
//                 <span>{step.title}</span>
//               </div>
//               {idx < pipelineSteps.length - 1 && <div className="glow-connector"></div>}
//             </React.Fragment>
//           ))}
//         </div>
//       </section>

//       {/* STAGE 1: GENERATION PARAMETERS */}
//       <section className="panel command-panel">
//         <div className="panel-header">
//           <FontAwesomeIcon icon={faSliders} className="header-icon" />
//           <h2>STAGE 1: GENERATION PARAMETERS</h2>
//         </div>

//         <form onSubmit={handleGenerate}>
//           {/* Prompt Group */}
//           <div className="input-group">
//             <div className="label-wrapper">
//               <label><span className="prompt-symbol">&gt;_</span> NEURAL PROMPT</label>
//               <div className="action-buttons-row">
//                 <button 
//                   type="button" 
//                   onClick={handleEnhancePrompt} 
//                   className="btn-action btn-magic"
//                   disabled={enhancing}
//                 >
//                   <FontAwesomeIcon icon={faWandMagicSparkles} /> {enhancing ? 'Enhancing...' : 'Magic Enhance'}
//                 </button>
//                 <button type="button" onClick={handleSurpriseMe} className="btn-action btn-surprise">
//                   <FontAwesomeIcon icon={faDice} /> Surprise Me
//                 </button>
//                 <button type="button" className="btn-icon-only"><FontAwesomeIcon icon={faCube} /></button>
//                 <button type="button" className="btn-icon-only"><FontAwesomeIcon icon={faMinus} /></button>
//                 <button type="button" className="btn-icon-only"><FontAwesomeIcon icon={faLock} /></button>
//               </div>
//             </div>
//             <textarea
//               rows="3"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Visualize your creation..."
//               required
//             />
//           </div>

//           {/* Artistic Matrix */}
//           <div className="input-group text-center">
//             <label className="matrix-label"><FontAwesomeIcon icon={faPalette} /> ARTISTIC MATRIX</label>
//             <div className="style-chips-center">
//               {PRESET_STYLES.map((style, idx) => (
//                 <button
//                   key={idx}
//                   type="button"
//                   className={`chip ${selectedStyle === style.value ? 'active' : ''}`}
//                   onClick={() => setSelectedStyle(style.value)}
//                 >
//                   {style.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Canvas Size Selectors */}
//           <div className="grid-2">
//             <div className="input-group">
//               <label>CANVAS WIDTH (PX)</label>
//               <select value={width} onChange={(e) => setWidth(e.target.value)}>
//                 <option value={512}>512 px</option>
//                 <option value={768}>768 px</option>
//                 <option value={1024}>1024 px</option>
//               </select>
//             </div>

//             <div className="input-group">
//               <label>Canvas Presets</label>
//               <select value={height} onChange={(e) => setHeight(e.target.value)}>
//                 <option value={512}>512 px</option>
//                 <option value={768}>768 px</option>
//                 <option value={1024}>1024 px</option>
//               </select>
//             </div>
//           </div>

//           <button type="submit" className="cyber-btn" disabled={loading}>
//             <FontAwesomeIcon icon={faBolt} /> 
//             {loading ? ' SYNTHESIZING CANVAS...' : ' INITIALIZE GENERATION PIPELINE'}
//           </button>
//         </form>
//       </section>

//       {/* STAGE 2: OUTPUT VIEWPORT */}
//       <section id="viewport-section" className="panel viewport-panel">
//         <div className="panel-header">
//           <FontAwesomeIcon icon={faGears} className="header-icon" />
//           <h2>STAGE 2: OUTPUT VIEWPORT</h2>
//         </div>

//         <div className="viewport-wrapper">
//           {!loading && !currentImage && (
//             <div className="idle-state">
//               <FontAwesomeIcon icon={faEye} className="placeholder-icon" />
//               <p>WAITING FOR INFERENCE PIPELINE EXECUTION...</p>
//             </div>
//           )}

//           {loading && (
//             <div className="loading-state">
//               <div className="cyber-spinner"></div>
//               <p className="loading-status">
//                 [{hudStep + 1}/3] {pipelineSteps[hudStep].title.toUpperCase()}
//               </p>
//             </div>
//           )}

//           {!loading && currentImage && (
//             <img src={currentImage} alt="Synthesized Output" className="rendered-image" />
//           )}
//         </div>

//         {currentImage && !loading && (
//           <div className="action-bar">
//             <button onClick={handleDownload} className="action-btn primary">
//               <FontAwesomeIcon icon={faDownload} /> DOWNLOAD HIGH-RES
//             </button>
//             <button onClick={handleFullscreen} className="action-btn">
//               <FontAwesomeIcon icon={faExpand} /> OPEN FULLSCREEN
//             </button>
//           </div>
//         )}

//         {error && <div className="error-box">{error}</div>}
//       </section>

//       {/* RECENT GENERATIONS */}
//       {history.length > 0 && (
//         <section className="history-section">
//           <h3><FontAwesomeIcon icon={faClockRotateLeft} /> RECENT SESSION GENERATIONS</h3>
//           <div className="history-grid">
//             {history.map((item, index) => (
//               <div 
//                 key={index} 
//                 className="history-item"
//                 onClick={() => { 
//                   setCurrentImage(item.src); 
//                   setPrompt(item.promptText); 
//                   document.getElementById('viewport-section')?.scrollIntoView({ behavior: 'smooth' });
//                 }}
//               >
//                 <img src={item.src} alt="History thumbnail" />
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }











import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAtom, 
  faSliders, 
  faTerminal, 
  faDice, 
  faPalette, 
  faBolt, 
  faEye, 
  faDownload, 
  faClockRotateLeft,
  faWandMagicSparkles,
  faExpand,
  faFileSignature,
  faPaintbrush,
  faBrain,
  faSlidersH
} from '@fortawesome/free-solid-svg-icons';
import './App.css';

const PRESET_STYLES = [
  { label: '✨ Raw', value: '' },
  { label: '📷 Realism', value: ', 8k resolution, photorealistic, cinematic lighting, ultra-detailed' },
  { label: '🌆 Cyberpunk', value: ', cyberpunk style, neon lights, highly detailed futuristic city theme, octane render' },
  { label: '🎨 Anime', value: ', anime style, studio ghibli, vibrant colors, trending on artstation, masterpiece' },
  { label: '💎 3D Render', value: ', 3d render, octane render, unreal engine 5, soft shadows, volumetric lighting' },
];

const SURPRISE_PROMPTS = [
  "A futuristic cybernetic engineer working on glowing holographic code in a neon workstation",
  "An ethereal dragon floating through a synthwave neon-lit futuristic metropolis",
  "Cinematic portrait of an astronaut looking at a floating crystal monolith on a purple planet",
  "A cozy futuristic workstation filled with biomechanical plants and mechanical gadgets"
];

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [hudStep, setHudStep] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  const pipelineSteps = [
    { title: "Prompt Processing", icon: faFileSignature },
    { title: "Aesthetic Matrix", icon: faPaintbrush },
    { title: "Neural Synthesis", icon: faBrain }
  ];

  const handleSurpriseMe = () => {
    const random = SURPRISE_PROMPTS[Math.floor(Math.random() * SURPRISE_PROMPTS.length)];
    setPrompt(random);
  };

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    setEnhancing(true);

    try {
      const response = await fetch('http://localhost:5000/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      if (data.success && data.enhanced_prompt) {
        setPrompt(data.enhanced_prompt);
      }
    } catch (err) {
      console.error("Failed to enhance prompt", err);
    } finally {
      setEnhancing(false);
    }
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setHudStep(0);
    setError('');

    const stepInterval = setInterval(() => {
      setHudStep((prev) => (prev < 2 ? prev + 1 : prev));
    }, 1500);

    const fullPrompt = prompt + selectedStyle;

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt, width: Number(width), height: Number(height) })
      });

      const data = await response.json();

      if (data.success && data.image) {
        const imgSrc = `data:image/png;base64,${data.image}`;
        setCurrentImage(imgSrc);
        setHistory(prev => [{ src: imgSrc, promptText: prompt }, ...prev]);
        
        document.getElementById('viewport-section')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setError(data.error || 'Failed to generate image.');
      }
    } catch (err) {
      setError('Network error. Ensure your Flask server is running on port 5000.');
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!currentImage) return;
    const a = document.createElement('a');
    a.href = currentImage;
    a.download = `aether-art-${Date.now()}.png`;
    a.click();
  };

  const handleFullscreen = () => {
    if (!currentImage) return;
    const win = window.open();
    win.document.write(`<img src="${currentImage}" style="width:100vw;height:100vh;object-fit:contain;background:#070e17;">`);
  };

  return (
    <div className="app-container">
      {/* Soft Background Orbs */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      {/* Header */}
      <header className="navbar">
        <div className="brand">
          <FontAwesomeIcon icon={faAtom} className="brand-icon" />
          <span className="brand-title">AETHER<span>AI</span></span>
          <span className="version-tag">v2.5 PRO</span>
        </div>
        <div className="system-status">
          <span className="pulse-dot"></span>
          <span>FLUX ENGINE ONLINE</span>
        </div>
      </header>

      {/* Clean Workflow Pipeline */}
      <section className="pipeline-banner">
        <div className="pipeline-workflow">
          {pipelineSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className={`workflow-node ${loading && hudStep === idx ? 'active' : ''}`}>
                <FontAwesomeIcon icon={step.icon} className="node-icon" />
                <span>{step.title}</span>
              </div>
              {idx < pipelineSteps.length - 1 && <div className="glow-connector"></div>}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Stage 1: Controls */}
      <section className="panel command-panel">
        <div className="panel-header">
          <FontAwesomeIcon icon={faSliders} className="header-icon" />
          <h2>STAGE 1: GENERATION PARAMETERS</h2>
        </div>

        <form onSubmit={handleGenerate}>
          {/* Prompt Section */}
          <div className="input-group">
            <div className="label-wrapper">
              <label><FontAwesomeIcon icon={faTerminal} /> NEURAL PROMPT</label>
              <div className="action-buttons-row">
                <button 
                  type="button" 
                  onClick={handleEnhancePrompt} 
                  className="btn-action btn-magic"
                  disabled={enhancing}
                >
                  <FontAwesomeIcon icon={faWandMagicSparkles} /> {enhancing ? 'Enhancing...' : 'Magic Enhance'}
                </button>
                <button type="button" onClick={handleSurpriseMe} className="btn-action btn-surprise">
                  <FontAwesomeIcon icon={faDice} /> Surprise Me
                </button>
              </div>
            </div>
            <textarea
              rows="3"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Visualize your creation in detail..."
              required
            />
          </div>

          {/* Artistic Matrix */}
          <div className="input-group">
            <label className="matrix-label"><FontAwesomeIcon icon={faPalette} /> ARTISTIC MATRIX</label>
            <div className="style-chips">
              {PRESET_STYLES.map((style, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`chip ${selectedStyle === style.value ? 'active' : ''}`}
                  onClick={() => setSelectedStyle(style.value)}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions Selector */}
          <div className="grid-2">
            <div className="input-group">
              <label>WIDTH (PX)</label>
              <select value={width} onChange={(e) => setWidth(e.target.value)}>
                <option value={512}>512 px</option>
                <option value={768}>768 px</option>
                <option value={1024}>1024 px</option>
              </select>
            </div>

            <div className="input-group">
              <label>HEIGHT (PX)</label>
              <select value={height} onChange={(e) => setHeight(e.target.value)}>
                <option value={512}>512 px</option>
                <option value={768}>768 px</option>
                <option value={1024}>1024 px</option>
              </select>
            </div>
          </div>

          <button type="submit" className="cyber-btn" disabled={loading}>
            <FontAwesomeIcon icon={faBolt} /> 
            {loading ? ' SYNTHESIZING CANVAS...' : ' INITIALIZE GENERATION'}
          </button>
        </form>
      </section>

      {/* Stage 2: Viewport */}
      <section id="viewport-section" className="panel viewport-panel">
        <div className="panel-header">
          <FontAwesomeIcon icon={faSlidersH} className="header-icon" />
          <h2>STAGE 2: OUTPUT VIEWPORT</h2>
        </div>

        <div className="viewport-wrapper">
          {!loading && !currentImage && (
            <div className="idle-state">
              <FontAwesomeIcon icon={faEye} className="placeholder-icon" />
              <p>WAITING FOR INFERENCE PIPELINE EXECUTION...</p>
            </div>
          )}

          {loading && (
            <div className="loading-state">
              <div className="cyber-spinner"></div>
              <p className="loading-status">
                [{hudStep + 1}/3] {pipelineSteps[hudStep].title.toUpperCase()}
              </p>
            </div>
          )}

          {!loading && currentImage && (
            <img src={currentImage} alt="Synthesized Output" className="rendered-image" />
          )}
        </div>

        {currentImage && !loading && (
          <div className="action-bar">
            <button onClick={handleDownload} className="action-btn primary">
              <FontAwesomeIcon icon={faDownload} /> DOWNLOAD HIGH-RES
            </button>
            <button onClick={handleFullscreen} className="action-btn">
              <FontAwesomeIcon icon={faExpand} /> OPEN FULLSCREEN
            </button>
          </div>
        )}

        {error && <div className="error-box">{error}</div>}
      </section>

      {/* History Section */}
      {history.length > 0 && (
        <section className="history-section">
          <h3><FontAwesomeIcon icon={faClockRotateLeft} /> RECENT SESSION GENERATIONS</h3>
          <div className="history-grid">
            {history.map((item, index) => (
              <div 
                key={index} 
                className="history-item"
                onClick={() => { 
                  setCurrentImage(item.src); 
                  setPrompt(item.promptText); 
                  document.getElementById('viewport-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <img src={item.src} alt="History thumbnail" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}