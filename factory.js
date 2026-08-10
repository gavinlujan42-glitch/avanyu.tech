const agents = [
  ["DISCOVERY","Process Interviewer","Turns daily work into stories, epics and acceptance criteria.","Product Owner"],
  ["PROCESS","Workflow Scribe","Captures the real routine, decisions, handoffs and friction.","Business Analyst"],
  ["DATA","Data Architect","Models durable data, migrations, provenance and performance.","Lead DBA"],
  ["ANALYSIS","Business Analyst","Connects mission outcomes to system behavior.","Product Manager"],
  ["DELIVERY","Product Lead","Protects priorities, outcomes and the product boundary.","Executive Sponsor"],
  ["AGILE","Scrum Master","Keeps the delivery system moving and impediments visible.","Delivery Manager"],
  ["ENGINEERING","Software Architect","Shapes APIs, services, integration and technical runway.","Chief Architect"],
  ["SECURITY","Security Engineer","Threat-models the work and keeps trust measurable.","CISO"],
  ["PLATFORM","Cloud Engineer","Builds observable, portable and cost-aware infrastructure.","Operations Lead"],
  ["QUALITY","Evaluation Engineer","Turns assumptions into repeatable evidence.","Release Manager"],
  ["DOMAIN","Knowledge Scribe","Connects records, policy, GIS and human questions.","Domain Expert"],
  ["GOVERNANCE","Chief of Staff","Keeps decisions, risk, accountability and communication aligned.","Program Executive"]
];

const board = document.querySelector('#agentBoard');
const output = document.querySelector('#terminalOutput');

agents.forEach(([code,name,mission,owner], index) => {
  const button = document.createElement('button');
  button.className = 'agent';
  button.innerHTML = `<b>${String(index + 1).padStart(2,'0')} // ${code}</b><strong>${name}</strong><small>SELECT SIGNAL ↘</small>`;
  button.addEventListener('click', () => {
    document.querySelectorAll('.agent').forEach(el => el.classList.remove('active'));
    button.classList.add('active');
    output.innerHTML = `&gt; ROLE ${String(index + 1).padStart(2,'0')} ACQUIRED<br>&gt; AI CAPABILITY: ${name.toUpperCase()}<br>&gt; MISSION: ${mission}<br>&gt; ACCOUNTABLE HUMAN: ${owner.toUpperCase()}<br>&gt; RELEASE AUTHORITY: HUMAN GATE REQUIRED`;
  });
  board.appendChild(button);
});

const stages = [
  ["DISCOVER","Interview users, observe the actual process and convert friction into measurable outcomes.","Product Owner"],
  ["MAP","Model workflows, decisions, data, handoffs, risks and acceptance criteria.","Business Analyst"],
  ["ARCHITECT","Define secure, accessible and portable solution patterns before code accelerates.","Chief Architect"],
  ["BUILD","Compose focused engineering agents around a governed backlog and shared standards.","Engineering Lead"],
  ["SECURE","Threat-model continuously and collect control evidence as the product evolves.","CISO / Security Officer"],
  ["VALIDATE","Test behavior, accessibility, performance and AI quality against explicit evidence.","Release Manager"],
  ["DEPLOY","Release observable, reversible software into an agency-approved environment.","Operations Lead"],
  ["IMPROVE","Use feedback and telemetry to prioritize the next measurable outcome.","Product Manager"]
];
const pipeline = document.querySelector('#pipeline');
const pipelineDetail = document.querySelector('#pipelineDetail');
stages.forEach(([name,description,owner], index) => {
  const button = document.createElement('button');
  button.className = `stage${index === 0 ? ' active' : ''}`;
  button.innerHTML = `<b>${String(index + 1).padStart(2,'0')}</b><span>${name}</span><i>↘</i>`;
  button.addEventListener('click', () => {
    document.querySelectorAll('.stage').forEach(el => el.classList.remove('active'));
    button.classList.add('active');
    pipelineDetail.innerHTML = `<span>${String(index + 1).padStart(2,'0')} / ${name}</span><strong>${description}</strong><p>${description}</p><small>HUMAN GATE · ${owner.toUpperCase()}</small>`;
  });
  pipeline?.appendChild(button);
});

