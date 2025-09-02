// scripts.js - bilingual UI + animations + validation + future Google Sheets hook

(function () {
  const htmlEl = document.documentElement;
  const translatableNodes = document.querySelectorAll('[data-i18n]');
  const placeholderNodes = document.querySelectorAll('[data-i18n-placeholder]');
  const optionNodes = document.querySelectorAll('[data-i18n-option]');
  const form = document.getElementById('applicationForm');
  const statusEl = document.getElementById('formStatus');
  const btnAR = document.getElementById('btn-ar');
  const btnEN = document.getElementById('btn-en');

  // i18n dictionary
  const i18n = {
    ar: {
      'meta.title': 'التقديم على الوظائف',
      brand: '45UP',
      'nav.main': 'الرئيسية',
      'nav.about': 'عنّا',
      'nav.jobs': 'الوظائف',
      'nav.apply': 'التقديم',
      'nav.about': 'عنّا',
      'nav.jobs': 'الوظائف',
      'nav.apply': 'التقديم',
      'hero.badge': '45Up LMS',
      'hero.title': "نظام <span class='highlight'>تعليمي رقمي</span> للمدارس والمعلمين",
      'hero.subtitle': 'يوفّر أدوات متكاملة لإدارة الصفوف، متابعة أداء الطلاب، وتنظيم العملية التعليمية بشكل فعّال وسلس. نمكّن المدارس من التحول الرقمي وتجربة تعليمية متطورة وسهلة الاستخدام.',
      'hero.cta.apply': 'قدّم الآن',
      'hero.cta.viewJobs': 'عرض الوظائف',
      'about.title': 'نبذة عن 45Up',
      'about.text': '45Up هو نظام إدارة تعلم (LMS) يقدم تجربة رقمية متكاملة للمدارس والمعلمين لإدارة الصفوف والمتابعة والتحليل.',
      'about.point1': 'إدارة الصفوف والواجبات والاختبارات من مكان واحد.',
      'about.point2': 'لوحات متابعة فورية وتحليلات لقياس التحسّن.',
      'about.point3': 'تكاملات جاهزة وواجهات برمجية لربط الأنظمة.',
      'band.join': 'انضم إلينا لبناء مستقبل التعليم الرقمي',
      'band.cta': 'ابدأ التقديم',
      'jobs.title': 'الوظائف المتاحة',
      'jobs.apply': 'التقديم لهذه الوظيفة',

      'jobs.fullstack.badge': 'تقني',
      'jobs.fullstack.title': 'مطوّر Full Stack (Senior) — ASP.NET Core',
      'jobs.fullstack.respTitle': 'المسؤوليات',
      'jobs.fullstack.resp1': 'قيادة تطوير تطبيقات الويب باستخدام ASP.NET Core وClean Architecture.',
      'jobs.fullstack.resp2': 'تطوير واجهات تفاعلية باستخدام JavaScript وjQuery وVue.js.',
      'jobs.fullstack.resp3': 'تصميم وإدارة قواعد بيانات SQL Server مع التركيز على الأداء والتوسع.',
      'jobs.fullstack.resp4': 'تصميم وتطوير REST APIs فعّالة للتكامل.',
      'jobs.fullstack.resp5': 'مراجعة الأكواد وتوجيه المطوّرين الأقل خبرة.',
      'jobs.fullstack.resp6': 'المشاركة في تحليل المتطلبات وبنية النظام.',
      'jobs.fullstack.resp7': 'ضمان الجودة، الأمان، وتحسين الأداء.',
      'jobs.fullstack.skillsTitle': 'المهارات والخبرات المطلوبة',
      'jobs.fullstack.skill1': '6+ سنوات خبرة في ASP.NET Core.',
      'jobs.fullstack.skill2': 'خبرة قوية في JavaScript وjQuery وVue.js.',
      'jobs.fullstack.skill3': 'خبرة متقدمة في SQL Server وتحسين الأداء.',
      'jobs.fullstack.skill4': 'خبرة في بناء REST APIs.',
      'jobs.fullstack.skill5': 'إلمام بمنهجيات Agile/Scrum.',
      'jobs.fullstack.skill6': 'حل المشكلات والتفكير التحليلي.',
      'jobs.fullstack.skill7': 'قدرة على القيادة والتعاون.',
      'jobs.fullstack.prefTitle': 'المؤهلات المفضلة',
      'jobs.fullstack.pref1': 'بكالوريوس/ماجستير في علوم الحاسوب أو هندسة البرمجيات.',
      'jobs.fullstack.pref2': 'خبرة بمشاريع ضخمة أو Enterprise-level.',
      'jobs.fullstack.pref3': 'مهارات قوية في القيادة والتواصل.',
'form.position.optionProgrammer': 'مطوّر Full Stack (Senior) — ASP.NET Core',
      'form.position.optionMarketer': 'موظف مبيعات',
      'jobs.sales.badge': 'مبيعات',
      'jobs.sales.title': 'موظف مبيعات',
      'jobs.sales.respTitle': 'المسؤوليات',
      'jobs.sales.resp1': 'التعرّف على المدارس، مراكز التدريب، والمؤسسات التعليمية والتواصل معهم للترويج لنظام LMS.',
      'jobs.sales.resp2': 'وضع وتنفيذ استراتيجيات بيع مخصصة لقطاع التعليم.',
      'jobs.sales.resp3': 'تقديم عروض توضيحية واجتماعات تعريفية مع متخذي القرار في المدارس.',
      'jobs.sales.resp4': 'التفاوض على العقود، إغلاق الصفقات، وتحقيق الأهداف البيعية المتفق عليها.',
      'jobs.sales.resp5': 'إعداد تقارير دورية عن المبيعات وتحليل السوق ورفعها للإدارة.',
      'jobs.sales.skillsTitle': 'المهارات والخبرات المطلوبة',
      'jobs.sales.skill1': 'خبرة لا تقل عن 3 سنوات في مجال المبيعات أو تطوير الأعمال.',
      'jobs.sales.skill2': 'مهارات قوية في التواصل، التفاوض، والعرض التقديمي.',
      'jobs.sales.skill3': 'القدرة على بناء علاقات طويلة المدى والحفاظ عليها مع العملاء.',
      'jobs.sales.prefTitle': 'المؤهلات المفضلة',
      'jobs.sales.pref1': 'خبرة سابقة في بيع أنظمة تعليمية أو حلول تقنية (LMS / EdTech).',
      'jobs.sales.pref2': 'شبكة علاقات مع مدارس أو مؤسسات تعليمية.',

      'steps.title': 'خطوات التقديم',
      'steps.1.title': 'اختر الوظيفة',
      'steps.1.text': 'اطّلع على المتطلبات وحدّد ما يناسبك.',
      'steps.2.title': 'املأ البيانات',
      'steps.2.text': 'أدخل التفاصيل وارفع سيرتك الذاتية.',
      'steps.3.title': 'إرسال ومتابعة',
      'steps.3.text': 'سنراجع ونعود إليك قريبًا.',

      'faq.title': 'الأسئلة الشائعة',
      'faq.q1': 'هل العمل عن بُعد متاح؟',
      'faq.a1': 'نعم، وفقًا لطبيعة الدور واحتياجات الفريق.',
      'faq.q2': 'ما المدة المتوقعة للرد على الطلب؟',
      'faq.a2': 'عادة بين 3 إلى 7 أيام عمل.',

      'form.title': 'قدّم طلبك',
      'form.fullName.label': 'الاسم الكامل',
      'form.fullName.placeholder': 'اكتب اسمك الكامل',
      'form.email.label': 'البريد الإلكتروني',
      'form.email.placeholder': 'example@mail.com',
      'form.phone.label': 'رقم الهاتف',
      'form.phone.placeholder': '05XXXXXXXX',
      'form.position.label': 'الوظيفة',
      'form.position.optionDefault': 'اختر الوظيفة',
      'form.position.optionFullstack': 'مطوّر Full Stack (ASP.NET Core)',
      'form.position.optionSales': 'موظف مبيعات',
      'form.message.label': 'رسالة مختصرة (اختياري)',
      'form.message.placeholder': 'ملاحظات تود إضافتها',
      'form.salary.label': 'الراتب المتوقع',
      'form.salary.placeholder': 'مثال: 500 $',
      'form.cv.label': 'السيرة الذاتية (CV)',
      'form.cv.help': 'الصيغ المسموح بها: PDF, DOC, DOCX — الحجم الأقصى 5MB',
      'form.submit': 'إرسال الطلب',
      'form.note': 'ملاحظة: سنقوم بربط هذا النموذج مع Google Sheets لاحقًا.',
      'form.availability.label': 'نوع الدوام',
      'form.availability.full': 'دوام كامل',
      'form.availability.part': 'دوام جزئي',
      footer: '© جميع الحقوق محفوظة',
      'footer.text': 'نظام إدارة تعلم رقمي يساعد المدارس والمعلمين على التحول الرقمي.',
      'v.required': 'يرجى تعبئة جميع الحقول المطلوبة.',
      'v.email': 'صيغة البريد الإلكتروني غير صحيحة.',
      'v.phone': 'يرجى إدخال رقم هاتف صحيح.',
      'v.cv.type': 'نوع الملف غير مدعوم. استخدم PDF أو DOC أو DOCX.',
      'v.cv.size': 'حجم الملف يتجاوز 5MB.',
      'v.success': 'تم استلام طلبك بنجاح. سنقوم بالتواصل معك قريبًا.',
      'v.error': 'حدث خطأ غير متوقع. حاول مجددًا.'}
    ,
    en: {
      'meta.title': 'Job Application',
      brand: '45UP',
      'nav.main': 'Home',
      'nav.about': 'About',
      'nav.jobs': 'Jobs',
      'nav.apply': 'Apply',
      'hero.badge': '45Up LMS',
      'hero.title': 'A digital Learning Management System for schools and educators',
      'hero.subtitle': 'It provides a comprehensive set of tools for managing classes, tracking student performance, and organizing the educational process efficiently and seamlessly. Our mission is to empower schools in their digital transformation and deliver a modern, user‑friendly learning experience.',
      'hero.cta.apply': 'Apply Now',
      'hero.cta.viewJobs': 'View Jobs',
      'about.title': 'About 45Up',
      
      'about.text': '45Up is a digital Learning Management System (LMS) designed for schools and individual educators. It provides a comprehensive set of tools for managing classes, tracking student performance, and organizing the educational process efficiently and seamlessly. Our mission is to empower schools in their digital transformation journey and deliver a modern, user friendly learning experience.',
      'about.point1': 'Unified management for classes, assignments, and exams.',
      'about.point2': 'Real‑time dashboards and deeper insights for progress tracking.',
      'about.point3': 'Ready integrations and APIs to connect systems.',
      'band.join': 'Ready for the next step in your career?',
      'band.cta': 'Start Applying',
      'jobs.title': 'Available Positions',
      'jobs.apply': 'Apply for this role',
      'jobs.fullstack.badge': 'Tech',
      'jobs.fullstack.title': ' Senior ASP.NET Core Full Stack Developer',
      'jobs.fullstack.meta': 'Full-time · Hybrid',
      'jobs.fullstack.respTitle': 'Responsibilities',
      'jobs.fullstack.resp1': 'Lead the development of web applications using ASP.NET Core, ensuring adherence to best practices and clean architecture.',
      'jobs.fullstack.resp2': 'Build dynamic and interactive user interfaces using JavaScript, jQuery, and Vue.js.',
      'jobs.fullstack.resp3': 'Design and manage complex databases with SQL Server, focusing on performance, scalability, and reliability.',
      'jobs.fullstack.resp4': 'Architect, develop, and implement efficient REST APIs for seamless integration with external systems and services.',
      'jobs.fullstack.resp5': 'Conduct code reviews, mentor junior and mid-level developers, and provide technical guidance to the team.',
      'jobs.fullstack.resp6': 'Participate actively in requirement analysis, solution design, and system architecture discussions.',
      'jobs.fullstack.resp7': 'Ensure application quality, security, and continuous performance optimization.',
      'jobs.fullstack.skillsTitle': 'Required Skills & Experience',
      'jobs.fullstack.skill1': 'Minimum of 6 years of proven experience in software development with ASP.NET Core.',
      'jobs.fullstack.skill2': 'Strong expertise in JavaScript, jQuery, and Vue.js.',
      'jobs.fullstack.skill3': 'Advanced experience with SQL Server: database design, complex queries, stored procedures, and performance tuning.',
      'jobs.fullstack.skill4': 'Solid experience in building and consuming REST APIs.',
      'jobs.fullstack.skill5': 'Familiarity with Agile/Scrum methodologies.',
      'jobs.fullstack.skill6': 'Excellent problem-solving and analytical thinking skills.',
      'jobs.fullstack.skill7': 'Ability to lead projects and collaborate effectively with cross-functional teams.',
      'jobs.fullstack.prefTitle': 'Preferred Qualifications',
      'jobs.fullstack.pref1': 'Bachelor’s or Master’s degree in Computer Science, Software Engineering, or a related field.',
      'jobs.fullstack.pref2': 'Previous experience working on large-scale or enterprise-level projects.',
      'jobs.fullstack.pref3': 'Strong leadership and communication skills with the ability to work under pressure and deliver innovative solutions.',
      'jobs.sales.badge': 'Sales',
      'jobs.sales.title': 'Sales Executive',
      'jobs.sales.respTitle': 'Responsibilities',
      'jobs.sales.resp1': 'Identify schools, training centers, and educational institutions and reach out to them to promote the LMS.',
      'jobs.sales.resp2': 'Develop and execute tailored sales strategies for the education sector.',
      'jobs.sales.resp3': 'Conduct demos and introductory meetings with school decision-makers.',
      'jobs.sales.resp4': 'Negotiate contracts, close deals, and achieve agreed sales targets.',
      'jobs.sales.resp5': 'Prepare periodic sales reports, analyze the market, and submit insights to management.',
      'jobs.sales.skillsTitle': 'Required Skills & Experience',
      'jobs.sales.skill1': 'Minimum of 3 years of experience in sales or business development.',
      'jobs.sales.skill2': 'Strong communication, negotiation, and presentation skills.',
      'jobs.sales.skill3': 'Ability to build and maintain long-term client relationships.',
      'jobs.sales.prefTitle': 'Preferred Qualifications',
      'jobs.sales.pref1': 'Previous experience selling educational systems or tech solutions (LMS / EdTech).',
      'jobs.sales.pref2': 'A solid network with schools or educational institutions.',
      'steps.title': 'Application Steps',
      'steps.1.title': 'Choose a role',
      'steps.1.text': 'Review requirements and pick your match.',
      'steps.2.title': 'Fill the form',
      'steps.2.text': 'Enter your details and upload your CV.',
      'steps.3.title': 'Submit & follow up',
      'steps.3.text': 'We will review and get back to you shortly.',
      'faq.title': 'FAQ',
      'faq.q1': 'Is remote work available?',
      'faq.a1': 'Yes, we offer remote flexibility depending on the role and team needs.',
      'faq.q2': 'How long until I hear back?',
      'faq.a2': 'Typically within 3–7 business days.',
      'form.title': 'Apply Now',
      'form.fullName.label': 'Full Name',
      'form.fullName.placeholder': 'Enter your full name',
      'form.email.label': 'Email',
      'form.email.placeholder': 'example@mail.com',
      'form.phone.label': 'Phone Number',
      'form.phone.placeholder': '+1 555 000 1234',
      'form.position.label': 'Position',
      'form.position.optionDefault': 'Select a position',
      'form.position.optionProgrammer': ' Full Stack (Senior) — ASP.NET Core',
      'form.position.optionMarketer': 'Sales Executive',
       'form.message.label': 'Short Message (Optional)',
      'form.message.placeholder': 'Any notes you want to add',
      'form.salary.label': 'Expected Salary',
      'form.salary.placeholder': 'e.g., 500 $',
      'form.cv.label': 'Resume (CV)',
      'form.cv.help': 'Allowed: PDF, DOC, DOCX — Max 5MB',
      'form.submit': 'Submit Application',
      'form.note': 'Note: We will connect this form to Google Sheets later.',
      'form.availability.label': 'Availability',
      'form.availability.full': 'Full-time',
      'form.availability.part': 'Part-time',
      footer: '© All rights reserved',
      'footer.text': 'A digital LMS helping schools and teachers transform learning.',
      // validation
      'v.required': 'Please fill all required fields.',
      'v.email': 'Invalid email format.',
      'v.phone': 'Please enter a valid phone number.',
      'v.cv.type': 'Unsupported file type. Use PDF, DOC, or DOCX.',
      'v.cv.size': 'File size exceeds 5MB.',
      'v.success': 'Your application has been received. We will contact you soon.',
      'v.error': 'Unexpected error. Please try again.'
    }
  };

  // current language
  let currentLang = 'ar';

  function applyLanguage(lang) {
    currentLang = lang;
    htmlEl.lang = lang;
    htmlEl.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.title = t('meta.title');

    translatableNodes.forEach((node) => {
      const key = node.getAttribute('data-i18n');
      if (!key) return;
      // Allow simple markup in translations for styling key phrases
      node.innerHTML = t(key);
    });

    placeholderNodes.forEach((node) => {
      const key = node.getAttribute('data-i18n-placeholder');
      if (!key) return;
      node.setAttribute('placeholder', t(key));
    });

    optionNodes.forEach((node) => {
      const key = node.getAttribute('data-i18n-option');
      if (!key) return;
      node.textContent = t(key);
    });

    btnAR.classList.toggle('active', lang === 'ar');
    btnEN.classList.toggle('active', lang === 'en');
  }

  function t(key) {
    return (i18n[currentLang] && i18n[currentLang][key]) || key;
  }

  // language switch handlers
  btnAR.addEventListener('click', () => applyLanguage('ar'));
  btnEN.addEventListener('click', () => applyLanguage('en'));

  // Smooth reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Hero parallax (based on pointer movement)
  const parallaxItems = document.querySelectorAll('.parallax');
  const heroWrap = document.querySelector('.hero-wrap');
  if (heroWrap && parallaxItems.length) {
    heroWrap.addEventListener('pointermove', (e) => {
      const rect = heroWrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      parallaxItems.forEach((el) => {
        const depth = parseFloat(el.getAttribute('data-depth') || '0.02');
        const tx = -x * depth * 40; // tweak intensity
        const ty = -y * depth * 40;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });
    });
    heroWrap.addEventListener('pointerleave', () => {
      parallaxItems.forEach((el) => { el.style.transform = ''; });
    });
  }

  // Quick apply buttons set the select value
  document.querySelectorAll('.apply-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const pos = btn.getAttribute('data-position');
      const select = document.getElementById('position');
      if (select && pos) select.value = pos;
    });
  });

  // Validation helpers
  function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function isValidPhone(v) { const digits = (v || '').replace(/\D/g, ''); return digits.length >= 7; }
  function validateFile(file) {
    if (!file) return { ok: false, msg: t('v.required') };
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) return { ok: false, msg: t('v.cv.type') };
    if (file.size > 5 * 1024 * 1024) return { ok: false, msg: t('v.cv.size') };
    return { ok: true };
  }

  async function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = '';
    statusEl.className = 'status';

    const fullName = form.fullName.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const position = form.position.value;
    const message = (form.message.value || '').trim();
    const salary = (form.salary?.value || '').trim();
    const availability = (form.availability.value || 'full');
    const cv = form.cv.files[0];

    if (!fullName || !email || !phone || !position || !cv || !availability) {
      statusEl.textContent = t('v.required');
      statusEl.classList.add('error');
      return;
    }
    if (!isValidEmail(email)) { statusEl.textContent = t('v.email'); statusEl.classList.add('error'); return; }
    if (!isValidPhone(phone)) { statusEl.textContent = t('v.phone'); statusEl.classList.add('error'); return; }

    const fileCheck = validateFile(cv);
    if (!fileCheck.ok) { statusEl.textContent = fileCheck.msg; statusEl.classList.add('error'); return; }

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        fullName, email, phone, position, message, salary, availability,
        // cv: { name: cv.name, type: cv.type, content: await toBase64(cv) }
      };

      await new Promise((r) => setTimeout(r, 900));

      // const res = await fetch('YOUR_APPS_SCRIPT_DEPLOYMENT_URL', {
      //   method: 'POST', headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      // if (!res.ok) throw new Error('Network');

      form.reset();
      statusEl.textContent = t('v.success');
      statusEl.classList.add('success');
    } catch (err) {
      console.error(err);
      statusEl.textContent = t('v.error');
      statusEl.classList.add('error');
    }
  });

  // Initialize language (reads from URL hash if present, e.g., #en)
  const initial = (location.hash || '').replace('#', '').toLowerCase();
  applyLanguage(initial === 'en' ? 'en' : 'ar');
})();
