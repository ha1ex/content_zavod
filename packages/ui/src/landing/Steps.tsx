import type { ReactNode } from 'react';

/**
 * Steps — модуль «шаги» (секция #start лендинга, «Начните работу за один день»).
 *
 * Шаблон для наполнения: сохранены СТИЛИ, ТИПОГРАФИКА и ПРАВИЛА АДАПТАЦИИ, а
 * заголовок, подзаголовок и сами шаги вынесены в пропсы.
 *
 * Раскладка:
 *  - desktop ≥1280: сетка 4 колонки, gap 32;
 *  - планшет 768–1279: 4 колонки, gap 24;
 *  - 431–767px: 2 колонки;
 *  - ≤430px: 1 колонка; заголовок/подзаголовок влево, отступ под шапкой меньше.
 *
 * Каждый шаг — карточка на surface-section с номер-бейджем, заголовком и текстом.
 * Self-contained: scoped `<style>` под `.steps-mock`, палитра V01.
 */

export interface StepItem {
  /** Номер (по умолчанию — порядковый индекс + 1). */
  num?: ReactNode;
  /** Заголовок шага (может содержать ссылку <a class="step-link">). */
  title: ReactNode;
  /** Описание шага. */
  text: ReactNode;
}

export interface StepsProps {
  /** Заголовок секции. */
  title?: string;
  /** Подзаголовок. */
  subtitle?: string;
  /** Шаги. Если не передать — нейтральные плейсхолдеры. */
  steps?: StepItem[];
}

const STYLE = `
.steps-mock{
  --sp-2:8px; --sp-4:16px; --sp-6:24px; --sp-8:32px; --sp-12:48px; --sp-16:64px;
  --radius-2xl:16px; --radius-xl:12px;
  --fw-semi:600; --fw-reg:400; --ls:0;
  --brand-100:#7d4ccf; --brand-12:#efe9f9;
  --text-title:#2d2d2d; --text-secondary:#757575; --surface-section:#f7f7f8;
  font-family:'Roboto','Inter',system-ui,-apple-system,sans-serif; color:var(--text-title);
  display:block; width:100%; padding:48px var(--sp-4); box-sizing:border-box;
}
.steps-mock, .steps-mock *{box-sizing:border-box;}
.steps-mock .s-head{display:flex; flex-direction:column; gap:var(--sp-4); align-items:center; text-align:center; margin:0 auto var(--sp-12); max-width:760px;}
.steps-mock .sh__heading{font-size:36px; line-height:40px; font-weight:var(--fw-semi); letter-spacing:0; color:var(--text-title); margin:0;}
.steps-mock .sh__desc{font-size:16px; line-height:24px; font-weight:var(--fw-reg); letter-spacing:var(--ls); color:#2d2d2d; margin:0;}
.steps-mock .steps{display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:var(--sp-8);}
.steps-mock .step{padding:var(--sp-6); border:0; border-radius:var(--radius-2xl); background:var(--surface-section);}
.steps-mock .step .num{width:44px; height:44px; border-radius:var(--radius-xl); background:var(--brand-12); color:var(--brand-100); display:inline-flex; align-items:center; justify-content:center; font-size:18px; line-height:1; font-weight:var(--fw-semi); margin-bottom:var(--sp-4); flex:0 0 auto; font-variant-numeric:tabular-nums;}
.steps-mock .step h4{font-size:18px; line-height:28px; font-weight:var(--fw-semi); margin:0 0 var(--sp-2);}
.steps-mock .step p{font-size:14px; line-height:20px; color:var(--text-secondary); margin:0;}
.steps-mock .step .step-link{color:var(--brand-100); text-decoration:underline; text-underline-offset:2px;}
@media(min-width:768px) and (max-width:1279px){.steps-mock .steps{gap:var(--sp-6);}}
@media(max-width:767px){
  .steps-mock{padding:32px var(--sp-4);}
  .steps-mock .s-head{align-items:flex-start; text-align:left; margin:0 0 var(--sp-6);}
  .steps-mock .sh__heading{font-size:24px; line-height:32px;}
  .steps-mock .steps{grid-template-columns:repeat(2,minmax(0,1fr)); gap:var(--sp-4);}
}
@media(max-width:430px){.steps-mock .steps{grid-template-columns:minmax(0,1fr);}}
`;

const PLACEHOLDER_STEPS: StepItem[] = [
  { title: 'Первый шаг — короткий заголовок', text: 'Описание первого шага: 1–2 предложения о том, что нужно сделать.' },
  { title: 'Второй шаг', text: 'Описание второго шага. Здесь будет реальный текст при наполнении шаблона.' },
  { title: 'Третий шаг', text: 'Описание третьего шага, кратко и по делу.' },
  { title: 'Четвёртый шаг — результат', text: 'Описание четвёртого шага: к чему приходит пользователь.' },
];

export function Steps({ title = 'Заголовок секции шагов', subtitle, steps }: StepsProps) {
  const data = steps && steps.length ? steps : PLACEHOLDER_STEPS;
  return (
    <section className="steps-mock" aria-label="Шаги">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="s-head">
        <h2 className="sh__heading">{title}</h2>
        {subtitle ? <p className="sh__desc">{subtitle}</p> : null}
      </div>
      <div className="steps">
        {data.map((s, i) => (
          <div className="step" key={i}>
            <div className="num">{s.num ?? i + 1}</div>
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Steps;
