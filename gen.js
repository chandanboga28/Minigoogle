// Generator script - run with: node gen.js
const fs = require("fs");

function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(1998);

const topics = [
  {
    domains: ["punebites","maharashtra-eats","canteen-diaries","streetfood-india","desi-kitchen","chai-tapri","spice-route","urban-bakery","tasty-dosa","foodie-trail"],
    words: ["vada pav","biryani","dosa","misal","thali","pasta","burger","coffee","chai","paneer","tacos","bakery","samosa","gulab jamun"],
    templates: [
      "Where to find the best {w1} and hot {w2} around Pune colleges",
      "Authentic recipe for {w1} served with fresh chutney and {w2}",
      "Student budget guide for tasty {w1} and evening {w2} under 50 rupees",
      "Famous city joints known for traditional {w1} and special {w2}",
      "Weekend foodie walk tasting street {w1} and crispy {w2}"
    ]
  },
  {
    domains: ["sports-keeda","india-athletics","cricket-zone","badminton-hub","football-pune","college-champs","pitch-report","fitness-arena","game-point","stadium-pulse"],
    words: ["football","badminton","tennis","kabaddi","hockey","bowling","batting","tournament","wicket","pitch","coaching","stadium","athletics","chess"],
    templates: [
      "Inter college championship schedule for {w1} and friendly {w2} matches",
      "Beginner drills to master {w1} footwork and tactical {w2}",
      "Live tournament scorecards and analysis of {w1} vs {w2}",
      "Great moments in Indian sports history focusing on {w1} and {w2}",
      "Daily training regimen for student athletes preparing for {w1}"
    ]
  },
  {
    domains: ["bollywood-talkies","screen-magic","cinema-retro","filmi-duniya","music-melody","theatre-guild","boxoffice-track","song-lyrics-india","movie-buff","reel-reviews"],
    words: ["cinema","songs","actors","soundtrack","trailer","premiere","director","drama","action","comedy","theatre","lyrics","dialogues"],
    templates: [
      "Weekly film appreciation notes discussing {w1} and musical {w2}",
      "Behind the curtain look at legendary {w1} directors and their {w2}",
      "Top ten classic Indian {w1} gems with unforgettable {w2}",
      "Student cinema society hosting weekend screening of indie {w1}",
      "Soundtrack archive celebrating melodious {w1} and golden era {w2}"
    ]
  },
  {
    domains: ["study-smart","exam-prep-portal","notes-exchange","campus-daily","syllabus-tracker","engineering-desk","science-circle","library-corner","lecture-bank","revision-hub"],
    words: ["syllabus","lectures","revision","questions","library","research","seminar","grades","homework","lab","practicals","tutorial","formulas","textbook"],
    templates: [
      "Revision checklist for university semester {w1} and practical {w2}",
      "Download lecture summaries and previous year questions on {w1}",
      "College notice board regarding upcoming timetable for {w1}",
      "Collaborative study circle solving past problem sets on {w1} and {w2}",
      "Top tips from senior toppers for acing university {w1}"
    ]
  },
  {
    domains: ["linux-india","python-coder","web-dev-1998","open-source-lab","geek-terminal","silicon-pune","computer-club","byte-news","internet-archive","code-craft"],
    words: ["software","linux","python","programming","internet","servers","database","security","algorithms","hardware","browsers","html","compiler","networking"],
    templates: [
      "Installation and configuration tutorial for modern {w1} on PCs",
      "Introduction to computer science concepts using {w1} and {w2}",
      "Webmaster guide to building fast static sites using {w1}",
      "Understanding operating systems memory management and {w1}",
      "Open source software community tips for mastering {w1} and {w2}"
    ]
  },
  {
    domains: ["pune-heritage","sahyadri-treks","monsoon-diaries","explore-maharashtra","fort-explorer","weekend-getaway","wanderlust-india","hill-station-guide","travel-tales","backpack-pune"],
    words: ["travel","monsoon","forts","hills","resorts","backpacking","weekend","waterfalls","camping","heritage","photography","valleys","trails","routes"],
    templates: [
      "Trekking trail guide across historic Sahyadri {w1} during the {w2}",
      "Budget weekend road trip from Pune exploring misty {w1} and scenic {w2}",
      "Top 10 nature spots for students looking for relaxing {w1}",
      "Backpacker handbook for camping near ancient {w1} and {w2}",
      "Complete guide to exploring local history culture and {w1}"
    ]
  }
];
const tlds = [".com",".org",".in",".net",".edu",".ac.in"];
const hubIds = [1,2,7,10,12,17,19];

