'use client';

/**
 * ModuleIntegrationMock — карта интеграций Кайтена в плоском виде: без сиреневой
 * подложки и теней, карточки сервисов на сером фоне.
 *
 * Отличается от IntegrationsHubMock только оформлением: та версия рисуется как
 * самостоятельная иллюстрация на цветном полотне лендинга, а этой нужен белый
 * фон — она стоит модулем внутри секции или слайда, где полотно уже задано
 * снаружи. Геометрия, провода и подписи общие, поэтому переиспользуем сам хаб
 * и переопределяем только заливки.
 */
import React from 'react';
import { IntegrationsHubMock } from './IntegrationsHubMock';
import { cn } from '../../primitives/cn';

const css = `
.mim{display:inline-block;max-width:100%}
.mim .ihb{background:transparent}
.mim .ihb__card,.mim .ihb__hub{background:#f5f5f5}
`;

export interface ModuleIntegrationMockProps {
  className?: string;
}

export function ModuleIntegrationMock({ className }: ModuleIntegrationMockProps) {
  return (
    <div aria-hidden className={cn('mim', className)}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <IntegrationsHubMock />
    </div>
  );
}
