const categoriesData = [
  {
    "category": "الفئة الأولى (عالية الخطورة)",
    "drugs": [
      "Naphthol", "Acetanilide", "Acetylphenylhydrazine (2-phenylhydrazine)", "Aldesulfone sodium (sulfoxone)", "Arsine", "Ascorbic acid", "Beta-Naphthol (2-Naphthol)", "Brinzolamide", "Bupivacaine", "Chloramphenicol", "Chloroquine", "Chloroquine + Proguanil", "Ciprofloxacin", "Dapsone (diaminodiphenylsulfone)", "Diethylamine", "Dimenhydrinate", "Dimercaprol", "Dorzolamide", "Doxorubicin", "Enoxacin", "Furazolidone", "Glibenclamide", "Gliclazide", "Glimepiride", "Glipizide", "Glucosulfone (glucosulfone sodium)", "Hydroxychloroquine", "Isobutyl Nitrate", "Levofloxacin", "Lomefloxacin", "Mefloquine", "Menadiol Sodium sulfate (Vitamin K4 sodium sulfate)", "Menadione (menaphtone)", "Menadione Sodium Bisulfate (Vitamin K3 sodium bisulfate)", "Mepacrine (Quinacrine)", "Mesalazine - 5-Aminosalicylic Acid (paraminosalicylic)", "Metamizole", "Methylthioninium chloride (methylene blue)", "Moxifloxacin", "Nalidixic acid", "Naphthalene, pure (naphthalin)", "Niridazole", "Nitric oxide", "Nitrofural (Nitrofurazone)", "Nitrofurantoin", "Nitroglycerin", "Noramidopyrine", "Acetylsalicylic acid (Aspirin)", "Ofloxacin", "Oxidase, Urate (urate oxidase)", "Pamaquine", "Pefloxacin", "Pentaquine", "Phenacetin (acetophenetidin)", "Phenazopyridine", "Phenylhydrazine", "Pipemidic acid", "Primaquine", "Probenecid", "Quinidine + Phenylhydrazine", "Rasburicase", "Sodium nitroprusside", "Spiramycin", "Stibophen", "Sulfacetamide", "Sulfadimidine", "Sulfafurazole", "Sulfamethoxazole", "Sulfanilamide", "Sulfapyridine", "Sulfasalazine", "Thiamphenicol", "Thiazosulfone", "Tolonium chloride", "Trimethoprime + sulfamethoxazole", "Trinitrotoluen"
    ]
  },
  {
    "category": "الفئة الثانية (متوسطة الخطورة)",
    "drugs": [
      "Acetazolamide", "Aminophenazone (aminopyrine)", "Antazoline (antistine)", "Arginine (2-amino-5-guanidinopentanoic acid)", "Bean of St. Ignatius (Strychnos ignatii)", "Benorilate", "Calcium carboxylate", "Carbutamide", "Colchicine", "Diphenhydramine", "Dopamine", "Epirubicin", "Flumequine", "Glibornuride", "Ibuprofen", "Indigofera", "Isoniazid (INH)", "Lawsone Inermis", "Levodopa", "Morpholine", "Norfloxacin", "Para-Aminobenzoic Acid (4-Aminobenzoic Acid)", "Paracetamol (Acetaminophen)", "Paracetamole + Propyphenazone", "Phenazone (antipyrine)", "Phenylbutazone", "Phenytoin", "Phytomenadione (Vitamin K1)", "Prilocaine", "Procainamide", "Proguanil (chlorguanidine)", "Propylene Glycol", "Propyphenazone", "Pyrimethamine", "Quinidine", "Quinidine + Quinine", "Quinine", "Streptomycin", "Succimer", "Sulfacytine", "Sulfadiazine", "Sulfadiazine + Trimethoprim", "Sulfadoxine", "Sulfaguanidine", "Sulfamerazine", "Sulfamethizole", "Sulfamethoxypyridazine", "Sulfoxone", "Tiaprofenic acid", "Trihexyphenidyl (benzhexol)", "Trimethoprim", "Tripelennamine"
    ]
  },
  {
    "category": "الفئة الثالثة (آمنة نسبياً / محاذير خاصة)",
    "drugs": [
      "Acetophenetidin (phenacetin)", "Aminopyrine (Pyramidone, amidopyrine)", "Antipyrine", "Azathioprine (use with caution)", "Baclofen (use with caution)", "Benzexolo", "Clorguanidina", "Diphenhydramine", "Pregabalin (use with caution)", "Procainamide Hydrochloride", "Sulfisoxazole (Gantrisin)"
    ]
  }
];

const q = document.getElementById("q"), 
      results = document.getElementById("results"), 
      count = document.getElementById("count");

function render() {
  const term = q.value.trim().toLowerCase();
  let totalCount = 0;
  let htmlOutput = "";

  categoriesData.forEach(catGroup => {
    const filteredDrugs = catGroup.drugs.filter(drugName => 
      !term || drugName.toLowerCase().includes(term)
    );

    if (filteredDrugs.length > 0) {
      totalCount += filteredDrugs.length;
      htmlOutput += `
        <div style="margin-bottom: 25px;">
          <h3 style="color: #d9534f; border-bottom: 2px solid #e0e0e0; padding-bottom: 8px; margin-bottom: 12px; font-size: 1.2rem;">${catGroup.category}</h3>
          ${filteredDrugs.map(drugName => `
            <article class="card" style="margin-bottom: 10px; padding: 12px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
              <div class="row">
                <div class="name" style="font-weight: bold; font-size: 1.1em; color: #2d3748;">${drugName}</div>
              </div>
              <div class="note" style="color: #4a5568; margin-top: 6px; font-size: 0.95rem;">ملاحظة سريرية: يرجى مراجعة الطبيب أو الصيدلاني والتأكد من الملصق الدوائي لمرضى نقص G6PD.</div>
            </article>
          `).join("")}
        </div>
      `;
    }
  });

  count.textContent = `${totalCount} دواء في النتائج`;
  results.innerHTML = htmlOutput || `<div class="empty" style="text-align:center; padding: 20px; color:#718096;">لم يتم العثور على الدواء.<br>تأكد من كتابة الاسم العلمي بالإنجليزية.</div>`;
}

q.addEventListener("input", render);
render();
 
