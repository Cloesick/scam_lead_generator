(function () {
  const runtimeCfg = (typeof window !== 'undefined' && window.__LP_CONFIG__) ? window.__LP_CONFIG__ : {};
  const CONFIG = {
    // Replace with the real tracking phone number if needed.
    phoneE164: runtimeCfg.phoneE164 || '+441218208966',

    // If you want the form to submit to a backend/webhook, set this to an HTTPS endpoint.
    // Keep it empty to run the page in "collection disabled" mode (no network calls).
    leadWebhookUrl: runtimeCfg.leadWebhookUrl || '',

    // Optional: GTM container ID, e.g. "GTM-XXXXXXX". If provided, we inject the loader.
    gtmId: runtimeCfg.gtmId || '',

    // If you want to hard-block Scotland, set this true.
    // (We already show messaging and block submit if a Scotland postcode is detected.)
    blockScotland: true,
  };

  const SCOTLAND_POSTCODE_PREFIXES = [
    'AB', 'DD', 'DG', 'EH', 'FK', 'G', 'HS', 'IV', 'KA', 'KW', 'KY', 'ML', 'PA', 'PH', 'TD', 'ZE'
  ];

  function normalizePostcode(value) {
    return String(value || '')
      .trim()
      .toUpperCase()
      .replace(/\s+/g, '');
  }

  function isScotlandPostcode(postcode) {
    const pc = normalizePostcode(postcode);
    if (!pc) return false;

    // Special-case: prefixes can be 1 or 2 letters (e.g., G1, AB10).
    // We'll check both first 1 and first 2 letters.
    const p1 = pc.slice(0, 1);
    const p2 = pc.slice(0, 2);

    return SCOTLAND_POSTCODE_PREFIXES.includes(p2) || SCOTLAND_POSTCODE_PREFIXES.includes(p1);
  }

  function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_content: params.get('utm_content') || '',
      utm_term: params.get('utm_term') || '',
    };
  }

  function setHiddenInputs(utms) {
    const map = {
      utmSource: 'utm_source',
      utmMedium: 'utm_medium',
      utmCampaign: 'utm_campaign',
      utmContent: 'utm_content',
      utmTerm: 'utm_term',
    };

    Object.entries(map).forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el) el.value = utms[key] || '';
    });
  }

  function dataLayerPush(evt) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(evt);
  }

  function maybeInitGtm() {
    if (!CONFIG.gtmId) return;

    // Prevent duplicate init.
    if (document.getElementById('gtm-loader')) return;

    const s = document.createElement('script');
    s.id = 'gtm-loader';
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(CONFIG.gtmId)}`;
    document.head.appendChild(s);

    dataLayerPush({
      event: 'gtm_init',
      gtm_id: CONFIG.gtmId,
      page: 'spray_foam_lp',
    });
  }

  function setCtaSource(value) {
    const el = document.getElementById('ctaSource');
    if (el) el.value = value || '';
  }

  function attachCtaListeners() {
    document.querySelectorAll('[data-cta]').forEach((el) => {
      el.addEventListener('click', () => {
        const cta = el.getAttribute('data-cta') || '';
        setCtaSource(cta);

        dataLayerPush({
          event: 'cta_click',
          cta,
          page: 'spray_foam_lp',
        });
      });
    });
  }

  function setCallLinks() {
    // Keep phone configurable.
    const phoneLinks = [document.getElementById('callNow'), document.getElementById('callNowInline')]
      .filter(Boolean);

    phoneLinks.forEach((a) => {
      a.setAttribute('href', `tel:${CONFIG.phoneE164}`);
    });
  }

  async function postLead(payload) {
    if (!CONFIG.leadWebhookUrl) {
      // No network calls by default.
      return { ok: true, mode: 'disabled' };
    }

    const res = await fetch(CONFIG.leadWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Lead webhook error (${res.status}): ${text || 'unknown'}`);
    }

    return { ok: true, mode: 'webhook' };
  }

  function setStatus(el, message, kind) {
    el.textContent = message || '';
    el.classList.remove('form__status--error', 'form__status--success');
    if (kind === 'error') el.classList.add('form__status--error');
    if (kind === 'success') el.classList.add('form__status--success');
  }

  function validate(form) {
    const name = form.full_name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const postcode = form.postcode.value.trim();
    const situation = form.situation.value;
    const propertyType = form.property_type.value;
    const details = form.details.value.trim();

    if (!name || !phone || !email || !postcode || !situation || !propertyType || !details) {
      return { ok: false, message: 'Please complete all fields.' };
    }

    if (CONFIG.blockScotland && isScotlandPostcode(postcode)) {
      return { ok: false, message: 'We currently do not serve Scotland. Please enter a postcode in England, Wales, or Northern Ireland.' };
    }

    return { ok: true };
  }

  function attachPostcodeValidation() {
    const input = document.getElementById('postcode');
    const hint = document.getElementById('postcodeHint');
    if (!input || !hint) return;

    const handler = () => {
      if (!CONFIG.blockScotland) {
        hint.classList.remove('hint--error');
        hint.style.display = 'none';
        return;
      }

      const blocked = isScotlandPostcode(input.value);
      if (blocked) {
        hint.classList.add('hint--error');
        hint.style.display = 'block';
      } else {
        hint.classList.remove('hint--error');
        hint.style.display = 'none';
      }
    };

    input.addEventListener('input', handler);
    input.addEventListener('blur', handler);
  }

  function updateProgress(form) {
    const pctEl = document.getElementById('progressPct');
    const fillEl = document.getElementById('progressFill');
    const barEl = document.querySelector('.form-progress__bar');
    const stepsEl = document.getElementById('progressSteps');

    if (!form || !pctEl || !fillEl || !barEl || !stepsEl) return;

    const required = ['full_name', 'phone', 'email', 'postcode', 'situation', 'property_type', 'details'];
    const filledCount = required.reduce((acc, name) => {
      const el = form.elements[name];
      const value = el ? String(el.value || '').trim() : '';
      return acc + (value ? 1 : 0);
    }, 0);

    const pct = Math.round((filledCount / required.length) * 100);
    pctEl.textContent = `${pct}%`;
    fillEl.style.width = `${pct}%`;
    barEl.setAttribute('aria-valuenow', String(pct));

    const stepDefs = {
      contact: ['full_name', 'phone', 'email'],
      property: ['postcode', 'property_type'],
      situation: ['situation'],
      details: ['details'],
    };

    Object.entries(stepDefs).forEach(([key, fields]) => {
      const step = stepsEl.querySelector(`.progress-step[data-step="${key}"]`);
      if (!step) return;

      const values = fields.map((n) => {
        const el = form.elements[n];
        return el ? String(el.value || '').trim() : '';
      });

      const any = values.some(Boolean);
      const all = values.every(Boolean);

      step.classList.remove('progress-step--active', 'progress-step--complete');
      if (all) step.classList.add('progress-step--complete');
      else if (any) step.classList.add('progress-step--active');
    });
  }

  function attachProgressTracking() {
    const form = document.getElementById('leadForm');
    if (!form) return;

    const handler = () => updateProgress(form);

    ['input', 'change', 'blur'].forEach((evt) => {
      form.addEventListener(evt, handler, true);
    });

    updateProgress(form);
  }

  function attachFormHandler() {
    const form = document.getElementById('leadForm');
    const status = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (!form || !status || !submitBtn) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const v = validate(form);
      if (!v.ok) {
        setStatus(status, v.message, 'error');
        return;
      }

      setStatus(status, 'Submitting…', null);
      submitBtn.disabled = true;

      const payload = {
        page: 'spray_foam_lp',
        submitted_at: new Date().toISOString(),
        cta_source: form.cta_source.value || '',
        full_name: form.full_name.value.trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim(),
        postcode: form.postcode.value.trim(),
        situation: form.situation.value,
        property_type: form.property_type.value,
        details: form.details.value.trim(),
        marketing_consent: form.marketing_consent.checked ? 'yes' : 'no',
        utm: {
          source: form.utm_source.value || '',
          medium: form.utm_medium.value || '',
          campaign: form.utm_campaign.value || '',
          content: form.utm_content.value || '',
          term: form.utm_term.value || '',
        },
      };

      dataLayerPush({
        event: 'lead_submit',
        lead_event: 'generate_lead',
        cta: payload.cta_source,
        page: payload.page,
      });

      try {
        await postLead(payload);

        setStatus(status, 'Thanks — we’ve received your request. We’ll be in touch shortly.', 'success');
        form.reset();
        updateProgress(form);
      } catch (err) {
        setStatus(status, 'Submission failed. Please try again or use Call Now.', 'error');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  function init() {
    maybeInitGtm();
    setCallLinks();
    attachCtaListeners();
    attachPostcodeValidation();
    attachProgressTracking();
    attachFormHandler();

    const utms = getQueryParams();
    setHiddenInputs(utms);

    dataLayerPush({
      event: 'page_view_lp',
      page: 'spray_foam_lp',
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