document.querySelector('#challengeForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const workflow = String(data.get('workflow')).trim();
  const outcome = data.get('outcome');
  document.querySelector('#formNote').textContent = `PILOT BRIEF READY: Discover and map “${workflow}”; establish a baseline; validate “${outcome}”; then define the smallest secure, accessible release. No information was transmitted.`;
});

const fieldNotes = [
  [1,"craft","Care about the craft","Software is public infrastructure when people depend on it. Build as though the outcome carries your signature."],
  [2,"craft","Think about the work","Turn off autopilot. Question the goal, the approach and the evidence while you build."],
  [3,"teams","Bring options, not excuses","Describe what is possible, the tradeoffs involved and the decision that needs an owner."],
  [4,"quality","Repair broken windows","Address weak designs, misleading data and unsafe shortcuts before they become the accepted standard."],
  [5,"teams","Be a catalyst for change","Make the future tangible with a working example, then invite people to shape it."],
  [6,"design","Keep the whole system visible","Details matter, but so do dependencies, users, policy, operations and the mission beyond the screen."],
  [7,"quality","Make quality explicit","Let users and operators define what good, safe and useful actually mean."],
  [8,"craft","Invest in your knowledge portfolio","Learn continuously, diversify your tools and revisit assumptions that once seemed settled."],
  [9,"craft","Analyze what you hear","Treat vendor promises, industry fashions and AI outputs as claims requiring context and evidence."],
  [10,"teams","Communicate for the audience","A strong idea has little value if the people who must act cannot understand it."],
  [11,"design","Keep one source of truth","Represent each important fact authoritatively and derive copies wherever possible."],
  [12,"design","Make the right thing easy to reuse","Good patterns spread when they are discoverable, documented and simpler than reinvention."],
  [13,"design","Decouple unrelated change","Give components clear purposes and boundaries so one decision does not shake the whole system."],
  [14,"design","Plan for decisions to evolve","Record why a choice was made, isolate it and preserve a credible path to change."],
  [15,"delivery","Use tracer releases","Deliver a thin end-to-end path early, observe where it lands and correct course with evidence."],
  [16,"delivery","Prototype to learn","A prototype earns its keep through reduced uncertainty—not through the amount of code produced."],
  [17,"design","Speak the domain language","Use the words your users use in interfaces, models, stories and tests."],
  [18,"delivery","Estimate to expose uncertainty","Forecast before starting so hidden assumptions, dependencies and risks become discussable."],
  [19,"delivery","Update the plan with reality","Use each sprint to refine time, scope and risk instead of defending an obsolete estimate."],
  [20,"craft","Keep durable knowledge portable","Favor open, searchable formats for decisions, configuration, documentation and evidence."],
  [21,"craft","Automate repetitive text work","Let scripts handle repeatable transformations so people can focus on judgment."],
  [22,"craft","Master the tools you use daily","Configure your editor, shell and review workflow until they support thought instead of interrupting it."],
  [23,"delivery","Always use version control","Every meaningful artifact needs history, authorship and a safe path backward."],
  [24,"teams","Fix the problem, not the blame","Restore service, learn from the system and improve the guardrail."],
  [25,"quality","Do not panic while debugging","Slow down, reproduce the behavior and test one hypothesis at a time."],
  [26,"quality","Challenge the nearest assumption","The exotic explanation is rarely the first one worth testing."],
  [27,"quality","Prove it in the real environment","Validate assumptions with representative data, boundary conditions and deployment constraints."],
  [28,"delivery","Generate repeatable work","Use templates and automation to remove duplication while keeping generated output understandable."],
  [29,"quality","Design for inevitable failure","Protect users and data with validation, recovery, observability and clear failure modes."],
  [30,"design","Make contracts explicit","Define what a component accepts, guarantees and refuses—then test those promises."],
  [31,"quality","Fail early and visibly","A clear stop near the cause is safer than corrupted work continuing silently."],
  [32,"quality","Assert the impossible","Encode critical invariants so violated assumptions produce evidence immediately."],
  [33,"design","Own the full resource lifecycle","The component that acquires a resource should make its safe release unavoidable."],
  [34,"design","Minimize coupling","Keep modules shy, interfaces narrow and dependencies intentional."],
  [35,"design","Put details in configuration","Keep policy and environment choices outside core behavior when they must change independently."],
  [36,"design","Design services around capability","Give each service a coherent responsibility, stable boundary and observable contract."],
  [37,"design","Separate views from models","Protect mission logic from presentation choices so each can evolve cleanly."],
  [38,"design","Coordinate agents through shared facts","Use governed work queues and evidence stores rather than hidden agent-to-agent assumptions."],
  [39,"craft","Do not build by coincidence","Understand why the system works before depending on the behavior."],
  [40,"quality","Test performance where it matters","Measure with representative load in the target environment instead of trusting theory alone."],
  [41,"quality","Refactor early and often","Remove structural debt while the context and evidence are still fresh."],
  [42,"quality","Design to test","Define observable behavior and acceptance evidence before implementation begins."],
  [43,"quality","Test before users have to","Automate critical paths, risks and regressions as part of every build."],
  [44,"craft","Understand generated code","AI-generated or scaffolded code remains your responsibility. Read it, test it and own it."],
  [45,"delivery","Dig for requirements","Observe real work beneath stated requests, legacy habits and organizational assumptions."],
  [46,"teams","Work beside the user","Shared context reveals needs that interviews and documents alone cannot surface."],
  [47,"design","Invest in durable abstractions","Technologies rotate; sound domain boundaries and contracts last longer."],
  [48,"teams","Maintain a shared glossary","Give project language one visible, governed home."],
  [49,"delivery","Find the real constraint","Before accepting an impossible problem, ask what must be true and what is merely customary."],
  [50,"delivery","Build when evidence is sufficient","Do not let specification become a substitute for learning through working software."],
  [51,"craft","Use methods deliberately","Adopt practices because they improve this system—not because they carry prestige."],
  [52,"craft","Judge tools by outcomes","Price, popularity and novelty are not evidence of fit."],
  [53,"teams","Organize around outcomes","Keep design, engineering, data, security and testing close to the mission slice they share."],
  [54,"delivery","Automate repeatable procedures","If a process must happen the same way twice, make it executable and observable."],
  [55,"quality","Test early, often and automatically","Fast feedback belongs in every commit and every release path."],
  [56,"quality","The build is not done until tests pass","A release without evidence is only a claim."],
  [57,"quality","Test the tests","Use controlled faults and mutation to verify that the safety net can actually detect failure."],
  [58,"quality","Cover states, not merely lines","Test meaningful conditions, transitions, permissions and recovery paths."],
  [59,"quality","Find each bug once","Convert every human-discovered defect into a durable regression check."],
  [60,"delivery","Build documentation in","Generate operational and technical knowledge from the same sources that drive the product."],
  [61,"teams","Exceed expectations gently","Understand the promised outcome, deliver it reliably and add only what creates real value."],
  [62,"craft","Sign your work","Make ownership visible and produce work you can defend with evidence."],
  [63,"quality","Test accessibility as behavior","Keyboard, contrast, semantics and assistive technology belong in acceptance criteria."],
  [64,"quality","Treat security as a continuous test","Threat models and control evidence evolve with every architecture and code change."],
  [65,"delivery","Keep releases reversible","Use small changes, observable health and practiced rollback paths."],
  [66,"teams","Name the accountable human","Agents can produce work; only people approve risk and own outcomes."],
  [67,"design","Capture provenance","Record where data, decisions and AI-generated content came from and how they changed."],
  [68,"delivery","Measure mission outcomes","Velocity is useful only when it improves service, safety, cost or trust."],
  [69,"design","Prefer portable architecture","Keep agency data and mission capability separable from any single vendor."],
  [70,"craft","Leave the system stronger","Each change should improve the product, the evidence and the team’s ability to make the next change."]
];

