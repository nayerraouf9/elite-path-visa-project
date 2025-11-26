// d:\Elite Path\visas\Australia\page.tsx

import React from 'react';

// هذا هو المكون الرئيسي للصفحة
export default function AustraliaVisaPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* القسم العلوي: العنوان والسعر وزر الحجز */}
      <header className="bg-white p-6 shadow-md rounded-lg mb-8 border-t-4 border-blue-600">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">تأشيرة أستراليا (Australia Visa)</h1>
        <p className="text-xl text-gray-600 mb-4">تأشيرة سياحية وتأشيرة زيارة من دبي والإمارات.</p>
        
        {/* قسم السعر والحجز - يحاكي الشريط الجانبي في الموقع الأصلي */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="text-left">
            <span className="text-sm text-gray-500 block">تبدأ من</span>
            <span className="text-3xl font-bold text-red-600">1000.00 درهم إماراتي</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-md">
            احجز الآن
          </button>
        </div>
      </header>

      {/* الهيكل ذو العمودين: المحتوى الرئيسي (8/12) والجانبي (4/12) */}
      <main className="flex flex-col lg:flex-row gap-8">
        
        {/* العمود الأيمن (المحتوى الرئيسي) */}
        <section className="lg:w-8/12 space-y-10">
          
          {/* 1. قسم النظرة العامة (Visa Detail) */}
          <div id="visa-detail" className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">نظرة عامة على تأشيرة أستراليا</h2>
            <p className="text-gray-700 leading-relaxed">
              بتفردها بمزيج مذهل من المدن النابضة بالحياة، والتجارب الساحلية، والبرية البكر، وعجائب الحياة البرية، والتنوع الطبيعي، تُعد أستراليا بسهولة واحدة من أكثر وجهات العطلات المرغوبة. إذا كنت تخطط لرحلة إلى هذا البلد الرائع، يمكننا مساعدتك في جميع ترتيبات السفر بما في ذلك المساعدة الاحترافية في الحصول على التأشيرة.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              بصفتنا متخصصين في خدمات التأشيرات الدولية، نقدم خدمات تأشيرات فورية للأشخاص الراغبين في السفر إلى أستراليا من دولة الإمارات العربية المتحدة. سواء كان الغرض هو السياحة أو العمل، سيقوم فريقنا ذو الخبرة والمعرفة العالية بتقديم المساعدة من خلال الإجراءات الدقيقة، بدءاً من المشورة المتخصصة حول اختيار التأشيرة المناسبة ومعايير الأهلية، وصولاً إلى تقديم طلبك وفقاً للقواعد واللوائح.
            </p>
          </div>

          {/* 2. قسم المستندات (Australia Visa Documents) */}
          <div id="visa-documents" className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">مستندات تأشيرة أستراليا</h2>
            
            <h3 className="text-xl font-semibold text-blue-600 mb-3">مستندات العميل</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>**تأشيرة إقامة إماراتية سارية** (بصلاحية 90 يومًا).</li>
              <li>**جواز سفر أصلي مطلوب** (صلاحية 6 أشهر مع صفحتين فارغتين على الأقل).</li>
              <li>**خطاب عدم ممانعة (NOC) أصلي** يوضح الراتب، المنصب، تاريخ الانضمام، والغرض من السفر (للموظفين).</li>
              <li>**3 صور شخصية حديثة** بخلفية بيضاء (3.5 * 4.5 سم).</li>
              <li>**خطاب دعوة** من صديق أو قريب يمكن أن يكون ميزة إضافية.</li>
              <li>**خطاب دعوة مطلوب** لتأشيرة العمل.</li>
            </ul>

            <h3 className="text-xl font-semibold text-blue-600 mt-6 mb-3">مساعدة Rayna Tours</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>المساعدة في ملء استمارة الطلب.</li>
              <li>التحقق من المستندات.</li>
              <li>المساعدة في حجز الطيران والفنادق.</li>
              <li>طلب التأشيرة عبر الإنترنت.</li>
            </ul>
          </div>
          
          {/* 3. قسم الأسئلة الشائعة (FAQs) */}
          <div id="visa-faqs" className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">الأسئلة الشائعة حول تأشيرة أستراليا</h2>
            
            <FAQItem 
              question="هل التأشيرة إلزامية لدخول أو زيارة أستراليا؟" 
              answer="يجب أن يكون لدى جميع المسافرين، باستثناء مواطني أستراليا ونيوزيلندا، تأشيرة أو تصريح دخول معتمد."
            />
            <FAQItem 
              question="كم يوماً تستغرق معالجة تأشيرة أستراليا؟" 
              answer="حسب خيار التأشيرة، تستغرق معالجة طلب تأشيرة أستراليا ما بين 25 يومًا و 30 يومًا."
            />
            <FAQItem 
              question="هل يمكنني إعادة التقديم إذا تم رفض تأشيرة أستراليا الخاصة بي؟" 
              answer="نعم، يمكنك إعادة التقديم بعد الرفض، ولكن يجب عليك معالجة أسباب الرفض بعناية. سيساعدك أخصائيو التأشيرات لدينا في إعداد طلب إعادة تقديم أقوى."
            />
          </div>

          {/* 4. قسم الشروط والأحكام (Terms & Conditions) */}
          <div id="visa-terms" className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">شروط وأحكام تأشيرة أستراليا</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              تشكل هذه الشروط والأحكام الأساس القانوني لخدمات تأشيرة أستراليا الخاصة بنا. بتقديم طلب تأشيرة أستراليا الخاص بك، فإنك توافق على الالتزام بالشروط التالية...
            </p>
            <h3 className="text-xl font-semibold text-blue-600 mb-3">1. النطاق والإجراءات</h3>
            <p className="text-gray-700 leading-relaxed">
              نحن نقدم خدمات تأشيرة أستراليا الاحترافية لجميع الأفراد (المقيمين في الإمارات بشكل رئيسي)... (محتوى الشروط هنا)
            </p>
            <h3 className="text-xl font-semibold text-blue-600 mt-4 mb-3">6. سياسات الإلغاء والاسترداد</h3>
            <p className="text-gray-700 leading-relaxed">
              بعد فتح ملف التأشيرة وتقديم طلبك، تكون جميع المدفوعات غير قابلة للاسترداد، بغض النظر عن الموافقة أو الرفض... (محتوى الشروط هنا)
            </p>
          </div>
        </section>

        {/* العمود الأيسر (الشريط الجانبي) - يمكنك إضافة المزيد من العناصر هنا مثل مراجعات العملاء */}
        <aside className="lg:w-4/12 space-y-8">
          
          {/* قسم الاستفسار السريع */}
          <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-gray-800 mb-4">استفسار سريع (Quick Enquiry)</h3>
            <p className="text-gray-600 mb-4">سيقوم خبير السفر بمساعدتك!</p>
            <p className="text-lg font-semibold text-blue-600 mb-2">+971 42087445</p>
            <p className="text-lg font-semibold text-blue-600 mb-4">+971 561794005</p>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition duration-300">
              إرسال استفسار
            </button>
          </div>

          {/* قسم العطلات الرسمية */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">العطلات الرسمية المتوقعة لعام 2025</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العطلة</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
                <tr><td className="px-3 py-2 whitespace-nowrap">01-يناير-2025</td><td className="px-3 py-2 whitespace-nowrap">رأس السنة الجديدة</td></tr>
                <tr><td className="px-3 py-2 whitespace-nowrap">10-مارس-2025</td><td className="px-3 py-2 whitespace-nowrap">يوم كانبرا</td></tr>
                <tr><td className="px-3 py-2 whitespace-nowrap">18-أبريل-2025</td><td className="px-3 py-2 whitespace-nowrap">الجمعة العظيمة</td></tr>
                <tr><td className="px-3 py-2 whitespace-nowrap">25-أبريل-2025</td><td className="px-3 py-2 whitespace-nowrap">يوم أنزاك</td></tr>
              </tbody>
            </table>
          </div>
        </aside>
      </main>
      
      {/* يمكن إضافة قسم المراجعات أسفل العمودين إذا كان كبيرًا */}
      <section id="reviews" className="mt-8 bg-white p-6 shadow-md rounded-lg">
         <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">مراجعات تأشيرة أستراليا</h2>
         <p className="text-gray-600">هنا سيتم عرض تقييمات العملاء (5.0/5.0).</p>
      </section>
    </div>
  );
}

// مكون فرعي بسيط لتمثيل عنصر سؤال وجواب (FAQ)
interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    // يمكنك هنا استخدام مكون Accordion أو details/summary لجعله قابلاً للطي
    return (
        <details className="py-3 border-b cursor-pointer">
            <summary className="font-semibold text-gray-800 hover:text-blue-600 transition duration-150">
                {question}
            </summary>
            <p className="mt-2 pl-4 text-gray-600">{answer}</p>
        </details>
    );
};