const entries = [
  {id:1, url:"pune-food-guide.com", text:"Where to eat in Pune - vada pav and biryani and pizza", links:[2]},
  {id:2, url:"best-pizza-pune.com", text:"Fresh wood-fired pizza made daily - try our cheese pizza", links:[1,3]},
  {id:3, url:"college-canteen-blog.com", text:"Student reviews of canteen food and chai and Friday pizza", links:[2,4]},
  {id:4, url:"pizza-recipes-home.com", text:"Make pizza at home - pizza dough and pizza sauce", links:[2,5]},
  {id:5, url:"cheap-eats-pune.com", text:"Good food under 100 rupees - misal and dosa and pizza slices", links:[2]},
  {id:6, url:"pizza-pizza-pizza.com", text:"pizza pizza pizza pizza pizza pizza pizza pizza pizza pizza", links:[1]},
  {id:7, url:"cricket-live-scores.com", text:"Live cricket scores and ball by ball cricket updates", links:[8,10]},
  {id:8, url:"ipl-fan-club.in", text:"IPL fan chat - team news and cricket memes", links:[7,9]},
  {id:9, url:"school-cricket-coach.com", text:"Learn cricket batting and bowling with simple drills", links:[7,10]},
  {id:10, url:"cricket-history-india.com", text:"Great moments from the history of Indian cricket", links:[7]},
  {id:11, url:"cricket-cricket-cricket.com", text:"cricket cricket cricket cricket cricket cricket cricket cricket cricket cricket", links:[7]},
  {id:12, url:"bollywood-movie-reviews.in", text:"Honest reviews of every new Bollywood movie released on Friday", links:[13,15]},
  {id:13, url:"movie-ticket-offers.com", text:"Cheap movie tickets and weekend offers in Pune", links:[12,1]},
  {id:14, url:"film-club-college.com", text:"Our college film club watches one movie every week", links:[12,17]},
  {id:15, url:"classic-movie-songs.com", text:"Old movie songs and the stories behind each movie", links:[12,13,14]},
  {id:16, url:"free-movie-free-movie.com", text:"free movie free movie free movie free movie free movie movie movie movie movie movie", links:[12]},
  {id:17, url:"exam-tips-for-students.com", text:"Smart exam tips - sleep well and practise old exam papers", links:[18,3]},
  {id:18, url:"college-notes-share.com", text:"Share class notes with friends before the exam", links:[17,19]},
  {id:19, url:"pune-college-news.in", text:"News from Pune colleges - fest dates and exam timetables and cricket matches", links:[1,7,12,17]}
];

for (let id = 20; id <= 1000; id++) {
  const t = topics[Math.floor(rng() * topics.length)];
  const domain = t.domains[Math.floor(rng() * t.domains.length)];
  const w1 = t.words[Math.floor(rng() * t.words.length)];
  const w2 = t.words[Math.floor(rng() * t.words.length)];
  const tld = tlds[Math.floor(rng() * tlds.length)];
  const num = Math.floor(rng() * 899 + 100);
  const url = domain + "-" + num + tld;
  const tmpl = t.templates[Math.floor(rng() * t.templates.length)];
  const text = tmpl.replace("{w1}", w1).replace("{w2}", w2);
  const numLinks = 1 + Math.floor(rng() * 3);
  const links = [];
  for (let k = 0; k < numLinks; k++) {
    let target;
    if (rng() < 0.25) {
      target = hubIds[Math.floor(rng() * hubIds.length)];
    } else {
      target = 20 + Math.floor(rng() * 980);
    }
    if (target !== id && !links.includes(target)) links.push(target);
  }
  if (links.length === 0) links.push(1);
  entries.push({id, url, text, links});
}

// Output as JS array literal for embedding in index.html
const lines = entries.map(function(e) {
  var safeText = e.text.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return '  {id:' + e.id + ',url:"' + e.url + '",text:"' + safeText + '",links:[' + e.links.join(",") + "]}";
});
var output = "const PAGES_DATA = [\n" + lines.join(",\n") + "\n];";
fs.writeFileSync("/Users/bogachandan/.gemini/antigravity/scratch/mini-google-1998/pages_data.js", output);
console.log("pages_data.js written with", entries.length, "entries");

