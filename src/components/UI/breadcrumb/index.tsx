import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IBreadcrumb } from '@/lib/types/breadcrumb.type';

const BreadCrumb = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[] | []>([]);
  // console.log('router', <router></router>);
  useEffect(() => {
    /**
     * Nếu đang ở route ADMIN thì bỏ path /admin
     */
    let paths: string[];
    const isRouteAdmin = router?.asPath?.startsWith('/admin');
    paths = router.asPath.split('/');
    if (isRouteAdmin) {
      paths = paths?.slice(2);
    } else {
      paths.shift();
    }
    const pathsArray = paths?.map((path, i) => {
      return {
        breadcrumb: path,
        slug: `${isRouteAdmin ? '/admin/' : '/'}${paths.slice(0, i + 1).join('/')}`,
      };
    });
    setBreadcrumbs(pathsArray);
    // console.log('paths', paths);
    // console.log('pathsArray', pathsArray);
  }, [router]);

  return (
    <div>
      <ul className="px-2 flex items-center" style={{ borderLeft: '4px solid purple' }}>
        {breadcrumbs?.map((breadcrumb, index) => (
          <li key={breadcrumb?.slug} className="flex items-center">
            <span className="mb-1 text-lg mx-3">{index === 0 ? '' : '>'}</span>
            <Link href={breadcrumb.slug} className="capitalize">
              <span className="text-lg font-semibold">{breadcrumb.breadcrumb}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreadCrumb;