let activeTipFilter = 'all';
const tipSearch = document.querySelector('#tipSearch');
const tipsGrid = document.querySelector('#tipsGrid');
const tipCount = document.querySelector('#tipCount');
const tipsEmpty = document.querySelector('#tipsEmpty');

function renderFieldNotes() {
  const query = tipSearch?.value.toLowerCase().trim() || '';
  const matches = fieldNotes.filter(([,category,title,description]) =>
    (activeTipFilter === 'all' || category === activeTipFilter) &&
    `${title} ${description}`.toLowerCase().includes(query)
  );
  if (tipCount) tipCount.textContent = String(matches.length).padStart(2,'0');
  if (tipsEmpty) tipsEmpty.hidden = matches.length > 0;
  if (!tipsGrid) return;
  tipsGrid.replaceChildren(...matches.map(([id,category,title,description]) => {
    const article = document.createElement('article');
    article.className = 'tip-card';
    const meta = document.createElement('span');
    meta.textContent = `${String(id).padStart(2,'0')} // ${category.toUpperCase()}`;
    const heading = document.createElement('h3');
    heading.textContent = title;
    const copy = document.createElement('p');
    copy.textContent = description;
    article.append(meta, heading, copy);
    return article;
  }));
}

tipSearch?.addEventListener('input', renderFieldNotes);
document.querySelectorAll('[data-tip-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-tip-filter]').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  activeTipFilter = button.dataset.tipFilter;
  renderFieldNotes();
}));
renderFieldNotes();

