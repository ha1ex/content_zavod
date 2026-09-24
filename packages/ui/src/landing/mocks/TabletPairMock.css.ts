/**
 * Стили мокапа TabletPair: рамки планшетов и табличное представление Кайтена.
 * Порт слайда T12 из шаблона презентаций V02 (design-system/presentation-v02):
 * рамки — правила .tablet-pair из kaiten-slides.css, начинка экрана — assets/tablet-pair.css.
 *
 * Размеры рамок заданы в cqw от обертки .tpw (container-type: inline-size),
 * экран таблицы вписывается через zoom, поэтому стили живут отдельным файлом,
 * а не в Tailwind-классах.
 */
export const TABLET_PAIR_CSS = `
.tpw {
  container-type: inline-size;
  width: 100%;
}

.tablet-pair {
  position: relative;
  width: 100%;
  aspect-ratio: 1800 / 720;
}

.tablet-pair .tp {
  position: absolute;
  background: #fff;
  overflow: hidden;
}

.tablet-pair .tp-back {
  z-index: 1;
  left: .5%;
  top: 11%;
  width: 42.1%;
  height: 76.3%;
  border-radius: 1.25cqw;
  padding: .42cqw;
  box-shadow: 0 .63cqw 1.56cqw -.42cqw rgba(45,45,45,.14);
}

.tablet-pair .tp-front {
  z-index: 2;
  left: 21.4%;
  top: 0;
  width: 57.2%;
  height: auto;
  border-radius: 1.56cqw;
  padding: .63cqw;
  box-shadow: 0 0 2.8cqw -.7cqw rgba(45,45,45,.25);
}

.tablet-pair .tp-screen {
  container-type: inline-size;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
}

.tablet-pair .tp-back .tp-screen {
  border-radius: .94cqw;
}

.tablet-pair .tp-front .tp-screen {
  border-radius: 1.04cqw;
  background: #ebefef;
  height: auto;
  aspect-ratio: 1600 / 1080;
}

.tablet-pair .tp-front .tpimg {
  display: block;
  width: 100%;
  max-width: none;
  height: auto;
}

.tablet-pair .tp-back2 {
  z-index: 1;
  left: 57.4%;
  top: 11%;
  width: 42.1%;
  height: 76.3%;
  border-radius: 1.25cqw;
  padding: .42cqw;
  box-shadow: 0 .63cqw 1.56cqw -.42cqw rgba(45,45,45,.14);
}

.tablet-pair .tp-back2 .tp-screen {
  border-radius: .94cqw;
}

.tablet-pair .tp-back,.tablet-pair .tp-back2 {
  top: calc(12% + 1.97cqw);
  height: 76%;
  box-shadow: 0 0 2cqw -.5cqw rgba(45,45,45,.2);
}

.tpt {
  font-family: "Roboto",system-ui,-apple-system,"Segoe UI",sans-serif;
  -webkit-font-smoothing: antialiased;
  width: 1000px;
  height: 716px;
  overflow: hidden;
  background: #fff;
  color: #2d2d2d;
  font-size: 14px;
}

.tpt * {
  box-sizing: border-box;
}

.tpt .t-row {
  display: grid;
  grid-template-columns: 34px 466px 134px 116px 128px 1fr;
  height: 38px;
  border-bottom: 1px solid #e3e3e3;
}

.tpt .t-head {
  font-weight: 500;
}

.tpt .t-c {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 0 10px;
  border-right: 1px solid #e3e3e3;
  white-space: nowrap;
  overflow: hidden;
}

.tpt .t-c:last-child {
  border-right: 0;
}

.tpt .t-ch {
  justify-content: center;
  padding: 0;
  border-right: 0;
  color: #757575;
}

.tpt .t-ch svg {
  width: 16px;
  height: 16px;
}

.tpt .t-arr {
  color: #757575;
}

.tpt .t-grp {
  color: #9c27b0;
  font-weight: 500;
}

.tpt .t-in {
  padding-left: 16px;
}

.tpt .t-in2 {
  padding-left: 36px;
}

.tpt .t-done {
  font-size: 13px;
  font-style: italic;
  color: #757575;
  text-decoration: underline;
}

.tpt .t-emo {
  font-style: normal;
  font-size: 15px;
  flex: none;
}

.tpt .t-tx {
  overflow: hidden;
  text-overflow: ellipsis;
}

.tpt .t-lbl {
  display: inline-flex;
  align-items: center;
  height: 22px;
  line-height: 1;
  border-radius: 11px;
  padding: 0 10px;
  font-size: 13px;
  color: #424242;
}

.tpt .t-plan {
  background: #ffe0b2;
}

.tpt .t-doc {
  background: #dcedc8;
}

.tpt .t-an {
  background: #ffccbc;
}

.tpt .t-mk {
  background: #f8bbd0;
}

.tpt .t-sale {
  background: #b3e5fc;
}

.tpt .t-av {
  font-style: normal;
  line-height: 1;
  width: 24px;
  height: 24px;
  flex: none;
  border-radius: 50%;
  color: #2d2d2d;
  font-size: 9.5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1px;
}

.tpt .t-foot {
  border-bottom: 0;
}

.tpt .t-sum {
  font-size: 13px;
  color: #616161;
}

.tpt .t-q {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid #9e9e9e;
  color: #757575;
  font-size: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.tablet-pair .tp-back2 .tpt {
  zoom: calc(100cqi / 1000px);
}

.tpt .t-c .t-tx {
  position: relative;
  top: -1px;
}

.tablet-pair .tp-back .tpdoc {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: left top;
}
`;
