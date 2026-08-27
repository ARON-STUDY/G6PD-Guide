let filter = "All";
let categoriesData = [];

const q = document.getElementById("q"), 
      results = document.getElementById("results"), 
      count = document.getElementById("count");

async function loadDrugs() {
  try {
    const response = await fetch('drugs.json');
    categoriesData = await response.json();
    render();
  } catch (error) {
    console.error("Error loading drugs data:", error);
    results.innerHTML = `<div class="empty">عذراً، حدث خطأ في تحميل الأدوية.</div>`;
  }
}

function render() {
  if (!categoriesData.length) return;
  const term = q.value.trim().toLowerCase();
  
  let totalCount = 0;
  let htmlOutput = "";

  categoriesData.forEach(catGroup => {
    // فلترة الأدوية داخل كل فئة حسب البحث
    const filteredDrugs = catGroup.drugs.filter(drugName => 
      !term || drugName.toLowerCase().includes(term)
    );

    if (filteredDrugs.length > 0) {
      totalCount += filteredDrugs.length;
      htmlOutput += `
        <div style="margin-bottom: 20px;">
          <h3 style="color: #d9534f; border-bottom: 2px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">${catGroup.category}</h3>
          ${filteredDrugs.map(drugName => `
            <article class="card" style="margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              <div class="row">
                <div class="name" style="font-weight: bold; font-size: 1.1em;">${drugName}</div>
              </div>
              <div class="note" style="color: #666; margin-top: 5px;">ملاحظة: يرجى مراجعة الطبيب أو الصيدلاني والتأكد من الملصق الدوائي لمرضى G6PD.</div>
            </article>
          `).join("")}
        </div>
      `;
    }
  });

  count.textContent = `${totalCount} دواء في النتائج`;
  results.innerHTML = htmlOutput || `<div class="empty">لم يتم العثور على الدواء.<br>تأكد من كتابة الاسم العلمي بالإنجليزية.</div>`;
}

q.addEventListener("input", render);
loadDrugs();
