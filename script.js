const clock=document.getElementById('clock');
const tick=()=>clock.textContent=new Intl.DateTimeFormat('en-US',{timeZone:'America/Denver',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());tick();setInterval(tick,1000);

const actors=[
 ['Salt Typhoon','China','GhostEmperor; FamousSparrow; reported PRC nexus','Telecom compromise; edge-device exploitation; credential access','G1045'],
 ['Volt Typhoon','China','Vanguard Panda; Bronze Silhouette; reported state-sponsored','Living off the land; critical infrastructure pre-positioning; valid accounts','G1017'],
 ['Mustang Panda','China','TA416; RedDelta; Bronze President','Spearphishing; decoy documents; PlugX delivery','G0129'],
 ['APT41','China','Barium; Winnti; Wicked Panda','Espionage and financially motivated intrusion; supply chain; web shells','G0096'],
 ['UNC3886','China','Reported China-nexus espionage cluster','Network devices; virtualization infrastructure; rootkits; zero-days','G1048'],
 ['Lazarus Group','North Korea','Hidden Cobra; Zinc; RGB-linked','Crypto theft; destructive malware; social engineering; supply chain','G0032'],
 ['Kimsuky','North Korea','Emerald Sleet; Velvet Chollima; RGB-linked','Spearphishing; credential theft; intelligence collection','G0094'],
 ['APT28','Russia','Fancy Bear; Forest Blizzard; GRU-linked','Phishing; credential theft; exploitation; information operations','G0007'],
 ['Sandworm','Russia','Seashell Blizzard; Voodoo Bear; GRU-linked','Destructive attacks; ICS disruption; wipers; critical infrastructure','G0034'],
 ['Turla','Russia','Secret Blizzard; Venomous Bear; FSB-linked','Long-term espionage; watering holes; satellite/C2 hijacking','G0010'],
 ['Gamaredon','Russia','Primitive Bear; Aqua Blizzard; FSB-linked','High-volume phishing; USB propagation; Ukraine targeting','G0047'],
 ['CyberAv3ngers','Iran','IRGC Cyber-Electronic Command affiliation reported','Internet-exposed ICS/PLCs; default credentials; defacement','G1027'],
 ['APT33','Iran','Elfin; Peach Sandstorm; Refined Kitten','Password spraying; spearphishing; aerospace and energy targeting','G0064'],
 ['MuddyWater','Iran','Seedworm; Mango Sandstorm; MOIS-linked','Remote access tools; phishing; PowerShell; regional espionage','G0069'],
 ['OilRig','Iran','APT34; Hazel Sandstorm; Helix Kitten','Credential harvesting; DNS tunneling; phishing; cloud abuse','G0049'],
 ['Scattered Spider','Multi-national','Octo Tempest; UNC3944; Muddled Libra','Help-desk social engineering; SIM swapping; identity/cloud compromise','G1015'],
 ['FIN7','Eastern Europe / Russia nexus','Carbanak; Carbon Spider','Payment data theft; social engineering; malware; ransomware links','G0046'],
 ['LockBit','Transnational cybercrime','LockBit Black; ransomware-as-a-service','Ransomware; data theft; extortion; affiliate operations','G1004'],
 ['Cl0p','Transnational cybercrime','TA505 overlap reported; Lace Tempest','Mass exploitation of file-transfer systems; data extortion','G1019'],
 ['Akira','Transnational cybercrime','Ransomware operation; public attribution evolving','VPN access; credential abuse; data theft; double extortion','G1024']
];
const rows=document.getElementById('actorRows'),search=document.getElementById('actorSearch'),nexus=document.getElementById('nexusFilter');
[...new Set(actors.map(a=>a[1]))].sort().forEach(v=>nexus.add(new Option(v,v)));
function renderActors(){const q=search.value.toLowerCase(),n=nexus.value;rows.innerHTML='';actors.filter(a=>(n==='ALL'||a[1]===n)&&a.join(' ').toLowerCase().includes(q)).forEach((a,i)=>{const tr=document.createElement('tr');tr.innerHTML=`<td>${String(i+1).padStart(2,'0')} · ${a[0]}</td><td>${a[1]}</td><td>${a[2]}</td><td>${a[3]}</td><td><a href="https://attack.mitre.org/groups/${a[4]}/" target="_blank" rel="noopener">MITRE ${a[4]} ↗</a></td>`;rows.appendChild(tr)})}renderActors();search.addEventListener('input',renderActors);nexus.addEventListener('change',renderActors);

const fallback=[
 {source:'CISA',title:'Cybersecurity alerts and advisories',url:'https://www.cisa.gov/news-events/cybersecurity-advisories',summary:'Current government advisories, indicators, mitigations, and known exploited vulnerabilities.',published:'Continuously updated'},
 {source:'HACKER NEWS',title:'Technology community front page',url:'https://news.ycombinator.com/',summary:'Software, AI, infrastructure, research, startups, and emerging technology discussion.',published:'Live'},
 {source:'REDDIT',title:'Security and technology communities',url:'https://www.reddit.com/r/cybersecurity/',summary:'Community reporting and discussion. Verify claims against primary sources.',published:'Live'},
 {source:'SLASHDOT',title:'News for nerds, stuff that matters',url:'https://slashdot.org/',summary:'Technology, science, policy, security, and open-source news.',published:'Live'},
 {source:'OSINT',title:'MITRE ATT&CK threat knowledge base',url:'https://attack.mitre.org/',summary:'Defensive knowledge of adversary behavior, techniques, groups, software, and mitigations.',published:'Maintained'}
];
let feedItems=[];const feed=document.getElementById('newsFeed');
const clean=s=>String(s||'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
function renderFeed(source='ALL'){const items=feedItems.filter(x=>source==='ALL'||x.source===source).slice(0,24);feed.innerHTML='';items.forEach(item=>{const card=document.createElement('article');card.className='news-card';const date=item.published?new Date(item.published):null;const shown=date&&!isNaN(date)?date.toLocaleString():item.published||'Current';card.innerHTML=`<span>${clean(item.source)}</span><h3>${clean(item.title)}</h3><p>${clean(item.summary).slice(0,190)}</p><footer><time>${clean(shown)}</time><a href="${item.url}" target="_blank" rel="noopener">READ ↗</a></footer>`;feed.appendChild(card)});document.getElementById('feedCount').textContent=items.length}
async function loadFeed(){try{const r=await fetch(`data/cyber-feed.json?v=${Date.now()}`,{cache:'no-store'});if(!r.ok)throw Error();const data=await r.json();feedItems=data.items?.length?data.items:fallback;document.getElementById('feedStatus').textContent='Intelligence feeds online';document.getElementById('feedUpdated').textContent=`Last collection ${new Date(data.updated).toLocaleString()}`}catch{feedItems=fallback;document.getElementById('feedStatus').textContent='Source links online · aggregator pending';document.getElementById('feedUpdated').textContent='Live collection will populate on the next scheduled run'}renderFeed()};loadFeed();
document.querySelectorAll('[data-source]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-source]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderFeed(b.dataset.source)}));
function openAgent(role){const q=`Act as the Avanyu.tech ${role}. Begin with a concise guided intake. Use defensive, lawful, evidence-based cyber guidance. Do not request passwords, secrets, sensitive personal data, or confidential incident details. Help identify risk, authoritative sources, mitigations, and a practical human-governed next step.`;window.open('https://chatgpt.com/?q='+encodeURIComponent(q),'_blank','noopener')}
