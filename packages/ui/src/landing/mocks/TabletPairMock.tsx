import { TABLET_PAIR_CSS } from './TabletPairMock.css';
import { TABLET_PAIR_HTML } from './TabletPairMock.markup';

/**
 * TabletPairMock (`tablet-pair`) — три окна симметрично: слева снимок базы знаний
 * Кайтена, справа табличное представление (вторым планом), по центру поверх них —
 * доска «Задачи команды» (/brand/kaiten-board-excel.png).
 *
 * Резиновый: ширина 100% контейнера, пропорция 1800:720. Стили лежат в
 * TabletPairMock.css.ts, разметка — в TabletPairMock.markup.ts.
 */
export function TabletPairMock() {
  return (
    <div className="tpw" aria-hidden>
      <style dangerouslySetInnerHTML={{ __html: TABLET_PAIR_CSS }} />
      <div dangerouslySetInnerHTML={{ __html: TABLET_PAIR_HTML }} />
    </div>
  );
}
