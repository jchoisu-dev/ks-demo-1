// Minimal i18n: Chinese source text is the key, English lives in ./en.js.
// The language is stored in localStorage; switching reloads the page so that
// labels built at module load (menus, game names, tables) are rebuilt too.
import en from './en';

const KEY = 'lang';
const LANGS = ['zh', 'en'];

const read = () => {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
};

const lang = LANGS.includes(read()) ? read() : 'zh';

const t = (s) => {
    if (lang !== 'en' || s === null || s === undefined) return s;
    const k = String(s);
    return Object.prototype.hasOwnProperty.call(en, k) ? en[k] : k;
};

const setLang = (l) => {
    if (!LANGS.includes(l) || l === lang) return;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    window.location.reload();
};

try { document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'; } catch (e) {}

export { t, lang, setLang, LANGS };