const header = document.querySelector('.masthead');
if (header) addEventListener('scroll', () => header.style.borderBottomColor = scrollY > 40 ? 'rgba(71,197,184,.25)' : 'rgba(238,232,219,.15)', {passive:true});

// NM GeoGIS operations picture. Schematic layers are explicitly prototype data.
if (window.L && document.querySelector('#nmMap')) {
  const map = L.map('nmMap', {zoomControl:true, attributionControl:true}).setView([34.45,-106.05], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
  const fiber=L.layerGroup().addTo(map), leo=L.layerGroup().addTo(map), outage=L.layerGroup().addTo(map);
  const fiberStyle={color:'#47c5b8',weight:2,opacity:.82,dashArray:'7 7'};
  [
    [[36.90,-104.44],[35.69,-105.94],[35.08,-106.65],[34.06,-106.89],[32.32,-106.76]],
    [[35.08,-106.65],[35.53,-108.74],[35.69,-108.77]],
    [[35.08,-106.65],[34.40,-103.20]],
    [[32.32,-106.76],[32.27,-107.76]]
  ].forEach(points=>L.polyline(points,fiberStyle).bindTooltip('SCHEMATIC FIBER CORRIDOR',{className:'ops-tooltip'}).addTo(fiber));
  const sites={abq:[35.0844,-106.6504],santaFe:[35.6870,-105.9378],gallup:[35.5281,-108.7426],lascruces:[32.3199,-106.7637],roswell:[33.3943,-104.5230],farmington:[36.7281,-108.2187]};
  Object.entries(sites).forEach(([name,latlng])=>L.circleMarker(latlng,{radius:5,color:'#d6ccba',weight:1,fillColor:'#47c5b8',fillOpacity:.75}).bindTooltip(`${name.toUpperCase()} // NETWORK NODE`,{className:'ops-tooltip'}).addTo(fiber));
  [[35.2,-106.3,120],[34.1,-105.6,145],[32.8,-106.4,125],[36.0,-107.0,120]].forEach(([lat,lng,r])=>L.circle([lat,lng],{radius:r*1000,color:'#6f79bc',weight:1,opacity:.42,fillColor:'#58629d',fillOpacity:.045,dashArray:'3 8'}).bindTooltip('LEO SERVICE ZONE // SCHEMATIC',{className:'ops-tooltip'}).addTo(leo));
  [['abq','FIBER DEGRADATION // SIMULATED','#c69648'],['gallup','BACKHAUL LOSS // SIMULATED','#a94e35'],['lascruces','LEO LATENCY // SIMULATED','#47c5b8']].forEach(([key,label,color])=>L.circleMarker(sites[key],{radius:11,color,weight:1,fillColor:color,fillOpacity:.15}).bindTooltip(label,{className:'ops-tooltip'}).addTo(outage));
  document.querySelectorAll('[data-layer]').forEach(input=>input.addEventListener('change',()=>{const layer={fiber,leo,outage}[input.dataset.layer];input.checked?layer.addTo(map):map.removeLayer(layer)}));
  document.querySelectorAll('.incident[data-focus]').forEach(button=>button.addEventListener('click',()=>map.flyTo(sites[button.dataset.focus],9,{duration:1.2})));
  const clock=document.querySelector('#mapClock'); const tick=()=>{if(clock)clock.textContent=`UTC ${new Date().toISOString().slice(11,19)}`}; tick(); setInterval(tick,1000); setTimeout(()=>map.invalidateSize(),150);
}
