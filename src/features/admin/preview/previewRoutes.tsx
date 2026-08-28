import { useRoutes } from 'react-router-dom';
import { PreviewPublicChrome, publicChildRoutes } from '@/app/publicRoutes';

export function PreviewRoutes() {
  return useRoutes([
    { element: <PreviewPublicChrome />, children: publicChildRoutes },
  ]);
}
