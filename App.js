let filter = "All";
let DRUGS = [];

const q = document.getElementById("q"), 
      results = document.getElementById("results"), 
      count = document.getElementById("count");

// جلب البيانات من ملف drugs.json الذي قمت برفعه
async function loadDrugs() {
  try {
    const response = await fetch('drugs.json');
    const data = await response.json();
    
    // تحويل هيكل الـ JSON الجديد إلى مصفوفة مسطحة تتوافق مع محرك البحث والفلترة
    DRUGS = [];
    data.forEach(categoryGroup => {
      let riskVal = "High";
      let riskEn = "High";
      if (categoryGroup.category.includes("الثانية")) {
        riskVal = "Medium";
        riskEn = "Medium";
      } else if (categoryGroup.category.includes("الثالثة")) {
        riskVal = "Low";
        riskEn = "Low";
      }

      categoryGroup.drugs.forEach(drugName => {
        DRUGS.push({
          name: drugName,
          risk: riskVal,
          risk_ar: categoryGroup.category,
          recommendation: "يرجى مراجعة الطبيب أو الصيدلاني والتأكد من الملصق الدوائي.",
          note: "تم الاستخراج من دليل الأدوية المعتمد لمرضى G6PD."
        });
      });
    });

    render();
  } catch (error) {
    console.error("Error loading drugs data:", error);
    results.innerHTML = `<div class="empty">عذراً، حدث خطأ في تحميل بيانات الأدوية.</div>`;
  }
}

function render() {
  if (!DRUGS.length) return;
  const term = q.value.trim().toLowerCase();
  
  // فلترة الأدوية حسب البحث والتصنيف
  const list = DRUGS.filter(d => 
    (filter === "All" || d.risk === filter) && 
    (!term || d.name.toLowerCase().includes(term))
  );

  count.textContent = `${list.length} دواء في النتائج`;
  
  results.innerHTML = list.length ? list.map(d => `
    <article class="card">
      <div class="row">
        <div class="name">${d.name}</div>
        <div class="risk ${d.risk === "High" ? "high" : d.risk === "Medium" ? "medium" : "low"}">${d.risk_ar}</div>
      </div>
      <div class="rec">${d.recommendation}</div>
      <div class="note">${d.note}</div>
    </article>
  `).join("") : `<div class="empty">لم يتم العثور على الدواء.<br>تأكد من كتابة الاسم العلمي بالإنجليزية.</div>`;
}

// أزرار الفلترة
document.querySelectorAll(".filters button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".filters button").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  filter = b.dataset.filter;
  render();
}));

q.addEventListener("input", render);

// تشغيل الدالة عند تحميل الصفحة
loadDrugs();
