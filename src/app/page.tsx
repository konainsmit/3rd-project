"use client";

import { useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  CloudSun,
  Droplets,
  FlaskConical,
  ImagePlus,
  Leaf,
  MapPin,
  Menu,
  MoreHorizontal,
  Phone,
  ScanLine,
  ShieldCheck,
  ShoppingBag,
  Sprout,
  Tractor,
  Upload,
  UserRound,
  X,
} from "lucide-react";

type Crop = "tomato" | "wheat" | "apple";

const diagnoses = {
  tomato: {
    crop: "Tomato",
    disease: "Early Blight",
    confidence: 96,
    color: "amber",
    note: "Concentric target spots detected on lower leaves",
    spots: [
      { top: "35%", left: "24%", size: 16 },
      { top: "48%", left: "64%", size: 22 },
      { top: "68%", left: "39%", size: 18 },
    ],
  },
  wheat: {
    crop: "Wheat",
    disease: "Leaf Rust",
    confidence: 91,
    color: "orange",
    note: "Orange urediniospores visible across leaf surface",
    spots: [
      { top: "28%", left: "55%", size: 16 },
      { top: "45%", left: "38%", size: 20 },
      { top: "65%", left: "68%", size: 14 },
    ],
  },
  apple: {
    crop: "Apple",
    disease: "Healthy leaf",
    confidence: 99,
    color: "green",
    note: "No visible signs of disease or nutrient stress",
    spots: [],
  },
};

