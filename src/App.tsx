import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Roleta } from './tools/Roleta/Roleta';
import { NickGen } from './tools/NickGen/NickGen';
import { IdeaGen } from './tools/IdeaGen/IdeaGen';
import { FocusTimer } from './tools/FocusTimer/FocusTimer';
import { PassGen } from './tools/PassGen/PassGen';
import { SurpriseTool } from './tools/SurpriseTool';
import { VibeQuiz } from './tools/VibeQuiz/VibeQuiz';
import { RandomChallenge } from './tools/RandomChallenge/RandomChallenge';
import { ColorLab } from './tools/ColorLab/ColorLab';
import { GlitchText } from './tools/GlitchText/GlitchText';
import { TextCounter } from './tools/TextCounter/TextCounter';
import { LoremGen } from './tools/LoremGen/LoremGen';
import { Base64Tool } from './tools/Base64Tool/Base64Tool';
import { JsonTool } from './tools/JsonTool/JsonTool';
import { UnitConverter } from './tools/UnitConverter/UnitConverter';
import { PercentageCalc } from './tools/PercentageCalc/PercentageCalc';
import { RandomPicker } from './tools/RandomPicker/RandomPicker';
import { QRCodeGen } from './tools/QRCodeGen/QRCodeGen';
import { ContrastChecker } from './tools/ContrastChecker/ContrastChecker';
import { StopwatchTimer } from './tools/StopwatchTimer/StopwatchTimer';
import { PomodoroTimer } from './tools/PomodoroTimer/PomodoroTimer';
import { ReflexTest } from './tools/ReflexTest/ReflexTest';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ferramentas/roleta" element={<Roleta />} />
          <Route path="/ferramentas/nicks" element={<NickGen />} />
          <Route path="/ferramentas/ideias" element={<IdeaGen />} />
          <Route path="/ferramentas/timer" element={<FocusTimer />} />
          <Route path="/ferramentas/senhas" element={<PassGen />} />
          <Route path="/ferramentas/vibe" element={<VibeQuiz />} />
          <Route path="/ferramentas/desafios" element={<RandomChallenge />} />
          <Route path="/ferramentas/colorlab" element={<ColorLab />} />
          <Route path="/ferramentas/glitch" element={<GlitchText />} />
          <Route path="/ferramentas/text-counter" element={<TextCounter />} />
          <Route path="/ferramentas/lorem-gen" element={<LoremGen />} />
          <Route path="/ferramentas/base64" element={<Base64Tool />} />
          <Route path="/ferramentas/json-tool" element={<JsonTool />} />
          <Route path="/ferramentas/unit-converter" element={<UnitConverter />} />
          <Route path="/ferramentas/percentage-calc" element={<PercentageCalc />} />
          <Route path="/ferramentas/random-picker" element={<RandomPicker />} />
          <Route path="/ferramentas/qr-gen" element={<QRCodeGen />} />
          <Route path="/ferramentas/contrast-checker" element={<ContrastChecker />} />
          <Route path="/ferramentas/stopwatch" element={<StopwatchTimer />} />
          <Route path="/ferramentas/pomodoro" element={<PomodoroTimer />} />
          <Route path="/ferramentas/reflex-test" element={<ReflexTest />} />
          <Route path="/surpresa" element={<SurpriseTool />} />
          <Route path="*" element={<div className="text-center py-20 text-2xl font-bold">404 - Página não encontrada</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
