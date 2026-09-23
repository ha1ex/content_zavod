import { WindowTicketModalMock } from './WindowTicketModalMock';

/**
 * WindowTicketModalOrigin (`window-ticket-modal-origin`) — карточка задачи Кайтена
 * один в один с продукта: слева поля, описание, файлы, чек-лист «Подготовка
 * презентации» и связи с дочерней карточкой, справа — вкладки «Комментарии /
 * Спросить ИИ» с перепиской команды.
 *
 * Отдельное имя для варианта `card="presentation"` мокапа `WindowTicketModalMock`:
 * в спеках он просится как самостоятельный мокап, а не как режим окна Service Desk.
 * Ширина 800px, ужимает MockFit.
 */
export function WindowTicketModalOrigin() {
  return <WindowTicketModalMock bare grayShadow card="presentation" />;
}
