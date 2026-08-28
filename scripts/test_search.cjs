// Exercise the shipped search script with a minimal DOM adapter, not a browser.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('veterinary/Vet-search.html','utf8');
const decode=s=>s.replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
function element(){return {value:'',hidden:false,disabled:false,textContent:'',events:{},addEventListener(n,f){this.events[n]=f},scrollIntoView(){},focus(){},append(){}}}
function run(url){
 const cards=[...html.matchAll(/<article class="publication" id="([^"]+)" ([^>]+)>/g)].map(m=>{const c=element();c.id=decode(m[1]);c.dataset={};for(const a of m[2].matchAll(/data-([\w-]+)="([^"]*)"/g))c.dataset[a[1]]=decode(a[2]);return c;});
 const els=Object.fromEntries(['filters','q','institution','species','study','category','year','links','sort','page-size','stats','previous','next','clear','results','empty','page-status','interactive','pagination'].map(k=>[k,element()]));
 els.sort.value='newest';els['page-size'].value='12';let loc=new URL(url||'https://example.test/BHOC-platform/veterinary/Vet-search.html');
 const ctx={URL,document:{querySelector:()=>els.filters,querySelectorAll:()=>cards,getElementById:id=>els[id]},location:loc,history:{replaceState(a,b,u){loc=new URL(u,loc);ctx.location=loc}}};
 vm.runInNewContext(fs.readFileSync('assets/publications.js','utf8'),ctx);
 return {els,cards,visible:()=>cards.filter(c=>!c.hidden),set(k,v){els[k].value=v;els[k].events[k==='q'?'input':'change']()},click(k){els[k].events.click()},url:()=>loc};
}
let s=run();assert.equal(s.visible().length,12);assert.equal(s.els.previous.disabled,true);assert.match(s.els.stats.textContent,/242 records/);
s.click('next');assert.equal(s.els['page-status'].textContent,'Page 2 of 21');assert.equal(s.url().searchParams.get('page'),'2');s.click('previous');assert.equal(s.els.previous.disabled,true);
s.set('q','UPenn');assert.ok(s.visible().length);assert.ok(s.visible().every(c=>JSON.parse(c.dataset.institutions).includes('University of Pennsylvania')));
s.set('species','Canine');assert.ok(s.visible().every(c=>JSON.parse(c.dataset.species).includes('Canine')));
s.set('q','zzzz-no-such-paper');assert.equal(s.visible().length,0);assert.equal(s.els.empty.hidden,false);assert.equal(s.els.next.disabled,true);
s.click('clear');assert.equal(s.visible().length,12);assert.equal(s.els.species.value,'');assert.equal(s.els.empty.hidden,true);
s.set('institution','missing');assert.ok(s.visible().every(c=>JSON.parse(c.dataset.institutions).length===0));s.click('clear');
s.set('links','yes');assert.ok(s.visible().every(c=>c.dataset.link==='yes'));s.click('clear');
s.set('year','2003');assert.ok(s.visible().length);assert.ok(s.visible().every(c=>c.dataset.year==='2003'));s.click('clear');
s.set('q','Guelph lymphoma');assert.equal(s.visible().length,1);assert.equal(s.visible()[0].dataset.id,'ammersbach-2008');
s=run('https://example.test/BHOC-platform/veterinary/Vet-search.html?institution=University%20of%20Pennsylvania');assert.ok(s.visible().length);assert.ok(s.visible().every(c=>JSON.parse(c.dataset.institutions).includes('University of Pennsylvania')));
s=run('https://example.test/BHOC-platform/veterinary/Vet-search.html#cabrales-2009');assert.equal(s.visible().length,1);assert.equal(s.visible()[0].id,'cabrales-2009');
s=run('https://example.test/BHOC-platform/veterinary/Vet-search.html?page=999');assert.equal(s.els.next.disabled,true);assert.equal(s.els['page-status'].textContent,'Page 21 of 21');
s=run();s.set('page-size','24');assert.equal(s.visible().length,24);s.set('sort','oldest');assert.match(s.els['page-status'].textContent,/Page 1/);
console.log('PASS: default load, pagination, combined search, aliases, filters, reset, empty states, URL state, fragments and page bounds');
