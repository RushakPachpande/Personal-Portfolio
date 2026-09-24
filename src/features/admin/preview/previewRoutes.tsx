import { useRoutes } from 'react-router-dom';
import { publicChildRoutes } from '@/app/publicRoutes';
import { PreviewPublicChrome } from '@/app/publicPages';

export function PreviewRoutes() {
  return useRoutes([
    { element: <PreviewPublicChrome />, children: publicChildRoutes },
  ]);
}