export default function Home() {
  const [activeCrop, setActiveCrop] = useState<Crop>("tomato");
  const [reminderSet, setReminderSet] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const diagnosis = diagnoses[activeCrop];

  const simulate = (crop: Crop) => {
    setActiveCrop(crop);
  };

  const handleFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {
      setUploadError("Please choose a JPG or PNG under 10MB.");
      return;
    }
    setUploadError(null);
    setImageSrc(URL.createObjectURL(file));
  };

  return (
    <main className="min-h-screen bg-[#f5f6f2] text-[#1c1917]">
      <div className="demo-ribbon"><span>⚡</span> Demo Simulation Mode <span className="ribbon-dot" /> Live preview · Data is illustrative</div>
      <header className="border-b border-stone-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="brand-mark"><Sprout size={23} strokeWidth={2.5} /></div>
            <div><div className="brand-name">Field<span>wise</span></div><div className="brand-sub">AI crop intelligence</div></div>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-stone-500 md:flex">
            <button className="nav-active">Dashboard</button><button>My crops</button><button>Advisory</button><button>Suppliers</button>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="icon-btn" aria-label="View notifications"><Bell size={19} /><span className="notification-dot" /></button>
            <div className="hidden h-7 w-px bg-stone-200 sm:block" />
            <button className="user-chip"><span className="avatar">JM</span><span className="hidden text-left sm:block"><b>James M.</b><small>Green Valley Farm</small></span><ChevronDown size={15} className="hidden sm:block" /></button>
            <button className="icon-btn md:hidden" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}><Menu size={21} /></button>
          </div>
        </div>
        {menuOpen && <div className="mobile-nav" id="mobile-navigation"><button>Dashboard</button><button>My crops</button><button>Advisory</button><button>Suppliers</button></div>}
      </header>

      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 lg:px-10">
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><p className="eyebrow">SUNDAY, AUGUST 30, 2026 <span>·</span> MORNING CHECK-IN</p><h1 className="page-title">Good morning, James <span>✦</span></h1><p className="page-lede">Your crops are looking good. Let&apos;s keep them that way.</p></div>
          <button className="weather-card"><CloudSun size={26} /><span><b>28°C</b><small>Partly cloudy · Humidity 62%</small></span><ArrowRight size={16} /></button>
        </div>

        <section className="metric-grid">
          <Metric icon={<ShieldCheck />} label="Crop loss prevented" value="$12,450" detail="estimated this season" tone="green" />
          <Metric icon={<ScanLine />} label="Diagnosis speed" value="&lt; 1.2s" detail="average inference time" tone="gold" />
          <Metric icon={<Sprout />} label="Treatment recovery" value="94%" detail="active treatment plans" tone="blue" />
        </section>

        <div className="section-heading"><div><p className="eyebrow">COMPUTER VISION AGENT</p><h2>Diagnose a crop</h2></div><div className="flex gap-2"><span className="agent-status"><i /> Agent online</span><button className="help-btn"><CircleHelp size={17} /> How it works</button></div></div>

        <section className="diagnosis-grid">
          <div className="card capture-card">
            <div className="card-top"><div><h3>Upload or capture</h3><p>Take a clear photo of the affected leaf.</p></div><span className="step-number">01</span></div>
            <label className="capture-zone"><input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(event) => handleFile(event.target.files?.[0])} /><div className="camera-orb"><Camera size={28} /></div><b>{imageSrc ? "Image ready for analysis" : "Drop your image here"}</b><span>{imageSrc ? "Tap to choose a different image" : "or tap to browse from device"}</span><span className="capture-button"><Upload size={17} /> Choose image</span><small>JPG, PNG · Max 10MB</small>{uploadError && <em className="upload-error">{uploadError}</em>}</label>
            <div className="tip"><Lightbulb /> <span><b>For best results:</b> Fill the frame with one leaf in natural daylight.</span></div>
          </div>

          <div className="card preview-card">
            <div className="card-top"><div><h3>Latest analysis</h3><p>AI vision scan · Just now</p></div><span className={`confidence ${diagnosis.color}`}><CheckCircle2 size={15} /> {diagnosis.confidence}% confident</span></div>
            <div className="leaf-image" style={imageSrc ? { backgroundImage: `linear-gradient(135deg, #173d3299, #173d3211), url(${imageSrc})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}><div className="image-label"><ScanLine size={15} /> LIVE OVERLAY</div>{!imageSrc && <div className={`leaf-shape ${activeCrop}`}><div className="leaf-veins" /></div>}{diagnosis.spots.map((spot, i) => <div key={i} className="bounding-box" style={{ top: spot.top, left: spot.left, width: spot.size * 2.2, height: spot.size * 1.5 }}><span /></div>)}<div className="image-caption"><span>{imageSrc ? "Uploaded field image" : "Field image · Plot A-04"}</span><span>30 Aug, 08:42</span></div></div>
            <div className="diagnosis-result"><div><span className="result-label">DETECTED CONDITION</span><h3>{diagnosis.crop} {diagnosis.disease}</h3><p>{diagnosis.note}</p></div><button className="round-arrow"><ArrowRight size={19} /></button></div>
          </div>
        </section>

        <section className="simulation-strip"><div><span className="simulation-icon">⚡</span><div><b>Try a simulation</b><p>Preview how Fieldwise responds to common crop conditions.</p></div></div><div className="simulation-buttons"><button onClick={() => simulate("tomato")} className={activeCrop === "tomato" ? "selected" : ""}><span className="sim-dot tomato-dot" /> Tomato early blight</button><button onClick={() => simulate("wheat")} className={activeCrop === "wheat" ? "selected" : ""}><span className="sim-dot wheat-dot" /> Wheat leaf rust</button><button onClick={() => simulate("apple")} className={activeCrop === "apple" ? "selected" : ""}><span className="sim-dot apple-dot" /> Healthy apple leaf</button></div></section>

        <div className="section-heading treatment-heading"><div><p className="eyebrow">REMEDIATION STRATEGY ENGINE</p><h2>Your action plan</h2></div><button className="text-link">View full report <ArrowRight size={16} /></button></div>
        <section className="action-grid">
          <div className="card treatment-card"><div className="treatment-header"><div className="treatment-icon organic"><Leaf size={21} /></div><div><h3>Organic bio-remedy</h3><p>Eco-friendly · Soil-safe</p></div><span className="recommended">RECOMMENDED</span></div><div className="treatment-body"><b>Neem oil foliar spray</b><p>Mix 30ml neem oil + 5ml mild soap per 1L water. Spray both sides of leaves at dusk.</p><div className="treatment-meta"><span><Droplets size={15} /> Every 7 days</span><span><ShieldCheck size={15} /> Pollinator safe</span></div></div><button className="outline-action">View organic protocol <ArrowRight size={16} /></button></div>
          <div className="card treatment-card chemical"><div className="treatment-header"><div className="treatment-icon chemical-icon"><FlaskConical size={21} /></div><div><h3>Targeted chemical</h3><p>Fast intervention · Protective gear required</p></div></div><div className="treatment-body"><b>Chlorothalonil 75% WP</b><p>Apply 2g per 1L water. Do not harvest for 7 days after application.</p><div className="treatment-meta"><span><Droplets size={15} /> Every 10 days</span><span><AlertTriangle size={15} /> 7 day PHI</span></div></div><button className="outline-action">View safety & dosage <ArrowRight size={16} /></button></div>
          <div className="card checklist-card"><div className="card-top"><div><h3>Containment checklist</h3><p>Stop the spread before treating.</p></div><span className="check-count">2 / 4</span></div><div className="checklist"><CheckItem text="Remove affected leaves" done /><CheckItem text="Isolate infected plants" done /><CheckItem text="Reduce overhead irrigation" /><CheckItem text="Sanitize pruning tools" /></div><button className="outline-action">Open checklist <ArrowRight size={16} /></button></div>
        </section>

        <section className="lower-grid"><div className="card supplier-card"><div className="card-top"><div><p className="eyebrow">NEARBY SUPPLIERS</p><h3>Get what you need</h3><p>Verified agricultural suppliers near Green Valley.</p></div><button className="map-button"><MapPin size={16} /> Map view</button></div><Supplier name="AgriCare Depot" distance="2.4 km away" type="Crop protection" /><Supplier name="Harvest Hub Co-op" distance="5.1 km away" type="Organic inputs" /><button className="text-link supplier-link">Find more suppliers <ArrowRight size={16} /></button></div><div className="card reminder-card"><div className="reminder-art"><Bell size={23} /></div><div><p className="eyebrow">CARE REMINDER BOT</p><h3>Never miss a treatment</h3><p>Get WhatsApp reminders for spraying and follow-up health checks.</p><button className={`reminder-button ${reminderSet ? "done" : ""}`} onClick={() => setReminderSet(!reminderSet)}>{reminderSet ? <><Check size={17} /> Reminders active</> : <>Set up reminders <ArrowRight size={16} /></>}</button></div></div></section>

        <footer><span>FIELDWISE <b>·</b> BUILT FOR BETTER HARVESTS</span><span>AI insights are advisory. Always follow local label instructions.</span></footer>
      </div>
    </main>
  );
}

function Metric({ icon, label, value, detail, tone }: { icon: React.ReactNode; label: string; value: string; detail: string; tone: string }) { return <div className="metric"><div className={`metric-icon ${tone}`}>{icon}</div><div><span>{label}</span><strong dangerouslySetInnerHTML={{ __html: value }} /><small>{detail}</small></div></div>; }
function CheckItem({ text, done = false }: { text: string; done?: boolean }) { return <div className={`check-item ${done ? "done" : ""}`}><span>{done && <Check size={13} />}</span><b>{text}</b>{done && <small>Done</small>}</div>; }
function Supplier({ name, distance, type }: { name: string; distance: string; type: string }) { return <div className="supplier-row"><div className="supplier-logo"><ShoppingBag size={18} /></div><div><b>{name}</b><small>{type} · {distance}</small></div><div className="supplier-actions"><button aria-label={`Call ${name}`}><Phone size={16} /></button><button className="whatsapp" aria-label={`Message ${name}`}>◔</button></div></div>; }
function Lightbulb() { return <span className="bulb">✦</span>; }
