let filter="All";
const q=document.getElementById("q"), results=document.getElementById("results"), count=document.getElementById("count");
function render(){
 const term=q.value.trim().toLowerCase();
 const list=DRUGS.filter(d=>(filter==="All"||d.risk===filter)&&(!term||d.name.toLowerCase().includes(term)));
 count.textContent=`${list.length} دواء في النتائج`;
 results.innerHTML=list.length?list.map(d=>`<article class="card"><div class="row"><div class="name">${d.name}</div><div class="risk ${d.risk==="High"?"high":d.risk==="Medium"?"medium":"low"}">${d.risk_ar}</div></div><div class="rec">${d.recommendation}</div><div class="note">${d.note}</div></article>`).join(""):`<div class="empty">لم يتم العثور على الدواء.<br>تأكد من كتابة الاسم العلمي بالإنجليزية.</div>`;
}
document.querySelectorAll(".filters button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");filter=b.dataset.filter;render()}));
q.addEventListener("input",render); render();
